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


// import { NextRequest, NextResponse } from "next/server"
// import { AccessToken } from "livekit-server-sdk"
// import { createClient } from "@/lib/supabaseServer"

// export async function POST(req: NextRequest) {
//   try {
//     const { room, username, sessionId } = await req.json()

//     if (!room || !username || !sessionId) {
//       return NextResponse.json(
//         { error: "Missing parameters" },
//         { status: 400 }
//       )
//     }

//     const supabase = createClient()

//     // Fetch session timing
//     const { data: session, error } = await supabase
//       .from("sessions")
//       .select("start_time_utc, duration_minutes")
//       .eq("id", sessionId)
//       .single()

//     if (error || !session) {
//       return NextResponse.json(
//         { error: "Session not found" },
//         { status: 404 }
//       )
//     }

//     const now = Date.now()
//     const sessionEnd =
//       new Date(session.start_time_utc).getTime() +
//       session.duration_minutes * 60_000

//     if (now >= sessionEnd) {
//       return NextResponse.json(
//         { error: "Session has ended" },
//         { status: 403 }
//       )
//     }

//     const ttlSeconds = Math.max(
//       Math.floor((sessionEnd - now) / 1000),
//       1
//     )

//     const token = new AccessToken(
//       process.env.LIVEKIT_API_KEY!,
//       process.env.LIVEKIT_API_SECRET!,
//       {
//         identity: username,
//         ttl: ttlSeconds,
//       }
//     )

//     token.addGrant({
//       room,
//       roomJoin: true,
//       canPublish: true,
//       canSubscribe: true,
//     })

//     return NextResponse.json({ token: token.toJwt() })
//   } catch (err) {
//     console.error("Token error:", err)
//     return NextResponse.json(
//       { error: "Token generation failed" },
//       { status: 500 }
//     )
//   }
// }


// import { NextRequest, NextResponse } from "next/server"
// import { AccessToken } from "livekit-server-sdk"
// import { createClient } from "@/lib/supabaseServer"

// export async function POST(req: NextRequest) {
//   try {
//     const { room, username, sessionId } = await req.json()

//     console.log("LIVEKIT TOKEN REQUEST", {
//       room,
//       username,
//       sessionId,
//       apiKeyPrefix: process.env.LIVEKIT_API_KEY?.slice(0, 6),
//       livekitUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL,
//     })

//     if (!room || !username || !sessionId) {
//       return NextResponse.json(
//         { error: "Missing parameters" },
//         { status: 400 }
//       )
//     }

//     const supabase = createClient()

//     const { data: session, error } = await supabase
//       .from("sessions")
//       .select("start_time_utc, duration_minutes")
//       .eq("id", sessionId)
//       .single()

//     if (error || !session) {
//       return NextResponse.json(
//         { error: "Session not found" },
//         { status: 404 }
//       )
//     }

//     const now = Date.now()
//     const sessionEnd =
//       new Date(session.start_time_utc).getTime() +
//       session.duration_minutes * 60_000

//     if (now >= sessionEnd) {
//       return NextResponse.json(
//         { error: "Session has ended" },
//         { status: 403 }
//       )
//     }

//     const ttlSeconds = Math.max(
//       Math.floor((sessionEnd - now) / 1000),
//       1
//     )

//     const token = new AccessToken(
//       process.env.LIVEKIT_API_KEY!,
//       process.env.LIVEKIT_API_SECRET!,
//       {
//         identity: username,
//         ttl: ttlSeconds,
//       }
//     )

//     token.addGrant({
//       room,
//       roomJoin: true,
//       roomCreate: true, // ← add THIS
//       canPublish: true,
//       canSubscribe: true,
//     })

//     console.log("LIVEKIT TOKEN ISSUED", {
//       room,
//       identity: username,
//       ttlSeconds,
//     })

//     return NextResponse.json({ token: token.toJwt() })
//   } catch (err) {
//     console.error("Token error:", err)
//     return NextResponse.json(
//       { error: "Token generation failed" },
//       { status: 500 }
//     )
//   }
// }




// import { NextRequest, NextResponse } from "next/server"
// import { AccessToken } from "livekit-server-sdk"
// import { createClient } from "@/lib/supabaseServer"

// export async function POST(req: NextRequest) {
//   try {
//     const { room, username, sessionId } = await req.json()

//     console.log("LIVEKIT TOKEN REQUEST", {
//       room,
//       username,
//       sessionId,
//       apiKeyPrefix: process.env.LIVEKIT_API_KEY?.slice(0, 6),
//       livekitUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL,
//     })

//     if (!room || !username || !sessionId) {
//       return NextResponse.json(
//         { error: "Missing parameters" },
//         { status: 400 }
//       )
//     }

//     const supabase = createClient()

//     const { data: session, error } = await supabase
//       .from("sessions")
//       .select("start_time_utc, duration_minutes")
//       .eq("id", sessionId)
//       .single()

//     if (error || !session) {
//       return NextResponse.json(
//         { error: "Session not found" },
//         { status: 404 }
//       )
//     }

//     const now = Date.now()
//     const sessionEnd =
//       new Date(session.start_time_utc).getTime() +
//       session.duration_minutes * 60_000

//     if (now >= sessionEnd) {
//       return NextResponse.json(
//         { error: "Session has ended" },
//         { status: 403 }
//       )
//     }

//     const ttlSeconds = Math.max(
//       Math.floor((sessionEnd - now) / 1000),
//       1
//     )

//     const token = new AccessToken(
//       process.env.LIVEKIT_API_KEY!,
//       process.env.LIVEKIT_API_SECRET!,
//       {
//         identity: username,
//         ttl: ttlSeconds,
//       }
//     )

//     token.addGrant({
//       room,
//       roomJoin: true,
//       roomCreate: true,
//       canPublish: true,
//       canSubscribe: true,
//     })

//     console.log("LIVEKIT TOKEN ISSUED", {
//       room,
//       identity: username,
//       ttlSeconds,
//     })

//     return NextResponse.json({ token: await token.toJwt() })
//   } catch (err) {
//     console.error("Token error:", err)
//     return NextResponse.json(
//       { error: "Token generation failed" },
//       { status: 500 }
//     )
//   }
// }




import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseServer } from "@/lib/supabaseServer";
import { AccessToken } from "livekit-server-sdk";

export async function POST(req: Request) {
  const { room, sessionId } = await req.json();

  if (!room || !sessionId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // 🔐 Auth-aware client
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

  // 🔧 Fetch display name (optional but recommended)
  const supabase = supabaseServer();
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", userId)
    .single();

  const displayName = profile?.display_name ?? "Participant";

  // 🎟️ LiveKit token
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: userId,
      name: displayName,
    }
  );

  token.addGrant({
    room,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  });

  return NextResponse.json({ token: await token.toJwt() });
}
