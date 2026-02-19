// import { NextResponse } from "next/server";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export async function POST(req: Request) {
//   const { sessionId } = await req.json();

//   if (!sessionId) {
//     return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
//   }

//   // 🔐 Auth-aware Supabase client (reads session from cookies)
//   const cookieStore = await cookies();
//   const supabaseAuth = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: () => cookieStore.getAll(),
//         setAll: (cookiesToSet) => {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             cookieStore.set(name, value, options)
//           );
//         },
//       },
//     }
//   );

//   const {
//     data: { user },
//   } = await supabaseAuth.auth.getUser();

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const userId = user.id;

//   // 🔧 Service-role client for DB writes
//   const supabase = supabaseServer();

//   // Try insert
//   const { error: insertErr } = await supabase
//     .from("session_participants")
//     .insert({ session_id: sessionId, user_id: userId });

//   // If already exists → mark as joined
//   if (insertErr?.code === "23505") {
//     await supabase
//       .from("session_participants")
//       .update({ status: "joined" })
//       .eq("session_id", sessionId)
//       .eq("user_id", userId);

//     return NextResponse.json({ rejoined: true });
//   }

//   if (insertErr) {
//     return NextResponse.json({ error: insertErr.message }, { status: 500 });
//   }

//   return NextResponse.json({ joined: true });
// }


// app/api/join/route.ts
// import { NextResponse } from "next/server"
// import { createServerClient } from "@supabase/ssr"
// import { cookies } from "next/headers"
// import { supabaseServer } from "@/lib/supabaseServer"

// export async function POST(req: Request) {
//   const { sessionId } = await req.json()
//   if (!sessionId) {
//     return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
//   }

//   // 🔐 AUTH-AWARE CLIENT (reads browser cookies)
//   const cookieStore = await cookies()
//   const supabaseAuth = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: () => cookieStore.getAll(),
//         setAll: (cookiesToSet) => {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             cookieStore.set(name, value, options)
//           )
//         },
//       },
//     }
//   )

//   const {
//     data: { user },
//   } = await supabaseAuth.auth.getUser()

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   // 🔧 SERVICE ROLE CLIENT FOR DB WRITE
//   const supabase = supabaseServer()

//   const { error } = await supabase
//     .from("session_participants")
//     .insert({ session_id: sessionId, user_id: user.id })

//   if (error && error.code !== "23505") {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }

//   return NextResponse.json({ joined: true })
// }


// import { NextResponse } from "next/server"
// import { createServerClient } from "@supabase/ssr"
// import { cookies } from "next/headers"
// import { supabaseServer } from "@/lib/supabaseServer"

// export async function POST(req: Request) {
//   const { sessionId } = await req.json()

//   if (!sessionId) {
//     return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
//   }

//   // ✅ AUTH-AWARE CLIENT (THIS IS THE FIX)
//   const cookieStore = cookies()
//   const supabaseAuth = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: () => cookieStore.getAll(),
//         setAll: (cookiesToSet) => {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             cookieStore.set(name, value, options)
//           )
//         },
//       },
//     }
//   )

//   const {
//     data: { user },
//   } = await supabaseAuth.auth.getUser()

//   console.log("[API JOIN] user:", user?.id)

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   // 🔧 SERVICE ROLE CLIENT FOR DB WRITE
//   const supabase = supabaseServer()

//   const { error: insertErr } = await supabase
//     .from("session_participants")
//     .insert({
//       session_id: sessionId,
//       user_id: user.id,
//     })

//   if (insertErr?.code === "23505") {
//     await supabase
//       .from("session_participants")
//       .update({ status: "joined" })
//       .eq("session_id", sessionId)
//       .eq("user_id", user.id)

//     return NextResponse.json({ rejoined: true })
//   }

//   if (insertErr) {
//     return NextResponse.json({ error: insertErr.message }, { status: 500 })
//   }

//   return NextResponse.json({ joined: true })
// }


// export const runtime = "nodejs"

// import { NextResponse } from "next/server"
// import { createServerClient } from "@supabase/ssr"
// import { cookies } from "next/headers"
// import { supabaseServer } from "@/lib/supabaseServer"

// export async function POST(req: Request) {
//   const { sessionId } = await req.json()

//   if (!sessionId) {
//     return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
//   }

//   // 🔑 AUTH-AWARE SUPABASE CLIENT (reads cookies correctly)
//   const cookieStore = await cookies()

//   const supabaseAuth = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: async () => cookieStore.getAll(),
//         setAll: async (cookiesToSet) => {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             cookieStore.set(name, value, options)
//           )
//         },
//       },
//     }
//   )

//   const {
//     data: { user },
//   } = await supabaseAuth.auth.getUser()

//   console.log("[API JOIN] user:", user?.id)

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   // 🔧 SERVICE ROLE CLIENT FOR DB WRITE (bypasses RLS)
//   const supabase = supabaseServer()

//   const { error: insertErr } = await supabase
//     .from("session_participants")
//     .insert({
//       session_id: sessionId,
//       user_id: user.id,
//     })

//   if (insertErr?.code === "23505") {
//     await supabase
//       .from("session_participants")
//       .update({ status: "joined" })
//       .eq("session_id", sessionId)
//       .eq("user_id", user.id)

//     return NextResponse.json({ rejoined: true })
//   }

//   if (insertErr) {
//     return NextResponse.json({ error: insertErr.message }, { status: 500 })
//   }

//   return NextResponse.json({ joined: true })
// }


// export const runtime = "nodejs"

// import { NextResponse } from "next/server"
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
// import { cookies } from "next/headers"
// import { supabaseServer } from "@/lib/supabaseServer"

// export async function POST(req: Request) {
//   const { sessionId } = await req.json()

//   if (!sessionId) {
//     return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
//   }

//   const supabaseAuth = createRouteHandlerClient({ cookies })

//   const {
//     data: { user },
//   } = await supabaseAuth.auth.getUser()

//   console.log("[API JOIN] user:", user?.id)

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   const supabase = supabaseServer()

//   const { error } = await supabase
//     .from("session_participants")
//     .insert({
//       session_id: sessionId,
//       user_id: user.id,
//     })

//   if (error?.code === "23505") {
//     await supabase
//       .from("session_participants")
//       .update({ status: "joined" })
//       .eq("session_id", sessionId)
//       .eq("user_id", user.id)

//     return NextResponse.json({ rejoined: true })
//   }

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }

//   return NextResponse.json({ joined: true })
// }


// export const runtime = "nodejs"

// import { NextResponse } from "next/server"
// import { createServerClient } from "@supabase/ssr"
// import { cookies } from "next/headers"
// import { supabaseServer } from "@/lib/supabaseServer"

// export async function POST(req: Request) {
//   const { sessionId } = await req.json()

//   if (!sessionId) {
//     return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
//   }

//   // 🔑 AUTH VIA COOKIES (NO auth-helpers)
//   const cookieStore = cookies()

//   const supabaseAuth = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: () => cookieStore.getAll(),
//         setAll: (cookiesToSet) => {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             cookieStore.set(name, value, options)
//           )
//         },
//       },
//     }
//   )

//   const {
//     data: { user },
//   } = await supabaseAuth.auth.getUser()

//   console.log("[API JOIN] user:", user?.id)

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   // 🔧 SERVICE ROLE FOR WRITE
//   const supabase = supabaseServer()

//   const { error } = await supabase
//     .from("session_participants")
//     .insert({
//       session_id: sessionId,
//       user_id: user.id,
//     })

//   if (error?.code === "23505") {
//     await supabase
//       .from("session_participants")
//       .update({ status: "joined" })
//       .eq("session_id", sessionId)
//       .eq("user_id", user.id)

//     return NextResponse.json({ rejoined: true })
//   }

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }

//   return NextResponse.json({ joined: true })
// }


// export const runtime = "nodejs"

// import { NextResponse } from "next/server"
// import { createServerClient } from "@supabase/ssr"
// import { cookies } from "next/headers"
// import { supabaseServer } from "@/lib/supabaseServer"

// export async function POST(req: Request) {
//   const { sessionId } = await req.json()

//   if (!sessionId) {
//     return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
//   }

//   // ✅ IMPORTANT: cookies() MUST be awaited ONCE
//    // 🔍 DEBUG: Check if cookies exist at all
//   const cookieStore = await cookies()
// console.log("[API JOIN] all cookies:", cookieStore.getAll().map(c => c.name))


//   const supabaseAuth = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: () => cookieStore.getAll(),
//         setAll: (cookiesToSet) => {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             cookieStore.set(name, value, options)
//           })
//         },
//       },
//     }
//   )

//   const {
//     data: { user },
//   } = await supabaseAuth.auth.getUser()

//    console.log("[API JOIN] user:", user?.id)

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   // 💳 Check subscription before allowing join
//   const { hasActiveSubscription } = await import("@/lib/subscription")
//   const isSubscribed = await hasActiveSubscription(user.id)
 
// console.log("[API JOIN] isSubscribed:", isSubscribed, "userId:", user.id)

//   if (!isSubscribed) {
//     return NextResponse.json(
//       { error: "subscription_required", message: "An active subscription is required to join sessions." },
//       { status: 403 }
//     )
//   }

//   // 🔒 Service role for DB write
//   const supabase = supabaseServer()

//   const { error } = await supabase
//     .from("session_participants")
//     .insert({
//       session_id: sessionId,
//       user_id: user.id,
//     })

//   if (error?.code === "23505") {
//     await supabase
//       .from("session_participants")
//       .update({ status: "joined" })
//       .eq("session_id", sessionId)
//       .eq("user_id", user.id)

//     return NextResponse.json({ rejoined: true })
//   }

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }

//   return NextResponse.json({ joined: true })
// }


export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { supabaseServer } from "@/lib/supabaseServer"

export async function POST(req: Request) {
  const { sessionId } = await req.json()

  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
  }

  const cookieStore = await cookies()

  const supabaseAuth = createServerClient(
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
  } = await supabaseAuth.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 💳 Subscription check
  const { hasActiveSubscription } = await import("@/lib/subscription")
  const isSubscribed = await hasActiveSubscription(user.id)

  if (!isSubscribed) {
    return NextResponse.json(
      { error: "subscription_required" },
      { status: 403 }
    )
  }

  const supabase = supabaseServer()

  // ⏳ Weekly usage cap (5 hours = 300 minutes)

  const WEEKLY_LIMIT_MINUTES = 300

  const now = new Date()
  const day = now.getUTCDay()
  const diffToMonday = (day === 0 ? -6 : 1) - day
  const startOfWeek = new Date(now)
  startOfWeek.setUTCDate(now.getUTCDate() + diffToMonday)
  startOfWeek.setUTCHours(0, 0, 0, 0)

  const { data: weeklyUsage } = await supabase
    .from("session_participants")
    .select(`
      session_id,
      sessions(duration_minutes)
    `)
    .eq("user_id", user.id)
    .eq("status", "joined")
    .gte("joined_at", startOfWeek.toISOString())

  const totalMinutesThisWeek =
    weeklyUsage?.reduce((sum: number, row: any) => {
      return sum + (row.sessions?.duration_minutes ?? 0)
    }, 0) ?? 0

  const { data: sessionData } = await supabase
    .from("sessions")
    .select("duration_minutes")
    .eq("id", sessionId)
    .single()

  const newSessionMinutes = sessionData?.duration_minutes ?? 0

  if (totalMinutesThisWeek + newSessionMinutes > WEEKLY_LIMIT_MINUTES) {
    return NextResponse.json(
      { error: "weekly_limit_reached" },
      { status: 429 }
    )
  }

  // Insert participant
  const { error } = await supabase
    .from("session_participants")
    .insert({
      session_id: sessionId,
      user_id: user.id,
      status: "joined",
    })

  if (error?.code === "23505") {
    await supabase
      .from("session_participants")
      .update({ status: "joined" })
      .eq("session_id", sessionId)
      .eq("user_id", user.id)

    return NextResponse.json({ rejoined: true })
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ joined: true })
}