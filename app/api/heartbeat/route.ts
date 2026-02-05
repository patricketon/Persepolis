import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

const supabase = supabaseServer();

export async function POST(req: Request) {
  const { sessionId, userId } = await req.json();
  if (!sessionId || !userId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = supabaseServer();

  // 1) heartbeat update
  await supabase
    .from("session_participants")
    .update({
      last_seen_at: new Date().toISOString(),
      status: "joined",
    })
    .eq("session_id", sessionId)
    .eq("user_id", userId);

  // 2) mark stale participants left
  await supabase
    .from("session_participants")
    .update({ status: "left" })
    .lt("last_seen_at", new Date(Date.now() - 30_000).toISOString())
    .eq("status", "joined");

  // 3) auto-close empty rooms (safe + supported)
  const { data: activeRooms } = await supabase
    .from("room_participants")
    .select("room_id", { count: "exact" })
    .eq("status", "joined");

  const activeRoomIds = (activeRooms ?? []).map(r => r.room_id);

  await supabase
    .from("rooms")
    .update({ closed_at: new Date().toISOString() })
    .is("closed_at", null)
    .not("id", "in", activeRoomIds);

  return NextResponse.json({ ok: true });
}
