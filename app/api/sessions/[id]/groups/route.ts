
// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@/lib/supabaseServer";
// import { groupParticipants } from "@/lib/groupParticipants";

// export async function POST(
//   _req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const sessionId = params.id;
//   const supabase = createClient();

//   // 1) Idempotency: if rooms already exist, do nothing
//   const { data: existingRooms } = await supabase
//     .from("rooms")
//     .select("id")
//     .eq("session_id", sessionId);

//   if (existingRooms && existingRooms.length > 0) {
//     return NextResponse.json({ ok: true });
//   }

//   // 2) Fetch joined participants
//   const { data: participants, error } = await supabase
//     .from("session_participants")
//     .select("user_id")
//     .eq("session_id", sessionId)
//     .eq("status", "joined")
//     .order("joined_at", { ascending: true });

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   if (!participants || participants.length === 0) {
//     return NextResponse.json({ ok: true });
//   }

//   // 3) Group participants
//   const groups = groupParticipants(participants);

//   // 4) Create rooms + room_participants
//   for (let i = 0; i < groups.length; i++) {
//     const roomName = `${sessionId}-group-${i + 1}`;

//     const { data: room, error: roomErr } = await supabase
//       .from("rooms")
//       .insert({ session_id: sessionId, name: roomName })
//       .select("id")
//       .single();

//     if (roomErr) {
//       return NextResponse.json({ error: roomErr.message }, { status: 500 });
//     }

//     const roomParticipants = groups[i].map((userId: string) => ({
//       room_id: room.id,
//       user_id: userId,
//     }));

//     const { error: rpErr } = await supabase
//       .from("room_participants")
//       .insert(roomParticipants);

//     if (rpErr) {
//       return NextResponse.json({ error: rpErr.message }, { status: 500 });
//     }
//   }

//   return NextResponse.json({ ok: true });
// }



import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { groupParticipants } from "@/lib/groupParticipants";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: sessionId } = await params;
  const supabase = supabaseServer();

  // 1) Idempotency: if rooms already exist, do nothing
  const { data: existingRooms } = await supabase
    .from("rooms")
    .select("id")
    .eq("session_id", sessionId);

  if (existingRooms && existingRooms.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 2) Fetch joined participants
  const { data: participants, error } = await supabase
    .from("session_participants")
    .select("user_id")
    .eq("session_id", sessionId)
    .eq("status", "joined")
    .order("joined_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!participants || participants.length === 0) {
    return NextResponse.json({ ok: true });
  }

  // 3) Group participants
  const groups = groupParticipants(participants);

  // 4) Create rooms + room_participants
  for (let i = 0; i < groups.length; i++) {
    const roomName = `${sessionId}-group-${i + 1}`;

    const { data: room, error: roomErr } = await supabase
      .from("rooms")
      .insert({ session_id: sessionId, name: roomName })
      .select("id")
      .single();

    if (roomErr) {
      return NextResponse.json({ error: roomErr.message }, { status: 500 });
    }

    const roomParticipants = groups[i].map((userId: string) => ({
      room_id: room.id,
      user_id: userId,
    }));

    const { error: rpErr } = await supabase
      .from("room_participants")
      .insert(roomParticipants);

    if (rpErr) {
      return NextResponse.json({ error: rpErr.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}