// import { NextRequest, NextResponse } from "next/server"
// import { createClient } from "@/lib/supabaseServer"

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const sessionId = params.id
//   const userId = req.nextUrl.searchParams.get("userId")

//   if (!userId) {
//     return NextResponse.json({ error: "Missing userId" }, { status: 400 })
//   }

//   const supabase = createClient()

//   const { data, error } = await supabase
//     .from("rooms")
//     .select("id,name,room_participants!inner(user_id)")
//     .eq("session_id", sessionId)
//     .eq("room_participants.user_id", userId)
//     .is("closed_at", null)
//     .maybeSingle()

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }

//   if (!data) {
//     return NextResponse.json({ error: "Room not found" }, { status: 404 })
//   }

//   return NextResponse.json({ roomId: data.id, roomName: data.name })
// }

// import { NextRequest, NextResponse } from "next/server"
// import { createClient } from "@/lib/supabaseServer"

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const sessionId = params.id
//   const userId = req.nextUrl.searchParams.get("userId")

//   if (!userId) {
//     return NextResponse.json({ error: "Missing userId" }, { status: 400 })
//   }

//   const supabase = createClient()

//   // Fetch session timing
//   const { data: session, error: sessionError } = await supabase
//     .from("sessions")
//     .select("start_time_utc, duration_minutes")
//     .eq("id", sessionId)
//     .single()

//   if (sessionError || !session) {
//     return NextResponse.json({ error: "Session not found" }, { status: 404 })
//   }

//   const now = Date.now()
//   const sessionStart = new Date(session.start_time_utc).getTime()

//   // Check existing room assignment
//   const { data: room, error: roomError } = await supabase
//     .from("rooms")
//     .select("id,name,room_participants!inner(user_id)")
//     .eq("session_id", sessionId)
//     .eq("room_participants.user_id", userId)
//     .is("closed_at", null)
//     .maybeSingle()

//   if (roomError) {
//     return NextResponse.json({ error: roomError.message }, { status: 500 })
//   }

//   // Late-join gate
//   if (!room && now > sessionStart) {
//     return NextResponse.json(
//       { error: "Session already started" },
//       { status: 403 }
//     )
//   }

//   if (room) {
//     return NextResponse.json({
//       roomId: room.id,
//       roomName: room.name,
//     })
//   }

//   return NextResponse.json({ error: "Room not found" }, { status: 404 })
// }

// import { NextRequest, NextResponse } from "next/server"
// import { createClient } from "@/lib/supabaseServer"

// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id: sessionId } = await params
//   const userId = req.nextUrl.searchParams.get("userId")

//   if (!userId) {
//     return NextResponse.json({ error: "Missing userId" }, { status: 400 })
//   }

//   const supabase = createClient()

//   // Fetch session timing
//   const { data: session, error: sessionError } = await supabase
//     .from("sessions")
//     .select("start_time_utc, duration_minutes")
//     .eq("id", sessionId)
//     .single()

//   if (sessionError || !session) {
//     return NextResponse.json({ error: "Session not found" }, { status: 404 })
//   }

//   const now = Date.now()
//   const sessionStart = new Date(session.start_time_utc).getTime()

//   // Check existing room assignment
//   const { data: room, error: roomError } = await supabase
//     .from("rooms")
//     .select("id,name,room_participants!inner(user_id)")
//     .eq("session_id", sessionId)
//     .eq("room_participants.user_id", userId)
//     .is("closed_at", null)
//     .maybeSingle()

//   if (roomError) {
//     return NextResponse.json({ error: roomError.message }, { status: 500 })
//   }

//   // Late-join gate
//   if (!room && now > sessionStart) {
//     return NextResponse.json(
//       { error: "Session already started" },
//       { status: 403 }
//     )
//   }

//   if (room) {
//     return NextResponse.json({
//       roomId: room.id,
//       roomName: room.name,
//     })
//   }

//   return NextResponse.json({ error: "Room not found" }, { status: 404 })
// }


import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
   const { id: sessionId } = await params;

  // 🔐 Auth-aware client (reads cookies)
  const cookieStore = await cookies();
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = user.id;

  // 🔧 Service-role client for DB reads
  const supabase = supabaseServer();

  // Fetch session timing
  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("start_time_utc, duration_minutes")
    .eq("id", sessionId)
    .single();

  if (sessionError || !session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const now = Date.now();
  const sessionStart = new Date(session.start_time_utc).getTime();

  // Check existing room assignment
  const { data: room, error: roomError } = await supabase
    .from("rooms")
    .select("id,name,room_participants!inner(user_id)")
    .eq("session_id", sessionId)
    .eq("room_participants.user_id", userId)
    .is("closed_at", null)
    .maybeSingle();

  if (roomError) {
    return NextResponse.json({ error: roomError.message }, { status: 500 });
  }

  // Late-join gate
  if (!room && now > sessionStart) {
    return NextResponse.json(
      { error: "Session already started" },
      { status: 403 }
    );
  }

  if (room) {
    return NextResponse.json({
      roomId: room.id,
      roomName: room.name,
    });
  }

  return NextResponse.json({ error: "Room not found" }, { status: 404 });
}
