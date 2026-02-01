import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const { sessionId, userId } = await req.json();
  const supabase = createClient();

  // 1) Mark participant as left
  await supabase
    .from("session_participants")
    .update({ status: "left", left_at: new Date().toISOString() })
    .eq("session_id", sessionId)
    .eq("user_id", userId);

  // 2) Find the room they were in
  const { data: room } = await supabase
    .from("rooms")
    .select("id")
    .eq("session_id", sessionId)
    .is("closed_at", null)
    .maybeSingle();

  if (!room) {
    return NextResponse.json({ ok: true });
  }

  // 3) Count remaining active participants
  const { count } = await supabase
    .from("room_participants")
    .select("*", { count: "exact", head: true })
    .eq("room_id", room.id);

  // 4) Auto-close if empty
  if ((count ?? 0) === 0) {
    await supabase
      .from("rooms")
      .update({ closed_at: new Date().toISOString() })
      .eq("id", room.id);
  }

  return NextResponse.json({ ok: true });
}
