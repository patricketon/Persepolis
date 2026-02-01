// import { NextRequest, NextResponse } from "next/server"
// import { createClient } from "@/lib/supabaseServer"

// export async function POST(req: NextRequest) {
//   const { bookId } = await req.json()
//   if (!bookId) {
//     return NextResponse.json({ error: "Missing bookId" }, { status: 400 })
//   }

//   const supabase = createClient()

//   const now = new Date()
//   const HOURS_AHEAD = 12

//   // round to next 30-min slot
//   const next = new Date(now)
//   const m = next.getMinutes()
//   next.setMinutes(m < 30 ? 30 : 60, 0, 0)

//   const sessions = []

//   for (let i = 0; i < HOURS_AHEAD * 2; i++) {
//     sessions.push({
//       book_id: bookId,
//       start_time_utc: new Date(
//         next.getTime() + i * 30 * 60_000
//       ).toISOString(),
//       duration_minutes: 30,
//     })
//   }

//   const { error } = await supabase
//     .from("sessions")
//     .upsert(sessions, {
//       onConflict: "book_id,start_time_utc",
//     })

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }

//   return NextResponse.json({ ok: true })
// }


// import { NextRequest, NextResponse } from "next/server"
// import { createClient } from "@/lib/supabaseServer"

// export async function POST(req: NextRequest) {
//   const { bookId, startTimeUtc, durationMinutes } = await req.json()

//   if (!bookId || !startTimeUtc || !durationMinutes) {
//     return NextResponse.json(
//       { error: "Missing parameters" },
//       { status: 400 }
//     )
//   }

//   const supabase = createClient()

//   // 1. Try to find existing session
//   const { data: existing, error: fetchError } = await supabase
//     .from("sessions")
//     .select("id")
//     .eq("book_id", bookId)
//     .eq("start_time_utc", startTimeUtc)
//     .maybeSingle()

//   if (fetchError) {
//     return NextResponse.json(
//       { error: fetchError.message },
//       { status: 500 }
//     )
//   }

//   if (existing) {
//     return NextResponse.json({ sessionId: existing.id })
//   }

//   // 2. Create session if it doesn't exist
//   const { data: created, error: insertError } = await supabase
//     .from("sessions")
//     .insert({
//       book_id: bookId,
//       start_time_utc: startTimeUtc,
//       duration_minutes: durationMinutes,
//     })
//     .select("id")
//     .single()

//   if (insertError) {
//     return NextResponse.json(
//       { error: insertError.message },
//       { status: 500 }
//     )
//   }

//   return NextResponse.json({ sessionId: created.id })
// }



import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"

export async function POST(req: NextRequest) {
  const { bookId, startTimeUtc, durationMinutes } = await req.json()

  if (!bookId || !startTimeUtc || !durationMinutes) {
    return NextResponse.json(
      { error: "Missing parameters" },
      { status: 400 }
    )
  }

  const supabase = createClient()

  // 1. Try to find existing session
  const { data: existing, error: fetchError } = await supabase
    .from("sessions")
    .select("id")
    .eq("book_id", bookId)
    .eq("start_time_utc", startTimeUtc)
    .maybeSingle()

  if (fetchError) {
    return NextResponse.json(
      { error: fetchError.message },
      { status: 500 }
    )
  }

  if (existing) {
    return NextResponse.json({ sessionId: existing.id })
  }

  // 2. Create session if it doesn't exist
  const { data: created, error: insertError } = await supabase
    .from("sessions")
    .insert({
      book_id: bookId,
      start_time_utc: startTimeUtc,
      duration_minutes: durationMinutes,
    })
    .select("id")
    .single()

  if (insertError) {
    return NextResponse.json(
      { error: insertError.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ sessionId: created.id })
}
