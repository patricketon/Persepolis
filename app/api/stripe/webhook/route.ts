export const runtime = "nodejs"

import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseServer } from "@/lib/supabaseServer"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
})

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("[Stripe Webhook] Signature verification failed:", message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const supabase = supabaseServer()

  switch (event.type) {
    // ✅ Subscription created (trial started or paid)
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription & {
        current_period_start?: number
        current_period_end?: number
      }
      const customerId = subscription.customer as string
      const status = subscription.status // 'trialing', 'active', 'canceled', etc.

      // Look up the user by their Stripe customer ID
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single()

      if (profile) {
        const toISO = (val: unknown): string | null => {
          if (!val) return null
          if (typeof val === "number") return new Date(val * 1000).toISOString()
          if (typeof val === "string") return val
          return null
        }

        await supabase.from("subscriptions").upsert({
          user_id: profile.id,
          stripe_subscription_id: subscription.id,
          stripe_customer_id: customerId,
          status,
          current_period_start: toISO(subscription.current_period_start),
          current_period_end: toISO(subscription.current_period_end),
          trial_end: toISO(subscription.trial_end),
        })

        console.log(
          `[Stripe Webhook] Subscription ${status} for user ${profile.id}`
        )
      }
      break
    }

    // ❌ Subscription canceled or expired
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single()

      if (profile) {
        await supabase
          .from("subscriptions")
          .update({ status: "canceled" })
          .eq("user_id", profile.id)

        console.log(
          `[Stripe Webhook] Subscription canceled for user ${profile.id}`
        )
      }
      break
    }

    default:
      console.log(`[Stripe Webhook] Unhandled event: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}