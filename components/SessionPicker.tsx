"use client"

import { useEffect, useState } from "react"
import { JoinButton } from "./JoinButton"

type Session = {
  id: string
  start_time_utc: string
  duration_minutes: number
  capacity: number
  current_count: number
}

export default function SessionPicker({ bookId }: { bookId: string }) {
  console.log("SessionPicker mounted", bookId)
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      // 1. Ensure sessions exist
      await fetch("/api/sessions/ensure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      }).catch(() => {})

      // 2. Load sessions
      const res = await fetch(`/api/sessions?bookId=${bookId}`)
      if (!res.ok) {
        setSessions([])
        setLoading(false)
        return
      }

      const data = await res.json()
      setSessions(Array.isArray(data) ? data : [])
      setLoading(false)
    }

    init()
  }, [bookId])

  if (loading) return <div>Loading sessions…</div>

  return (
    <div>
      <h3>Available Sessions</h3>
      <ul>
        {sessions.map((s) => {
          const time = new Date(s.start_time_utc).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })

          return (
            <li key={s.id} className="text-black">
              {time} · {s.duration_minutes} min · {s.current_count}/{s.capacity}
              <JoinButton sessionId={s.id} bookId={bookId}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
