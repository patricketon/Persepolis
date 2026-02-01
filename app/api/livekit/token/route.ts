// import { AccessToken } from 'livekit-server-sdk';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const body = await req.json();
//   const room = body.room;
//   const username = body.username;
//   console.log("hasKey", !!process.env.LIVEKIT_API_KEY);
// console.log("hasSecret", !!process.env.LIVEKIT_API_SECRET);
// console.log("room", room, "identity", username);


//   if (!room || !username) {
//     return NextResponse.json(
//       { error: 'Missing room or username' },
//       { status: 400 }
//     );
//   }

//   const apiKey = process.env.LIVEKIT_API_KEY;
//   const apiSecret = process.env.LIVEKIT_API_SECRET;

//   if (!apiKey || !apiSecret) {
//     return NextResponse.json(
//       { error: 'Server missing LiveKit credentials' },
//       { status: 500 }
//     );
//   }

//   console.log("hasKey", !!process.env.LIVEKIT_API_KEY);
// console.log("hasSecret", !!process.env.LIVEKIT_API_SECRET);
// console.log("room", room, "identity", username);


//   const token = new AccessToken(apiKey, apiSecret, {
//     identity: username,
//     ttl: '15m',
//   });

//   token.addGrant({
//     roomJoin: true,
//     room,
//   });

//   return NextResponse.json({
//     token: await token.toJwt(),
//   });
// }


import { NextRequest, NextResponse } from "next/server"
import { AccessToken } from "livekit-server-sdk"
import { createClient } from "@/lib/supabaseServer"

export async function POST(req: NextRequest) {
  try {
    const { room, username, sessionId } = await req.json()

    if (!room || !username || !sessionId) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Fetch session timing
    const { data: session, error } = await supabase
      .from("sessions")
      .select("start_time_utc, duration_minutes")
      .eq("id", sessionId)
      .single()

    if (error || !session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      )
    }

    const now = Date.now()
    const sessionEnd =
      new Date(session.start_time_utc).getTime() +
      session.duration_minutes * 60_000

    if (now >= sessionEnd) {
      return NextResponse.json(
        { error: "Session has ended" },
        { status: 403 }
      )
    }

    const ttlSeconds = Math.max(
      Math.floor((sessionEnd - now) / 1000),
      1
    )

    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY!,
      process.env.LIVEKIT_API_SECRET!,
      {
        identity: username,
        ttl: ttlSeconds,
      }
    )

    token.addGrant({
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    })

    return NextResponse.json({ token: token.toJwt() })
  } catch (err) {
    console.error("Token error:", err)
    return NextResponse.json(
      { error: "Token generation failed" },
      { status: 500 }
    )
  }
}
