import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

const supabase = supabaseServer();

export async function POST() {
  const supabase = supabaseServer();

  const cutoff = new Date(Date.now() - 30_000).toISOString(); // 30s timeout

  await supabase
    .from("session_participants")
    .update({ status: "left" })
    .eq("status", "joined")
    .lt("last_seen_at", cutoff);

  return NextResponse.json({ cleaned: true });
}
