
"use client"

import { useState } from "react"
import { getOrCreateUserId } from "@/lib/userId"

/**
 * Book-level JoinButton
 * ---------------------
 * Responsibility:
 * - Reserve seat
 * - Navigate to session URL
 *
 * No router hooks (safe inside Three.js <Html />)
 * No timing logic
 * No LiveKit
 */

export function JoinButton({ sessionId }: { sessionId: string }) {
  const userId = getOrCreateUserId()
  const [loading, setLoading] = useState(false)

  async function handleJoin() {
    if (!userId || loading) return
    setLoading(true)

    await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, userId }),
    })

    // Imperative navigation (safe everywhere)
    window.location.href = `/session/${sessionId}`
  }

  return (
    <button onClick={handleJoin} disabled={loading}>
      {loading ? "Reserving…" : "Join"}
    </button>
  )
}
