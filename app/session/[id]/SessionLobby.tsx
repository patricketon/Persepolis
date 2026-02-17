// "use client"

// import { useEffect, useMemo, useState, useCallback } from "react"
// import { useRouter } from "next/navigation"
// import { getOrCreateUserId } from "@/lib/userId"
// import { JoinRoom } from "@/components/JoinRoom"

// type Status = "waiting" | "live" | "ended" | "missed"

// export default function SessionLobby({
//   sessionId,
//   bookId,
//   sessionStartTime,
//   durationMinutes,
// }: {
//   sessionId: string
//   bookId: string
//   sessionStartTime: string
//   durationMinutes: number
// }) {
//   const router = useRouter()

//   const [mounted, setMounted] = useState(false)
//   const [userId, setUserId] = useState<string | null>(null)
//   const [status, setStatus] = useState<Status>("waiting")
//   const [countdown, setCountdown] = useState("")
//   const [notified, setNotified] = useState(false)
//   const [hasRoom, setHasRoom] = useState<boolean | null>(null) // null = checking

//   const sessionEndTime = useMemo(() => {
//     const start = new Date(sessionStartTime).getTime()
//     return new Date(start + durationMinutes * 60_000).toISOString()
//   }, [sessionStartTime, durationMinutes])

//   // Hydration guard — only run on client
//   useEffect(() => {
//     setMounted(true)
//     setUserId(getOrCreateUserId())
//   }, [])

//   // Request notification permission
//   useEffect(() => {
//     if (!mounted) return
//     if ("Notification" in window && Notification.permission === "default") {
//       Notification.requestPermission()
//     }
//   }, [mounted])

//   // Notify at T-1 minute
//   const notify = useCallback(() => {
//     if (notified) return
//     if ("Notification" in window && Notification.permission === "granted") {
//       new Notification("Persepolis", {
//         body: "Your discussion starts in 1 minute!",
//         icon: "/favicon.ico",
//         tag: `session-${sessionId}`,
//       })
//       setNotified(true)
//     }
//   }, [notified, sessionId])

//   // Clock + countdown + notification trigger
//   useEffect(() => {
//     if (!mounted) return

//     const tick = () => {
//       console.log({
//       now: new Date().toISOString(),
//       start: sessionStartTime,
//       end: sessionEndTime,
//     })
//       const now = Date.now()
//       const start = new Date(sessionStartTime).getTime()
//       const end = new Date(sessionEndTime).getTime()

//       // Countdown
//       const msLeft = start - now
//       if (msLeft > 0) {
//         const sec = Math.ceil(msLeft / 1000)
//         const m = Math.floor(sec / 60)
//         const s = sec % 60
//         setCountdown(`${m}:${s.toString().padStart(2, "0")}`)

//         // Notify at T-1 min
//         if (msLeft <= 60_000 && msLeft > 59_000) notify()
//       } else {
//         setCountdown("")
//       }

//       // Status
//       if (now < start) setStatus("waiting")
//       else if (now >= start && now < end) setStatus("live")
//       else setStatus("ended")
//     }

//     tick()
//     const id = setInterval(tick, 1000)
//     return () => clearInterval(id)
//   }, [mounted, sessionStartTime, sessionEndTime, notify])

//   // Ensure reservation + check room assignment (refresh-safe)
//   useEffect(() => {
//     if (!mounted || !userId) return

//     ;(async () => {
//       // Ensure registered
//       await fetch("/api/join", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sessionId, userId }),
//       }).catch(() => {})

//       // If live, trigger grouping and check room
//       if (status === "live") {
//         await fetch(`/api/sessions/${sessionId}/groups`, { method: "POST" })
//         const res = await fetch(
//           `/api/sessions/${sessionId}/my-room?userId=${userId}`
//         )
//         setHasRoom(res.ok)
//       }
//     })()
//   }, [mounted, sessionId, userId, status])

//   // -------- Render --------

//   // Always show loading on server and initial client render
//   if (!mounted || !userId) {
//     return <div className="session-lobby loading">Loading…</div>
//   }

//   // WAITING
//   if (status === "waiting") {
//     return (
//       <div className="session-lobby waiting">
//         <h2>You're In</h2>
//         <p>
//           Discussion starts at{" "}
//           {new Date(sessionStartTime).toLocaleTimeString([], {
//             hour: "numeric",
//             minute: "2-digit",
//           })}
//         </p>
//         {countdown && (
//           <div className="countdown">
//             <span className="countdown-value">{countdown}</span>
//             <span className="countdown-label">until start</span>
//           </div>
//         )}
//         <p className="hint">Stay on this page — you'll join automatically</p>
//       </div>
//     )
//   }

//   // LIVE — checking room
//   if (status === "live" && hasRoom === null) {
//     return (
//       <div className="session-lobby loading">
//         <div className="spinner" />
//         <p>Joining discussion…</p>
//       </div>
//     )
//   }

//   // LIVE — no room (missed)
//   if (status === "live" && hasRoom === false) {
//     return (
//       <div className="session-lobby missed">
//         <h2>Session Already Started</h2>
//         <p>
//           This discussion has already begun. Out of respect for participants,
//           late joins aren't allowed.
//         </p>
//         <p>Don't worry — new sessions start every 30 minutes!</p>
//         <button onClick={() => router.push(`/book/${bookId}`)} className="primary-btn">
//           Find Another Session
//         </button>
//       </div>
//     )
//   }

//   // LIVE — has room
//   if (status === "live" && hasRoom) {
//     return (
//       <JoinRoom
//         sessionId={sessionId}
//         userId={userId}
//         sessionEndTime={sessionEndTime}
//         onEnd={() => router.push(`/book/${bookId}`)}
//       />
//     )
//   }

//   // ENDED
//   return (
//     <div className="session-lobby ended">
//       <h2>Session Ended</h2>
//       <p>Thanks for joining! We hope you enjoyed the discussion.</p>
//       <button onClick={() => router.push(`/book/${bookId}`)} className="primary-btn">
//         Back to Book
//       </button>
//     </div>
//   )
// }



"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { getOrCreateUserId } from "@/lib/userId"
import { JoinRoom } from "@/components/JoinRoom"
import { WaitingRoomBackground } from "@/components/WaitingRoomBackground"

type Status = "waiting" | "live" | "ended" | "missed"

export default function SessionLobby({
  sessionId,
  bookId,
  sessionStartTime,
  durationMinutes,
}: {
  sessionId: string
  bookId: string
  sessionStartTime: string
  durationMinutes: number
}) {
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>("waiting")
  const [countdown, setCountdown] = useState("")
  const [notified, setNotified] = useState(false)
  const [hasRoom, setHasRoom] = useState<boolean | null>(null)

  const sessionEndTime = useMemo(() => {
    const start = new Date(sessionStartTime).getTime()
    return new Date(start + durationMinutes * 60_000).toISOString()
  }, [sessionStartTime, durationMinutes])

  // Hydration guard
  useEffect(() => {
    setMounted(true)
    setUserId(getOrCreateUserId())
  }, [])

  // Notification permission
  useEffect(() => {
    if (!mounted) return
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [mounted])

  // Notify at T-1 minute
  const notify = useCallback(() => {
    if (notified) return
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Persepolis", {
        body: "Your discussion starts in 1 minute!",
        icon: "/favicon.ico",
        tag: `session-${sessionId}`,
      })
      setNotified(true)
    }
  }, [notified, sessionId])

  // Clock + countdown
  useEffect(() => {
    if (!mounted) return

    const tick = () => {
      const now = Date.now()
      const start = new Date(sessionStartTime).getTime()
      const end = new Date(sessionEndTime).getTime()

      const msLeft = start - now
      if (msLeft > 0) {
        const sec = Math.ceil(msLeft / 1000)
        const m = Math.floor(sec / 60)
        const s = sec % 60
        setCountdown(`${m}:${s.toString().padStart(2, "0")}`)

        if (msLeft <= 60_000 && msLeft > 59_000) notify()
      } else {
        setCountdown("")
      }

      if (now < start) setStatus("waiting")
      else if (now >= start && now < end) setStatus("live")
      else setStatus("ended")
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [mounted, sessionStartTime, sessionEndTime, notify])

  // Ensure reservation + room check
  // useEffect(() => {
  //   if (!mounted || !userId) return

  //   ;(async () => {
  //     await fetch("/api/join", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ sessionId, userId }),
  //     }).catch(() => {})

  //     if (status === "live") {
  //       await fetch(`/api/sessions/${sessionId}/groups`, { method: "POST" })
  //       const res = await fetch(
  //         `/api/sessions/${sessionId}/my-room?userId=${userId}`
  //       )
  //       setHasRoom(res.ok)
  //     }
  //   })()
  // }, [mounted, sessionId, userId, status])

  // Ensure reservation + wait for room assignment
  useEffect(() => {
    if (!mounted || !userId) return

    // Re-register (idempotent)
    fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, userId }),
    }).catch(() => {})

    if (status !== "live") return

    let cancelled = false

    // Poll /my-room until the server-side grouping job assigns us
    async function pollForRoom() {
      while (!cancelled) {
        const res = await fetch(`/api/sessions/${sessionId}/my-room`)

        if (res.ok) {
          setHasRoom(true)
          return
        }

        if (res.status !== 404) {
          setHasRoom(false)
          return
        }

        await new Promise((r) => setTimeout(r, 2000))
      }
    }

    pollForRoom()

    return () => {
      cancelled = true
    }
  }, [mounted, sessionId, userId, status])

  // -------- Render --------

  if (!mounted || !userId) {
    return <div className="session-lobby loading">Loading…</div>
  }

  // ✅ WAITING — shader background
 if (status === "waiting") {
  return (
    <WaitingRoomBackground>
      <div style={{ textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: '4rem', fontWeight: 700, margin: '0 0 16px' }}>
          You're in 😊✨
        </h2>

        <p style={{ fontSize: '1.5rem', margin: '0 0 40px', opacity: 0.9 }}>
          Book club starts at{" "}
          {new Date(sessionStartTime).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>

        {countdown && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '6rem', fontWeight: 700 }}>{countdown}</div>
            <div style={{ fontSize: '1.25rem', opacity: 0.8 }}>until start</div>
          </div>
        )}

        <p style={{ fontSize: '1.1rem', opacity: 0.7 }}>
          Stay on this tab — you'll join automatically 🎧
        </p>
      </div>
    </WaitingRoomBackground>
  )
}


  // LIVE — checking room
  if (status === "live" && hasRoom === null) {
    return (
      <div className="session-lobby loading">
        <div className="spinner" />
        <p>Joining discussion…</p>
      </div>
    )
  }

  // LIVE — missed
  if (status === "live" && hasRoom === false) {
    return (
      <div className="session-lobby missed">
        <h2>Session Already Started</h2>
        <p>
          This discussion has already begun. Out of respect for participants,
          late joins aren't allowed.
        </p>
        <p>Don't worry — new sessions start every 30 minutes!</p>
        <button
          onClick={() => router.push(`/book/${bookId}`)}
          className="primary-btn"
        >
          Find Another Session
        </button>
      </div>
    )
  }

  // LIVE — join room
  if (status === "live" && hasRoom) {
    return (
      <JoinRoom
        sessionId={sessionId}
        userId={userId}
        sessionEndTime={sessionEndTime}
        onEnd={() => router.push(`/book/${bookId}`)}
      />
    )
  }

  // ENDED
  return (
    <div className="session-lobby ended">
      <h2>Session Ended</h2>
      <p>Thanks for joining! We hope you enjoyed the discussion.</p>
      <button
        onClick={() => router.push(`/book/${bookId}`)}
        className="primary-btn"
      >
        Back to Book
      </button>
    </div>
  )
}
