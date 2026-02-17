// // components/JoinRoom.tsx
// "use client"

// import { Room, RoomEvent, ConnectionState } from "livekit-client"
// import { useEffect, useState, useRef, useCallback } from "react"
// import { RoomGrid } from "./RoomGrid"
// import { RoomControls } from "./RoomControls"

// export function JoinRoom({
//   sessionId,
//   userId,
//   sessionEndTime,
//   onEnd,
// }: {
//   sessionId: string
//   userId: string
//   sessionEndTime: string
//   onEnd: () => void
// }) {
//   const [room, setRoom] = useState<Room | null>(null)
//   const [connectionState, setConnectionState] = useState<"connecting" | "connected" | "reconnecting" | "failed">("connecting")
//   const reconnectAttempts = useRef(0)
//   const maxReconnectAttempts = 3

//   const isSessionOver = useCallback(() => {
//     return new Date() >= new Date(sessionEndTime)
//   }, [sessionEndTime])


//   const connect = useCallback(async () => {
//   if (isSessionOver()) {
//     onEnd()
//     return null
//   }

//   // Lookup assigned room
//   const res = await fetch(
//     `/api/sessions/${sessionId}/my-room?userId=${userId}`
//   )
//   if (!res.ok) throw new Error("Room lookup failed")

//   const { roomName } = await res.json()

//   // Fetch LiveKit token
//   const tokenRes = await fetch("/api/livekit/token", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       room: roomName,
//       username: userId,
//       sessionId, // ✅ important
//     }),
//   })

//   if (!tokenRes.ok) {
//     const err = await tokenRes.json()

//     // Graceful handling of expired session
//     if (tokenRes.status === 403 || err.error?.includes("ended")) {
//       onEnd()
//       return null
//     }

//     throw new Error(err.error || "Token fetch failed")
//   }

//   const { token } = await tokenRes.json()

//   // Connect
//   const lkRoom = new Room({
//     adaptiveStream: true,
//     dynacast: true,
//   })

  
//   await lkRoom.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL!, token)

//   // wait until connected
//     if (lkRoom.state !== ConnectionState.Connected) {
//     await new Promise(resolve => {
//         lkRoom.on(RoomEvent.Connected, resolve)
//     })
//     }

//   await lkRoom.localParticipant.setMicrophoneEnabled(true)
//   await lkRoom.localParticipant.setCameraEnabled(true)

//   return lkRoom
// }, [sessionId, userId, isSessionOver, onEnd])


//   // Initial connect
//   useEffect(() => {
//     let activeRoom: Room | null = null
//     let mounted = true

//     async function join() {
//       try {
//         const lkRoom = await connect()
//         if (!mounted || !lkRoom) return

//         activeRoom = lkRoom
//         reconnectAttempts.current = 0
//         setConnectionState("connected")
//         setRoom(lkRoom)
//       } catch (err) {
//         console.error("Join failed:", err)
//         if (mounted) setConnectionState("failed")
//       }
//     }

//     join()

//     return () => {
//       mounted = false
//       activeRoom?.disconnect()
//     }
//   }, [connect])

//   // Handle disconnect + reconnect
//   useEffect(() => {
//     if (!room) return

//     const handleDisconnect = async () => {
//       // Don't reconnect if session is over
//       if (isSessionOver()) {
//         onEnd()
//         return
//       }

//       // Don't exceed max attempts
//       if (reconnectAttempts.current >= maxReconnectAttempts) {
//         setConnectionState("failed")
//         return
//       }

//       setConnectionState("reconnecting")
//       reconnectAttempts.current += 1

//       // Wait before reconnect (exponential backoff)
//       const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 8000)
//       await new Promise((r) => setTimeout(r, delay))

//       // Attempt reconnect
//       try {
//         const lkRoom = await connect()
//         if (lkRoom) {
//           reconnectAttempts.current = 0
//           setConnectionState("connected")
//           setRoom(lkRoom)
//         }
//       } catch (err) {
//         console.error("Reconnect failed:", err)
//         if (reconnectAttempts.current >= maxReconnectAttempts) {
//           setConnectionState("failed")
//         }
//       }
//     }

//     room.on(RoomEvent.Disconnected, handleDisconnect)

//     return () => {
//       room.off(RoomEvent.Disconnected, handleDisconnect)
//     }
//   }, [room, connect, isSessionOver, onEnd])

//   // Heartbeat
//   useEffect(() => {
//     if (!room || connectionState !== "connected") return

//     const id = setInterval(() => {
//       fetch("/api/heartbeat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sessionId, userId }),
//       })
//     }, 10_000)

//     return () => clearInterval(id)
//   }, [room, connectionState, sessionId, userId])

//   // Auto-end at session end time
//   useEffect(() => {
//     if (!room) return

//     const id = setInterval(() => {
//       if (isSessionOver()) {
//         room.disconnect()
//         onEnd()
//       }
//     }, 1000)

//     return () => clearInterval(id)
//   }, [room, isSessionOver, onEnd])

//   // -------- Render --------

//   if (connectionState === "connecting") {
//     return (
//       <div className="join-room-status">
//         <div className="spinner" />
//         <p>Connecting…</p>
//       </div>
//     )
//   }

//   if (connectionState === "reconnecting") {
//     return (
//       <div className="join-room-status">
//         <div className="spinner" />
//         <p>Connection lost. Reconnecting…</p>
//       </div>
//     )
//   }

//   if (connectionState === "failed") {
//     return (
//       <div className="join-room-status error">
//         <p>Unable to connect to the discussion.</p>
//         <button
//           onClick={() => {
//             reconnectAttempts.current = 0
//             setConnectionState("connecting")
//             setRoom(null)
//           }}
//           className="primary-btn"
//         >
//           Try Again
//         </button>
//       </div>
//     )
//   }

//   if (!room) return null

//   return (
//     <>
//       <RoomGrid room={room} />
//       <RoomControls
//         room={room}
//         onLeave={async () => {
//           await fetch("/api/leave", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ sessionId, userId }),
//           })
//           room.disconnect()
//           onEnd()
//         }}
//       />
//     </>
//   )
// }

// components/JoinRoom.tsx
"use client"

import { Room, RoomEvent, ConnectionState } from "livekit-client"
import { useEffect, useState, useRef, useCallback } from "react"
import { RoomGrid } from "./RoomGrid"
import { RoomControls } from "./RoomControls"

export function JoinRoom({
  sessionId,
  userId,
  sessionEndTime,
  onEnd,
}: {
  sessionId: string
  userId: string
  sessionEndTime: string
  onEnd: () => void
}) {
  const [room, setRoom] = useState<Room | null>(null)
  const [connectionState, setConnectionState] = useState<
    "connecting" | "connected" | "reconnecting" | "failed"
  >("connecting")
  const [nameMap, setNameMap] = useState<Record<string, string>>({})
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 3

  const isSessionOver = useCallback(() => {
    return new Date() >= new Date(sessionEndTime)
  }, [sessionEndTime])

  const connect = useCallback(async () => {
    if (isSessionOver()) {
      onEnd()
      return null
    }

    // 1. Get assigned room
    const roomRes = await fetch(
      `/api/sessions/${sessionId}/my-room?userId=${userId}`
    )
    if (!roomRes.ok) throw new Error("Room lookup failed")

    const { roomName } = await roomRes.json()

    // 2. Get LiveKit token
    const tokenRes = await fetch("/api/livekit/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room: roomName,
        username: userId,
        sessionId,
      }),
    })

    if (!tokenRes.ok) {
      const err = await tokenRes.json()
      if (tokenRes.status === 403) {
        onEnd()
        return null
      }
      throw new Error(err.error || "Token fetch failed")
    }

    const { token } = await tokenRes.json()

    // 3. Connect to LiveKit
    const lkRoom = new Room({
      adaptiveStream: true,
      dynacast: true,
    })

    await lkRoom.connect(
      process.env.NEXT_PUBLIC_LIVEKIT_URL!,
      token
    )

    // 4. Wait until engine is fully connected
    if (lkRoom.state !== ConnectionState.Connected) {
      await new Promise<void>((resolve) => {
        lkRoom.once(RoomEvent.Connected, resolve)
      })
    }

    // 5. Enable media AFTER connection
    // await lkRoom.localParticipant.setMicrophoneEnabled(true)
    // await lkRoom.localParticipant.setCameraEnabled(true)

    // Enable media — don't crash if user denies permissions
    try {
      await lkRoom.localParticipant.setMicrophoneEnabled(true)
    } catch (e) {
      console.warn("Mic permission denied:", e)
    }
    try {
      await lkRoom.localParticipant.setCameraEnabled(true)
    } catch (e) {
      console.warn("Camera permission denied:", e)
    }

    return lkRoom
  }, [sessionId, userId, isSessionOver, onEnd])

  // Initial join
  useEffect(() => {
    let activeRoom: Room | null = null
    let mounted = true

    async function join() {
      try {
        const lkRoom = await connect()
        if (!mounted || !lkRoom) return

        activeRoom = lkRoom
        reconnectAttempts.current = 0
        setRoom(lkRoom)
        setConnectionState("connected")
      } catch (err) {
        console.error("Join failed:", err)
        if (mounted) setConnectionState("failed")
      }
    }

    join()

    return () => {
      mounted = false
      activeRoom?.disconnect()
    }
  }, [connect])

  // Load participant display names once room is connected
useEffect(() => {
  if (!room) return
  const currentRoom = room;

  async function loadNames() {
    try {
     
      const res = await fetch(`/api/rooms/${currentRoom.name}/participants`)
      if (!res.ok) return

      const data = await res.json()

      const map: Record<string, string> = {}
      data.forEach((p: { user_id: string; display_name: string }) => {
        map[p.user_id] = p.display_name
      })

      setNameMap(map)
    } catch (e) {
      console.error("Failed to load participant names:", e)
    }
  }

  loadNames()
}, [room])

  // Reconnect logic
  useEffect(() => {
    if (!room) return

    const handleDisconnect = async () => {
      if (isSessionOver()) {
        onEnd()
        return
      }

      if (reconnectAttempts.current >= maxReconnectAttempts) {
        setConnectionState("failed")
        return
      }

      setConnectionState("reconnecting")
      reconnectAttempts.current += 1

      const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 8000)
      await new Promise((r) => setTimeout(r, delay))

      try {
        const lkRoom = await connect()
        if (lkRoom) {
          reconnectAttempts.current = 0
          setRoom(lkRoom)
          setConnectionState("connected")
        }
      } catch {
        if (reconnectAttempts.current >= maxReconnectAttempts) {
          setConnectionState("failed")
        }
      }
    }

    room.on(RoomEvent.Disconnected, handleDisconnect)
    return () => {
      room.off(RoomEvent.Disconnected, handleDisconnect)
    }
  }, [room, connect, isSessionOver, onEnd])

  // Auto-end session
  useEffect(() => {
    if (!room) return

    const id = setInterval(() => {
      if (isSessionOver()) {
        room.disconnect()
        onEnd()
      }
    }, 1000)

    return () => clearInterval(id)
  }, [room, isSessionOver, onEnd])

  // -------- Render --------

  if (connectionState === "connecting") {
    return <p>Connecting…</p>
  }

  if (connectionState === "reconnecting") {
    return <p>Reconnecting…</p>
  }

  if (connectionState === "failed") {
    return (
      <div>
        <p>Unable to connect to the discussion.</p>
        <button
          onClick={() => {
            reconnectAttempts.current = 0
            setConnectionState("connecting")
            setRoom(null)
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!room) return null

  return (
    <>
      <RoomGrid room={room} />
      <RoomControls
        room={room}
        onLeave={async () => {
          await fetch("/api/leave", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, userId }),
          })
          room.disconnect()
          onEnd()
        }}
      />
    </>
  )
}
