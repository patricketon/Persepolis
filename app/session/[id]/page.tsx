// import { notFound } from "next/navigation"
// import { supabaseServer } from "@/lib/supabaseServer"
// import SessionLobby from "./SessionLobby"

// export default async function SessionPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const { id } = await params
//   const supabase = supabaseServer()

//   const { data: session } = await supabase
//     .from("sessions")
//     .select("id, book_id, start_time_utc, duration_minutes")
//     .eq("id", id)
//     .maybeSingle()

//   if (!session) notFound()

//   return (
//     <SessionLobby
//       sessionId={session.id}
//       bookId={session.book_id}
//       sessionStartTime={session.start_time_utc}
//       durationMinutes={session.duration_minutes}
//     />
//   )
// }


import { notFound, redirect } from "next/navigation"
import { supabaseServer } from "@/lib/supabaseServer"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import SessionLobby from "./SessionLobby"

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // 🔐 Auth-aware client
  const cookieStore = await cookies()
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser()

  if (!user) {
    redirect(`/auth?returnTo=/session/${id}`)
  }

  const supabase = supabaseServer()

  // 1. Verify session exists
  const { data: session } = await supabase
    .from("sessions")
    .select("id, book_id, start_time_utc, duration_minutes")
    .eq("id", id)
    .maybeSingle()

  if (!session) notFound()

  // 2. Verify user is actually joined
  const { data: participant } = await supabase
    .from("session_participants")
    .select("status")
    .eq("session_id", id)
    .eq("user_id", user.id)
    .maybeSingle()

  if (!participant || participant.status !== "joined") {
    redirect(`/auth?returnTo=/session/${id}`)
  }

  return (
    <SessionLobby
      sessionId={session.id}
      bookId={session.book_id}
      sessionStartTime={session.start_time_utc}
      durationMinutes={session.duration_minutes}
    />
  )
}


