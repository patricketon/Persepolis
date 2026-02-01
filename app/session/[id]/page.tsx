import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabaseServer"
import SessionLobby from "./SessionLobby"

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = createClient()

  const { data: session } = await supabase
    .from("sessions")
    .select("id, book_id, start_time_utc, duration_minutes")
    .eq("id", id)
    .maybeSingle()

  if (!session) notFound()

  return (
    <SessionLobby
      sessionId={session.id}
      bookId={session.book_id}
      sessionStartTime={session.start_time_utc}
      durationMinutes={session.duration_minutes}
    />
  )
}


