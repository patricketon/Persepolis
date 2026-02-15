export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
})

export async function POST(req: Request) {
  // 1. Get the authenticated user
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 2. Check if user already has a Stripe customer ID
  //    (We store it in Supabase so we don't create duplicates)
  const { supabaseServer } = await import("@/lib/supabaseServer")
  const supa = supabaseServer()

  const { data: profile } = await supa
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single()

  let customerId = profile?.stripe_customer_id

  // 3. Create or retrieve Stripe customer
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    })
    customerId = customer.id

    // Save the Stripe customer ID to the user's profile
    await supa
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id)
  }

  // 4. Create a Checkout Session with 14-day free trial
  const { origin } = new URL(req.url)

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: 14,
    },
    success_url: `${origin}/subscribe/success?session_id={CHECKOUT_SESSION_ID}&returnTo=${encodeURIComponent(
    new URL(req.url).searchParams.get("returnTo") || "/"
    )}`,
    cancel_url: `${origin}/subscribe/cancel`,
  })

  return NextResponse.json({ url: session.url })
}