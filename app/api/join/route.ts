// app/api/join/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const { sessionId, userId } = await req.json();
  if (!sessionId || !userId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = createClient();

  // try insert
  const { error: insertErr } = await supabase
    .from("session_participants")
    .insert({ session_id: sessionId, user_id: userId });

  // if already exists → mark as joined
  if (insertErr?.code === "23505") {
    await supabase
      .from("session_participants")
      .update({ status: "joined" })
      .eq("session_id", sessionId)
      .eq("user_id", userId);

    return NextResponse.json({ rejoined: true });
  }

  if (insertErr) {
    return NextResponse.json({ error: insertErr.message }, { status: 500 });
  }

  return NextResponse.json({ joined: true });
}
