// "use client"

// import { useState } from "react"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export function JoinButton({ sessionId }: { sessionId: string }) {
//   const [loading, setLoading] = useState(false)

//   async function handleJoin() {
//     if (loading) return
//     setLoading(true)

//     const supabase = supabaseBrowser()

//     // 1. Check auth
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       window.location.href = `/auth?returnTo=${encodeURIComponent(
//         `/session/${sessionId}`
//       )}`
//       return
//     }

//     // 2. Check profile + 21+
//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("is_21_plus")
//       .eq("id", user.id)
//       .single()

//     if (!profile || !profile.is_21_plus) {
//       window.location.href = `/auth/complete?returnTo=${encodeURIComponent(
//         `/session/${sessionId}`
//       )}`
//       return
//     }

//     // 3. Reserve seat (server trusts auth.uid)
//     await fetch("/api/join", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ sessionId }),
//     })

//     // 4. Enter room
//     window.location.href = `/session/${sessionId}`
//   }

//   return (
//     <button onClick={handleJoin} disabled={loading}>
//       {loading ? "Reserving…" : "Join"}
//     </button>
//   )
// }


// "use client"

// import { useState } from "react"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export function JoinButton({ sessionId }: { sessionId: string }) {
//   const [loading, setLoading] = useState(false)

//   async function handleJoin() {
//     if (loading) return
//     setLoading(true)

//     const supabase = supabaseBrowser()

//     // 1. Check auth
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       window.location.href = `/auth?returnTo=${encodeURIComponent(
//         `/session/${sessionId}`
//       )}`
//       return
//     }

//     // 2. Check profile + 21+
//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("is_21_plus")
//       .eq("id", user.id)
//       .single()

//     if (!profile || !profile.is_21_plus) {
//       window.location.href = `/auth/complete?returnTo=${encodeURIComponent(
//         `/session/${sessionId}`
//       )}`
//       return
//     }

//     // 3. Reserve seat
//     const res = await fetch("/api/join", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ sessionId }),
//     })

//     // 4. If auth expired or missing, re-route cleanly
//     if (res.status === 401) {
//       window.location.href = `/auth?returnTo=${encodeURIComponent(
//         `/session/${sessionId}`
//       )}`
//       return
//     }

//     // 5. Enter room
//     window.location.href = `/session/${sessionId}`
//   }

//   return (
//     <button onClick={handleJoin} disabled={loading}>
//       {loading ? "Reserving…" : "Join"}
//     </button>
//   )
// }



// "use client"

// import { useState } from "react"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export function JoinButton({ sessionId }: { sessionId: string }) {
//   const [loading, setLoading] = useState(false)

//   async function handleJoin() {
//     if (loading) return
//     setLoading(true)

//     const supabase = supabaseBrowser()

//     // 1. Auth check
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       window.location.href = `/auth?returnTo=${encodeURIComponent(
//         `/session/${sessionId}`
//       )}`
//       return
//     }

//     // 2. Profile + 21+ check
//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("is_21_plus")
//       .eq("id", user.id)
//       .single()

//     if (!profile || !profile.is_21_plus) {
//       window.location.href = `/auth/complete?returnTo=${encodeURIComponent(
//         `/session/${sessionId}`
//       )}`
//       return
//     }

//     // 3. Reserve seat
//     const res = await fetch("/api/join", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ sessionId }),
//     })

//     // 4. Auth fallback
//     if (res.status === 401) {
//       window.location.href = `/auth?returnTo=${encodeURIComponent(
//         `/session/${sessionId}`
//       )}`
//       return
//     }

//     if (!res.ok) {
//       setLoading(false)
//       return
//     }

//     // 5. Enter session
//     window.location.href = `/session/${sessionId}`
//   }

//   return (
//     <button onClick={handleJoin} disabled={loading}>
//       {loading ? "Reserving…" : "Join"}
//     </button>
//   )
// }


// // app/components/JoinButton.tsx
// "use client"

// import { useState } from "react"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export function JoinButton({
//   sessionId,
//   bookId,
// }: {
//   sessionId: string
//   bookId: string
// }) {
//   const [loading, setLoading] = useState(false)

//   async function handleJoin() {
//     if (loading) return
//     setLoading(true)

//     const supabase = supabaseBrowser()

//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       window.location.href = `/auth?returnTo=${encodeURIComponent(
//         `/book/${bookId}`
//       )}`
//       return
//     }

//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("is_21_plus")
//       .eq("id", user.id)
//       .single()

//     if (!profile || !profile.is_21_plus) {
//       window.location.href = `/auth/complete?returnTo=${encodeURIComponent(
//         `/book/${bookId}`
//       )}`
//       return
//     }

//     const res = await fetch("/api/join", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ sessionId }),
//     })

//     if (res.status === 401) {
//       window.location.href = `/auth?returnTo=${encodeURIComponent(
//         `/book/${bookId}`
//       )}`
//       return
//     }

//     window.location.href = `/session/${sessionId}`
//   }

//   return (
//     <button onClick={handleJoin} disabled={loading}>
//       {loading ? "Reserving…" : "Join Session"}
//     </button>
//   )
// }


// app/components/JoinButton.tsx
// "use client"

// import { useState } from "react"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export function JoinButton({
//   sessionId,
//   bookId,
// }: {
//   sessionId: string
//   bookId: string
// }) {
//   const [loading, setLoading] = useState(false)

//   async function handleJoin() {
//     if (loading) return
//     setLoading(true)

//     const supabase = supabaseBrowser()

//     // ─────────────────────────────
//     // 1. AUTH CHECK
//     // ─────────────────────────────
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     console.log("[JOINBUTTON] getUser:", { user })

//     if (!user) {
//       const { data: sess } = await supabase.auth.getSession()
//       console.log(
//         "[JOINBUTTON] no user -> redirect /auth. getSession:",
//         sess.session
//       )

//       window.location.href = `/auth?returnTo=${encodeURIComponent(
//         `/book/${bookId}`
//       )}`
//       return
//     }

//     // ─────────────────────────────
//     // 2. PROFILE CHECK
//     // ─────────────────────────────
//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("is_21_plus")
//       .eq("id", user.id)
//       .single()

//     console.log("[JOINBUTTON] profile:", profile)

//     if (!profile || !profile.is_21_plus) {
//       console.log(
//         "[JOINBUTTON] profile incomplete -> redirect /auth/complete"
//       )

//       window.location.href = `/auth/complete?returnTo=${encodeURIComponent(
//         `/book/${bookId}`
//       )}`
//       return
//     }

//     // ─────────────────────────────
//     // 3. JOIN SESSION
//     // ─────────────────────────────
//     const res = await fetch("/api/join", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ sessionId }),
//     })

//     console.log("[JOINBUTTON] /api/join status:", res.status)

//     if (res.status === 401) {
//       console.log("[JOINBUTTON] 401 -> redirect /auth")

//       window.location.href = `/auth?returnTo=${encodeURIComponent(
//         `/book/${bookId}`
//       )}`
//       return
//     }

//     // ─────────────────────────────
//     // 4. ENTER SESSION
//     // ─────────────────────────────
//     window.location.href = `/session/${sessionId}`
//   }

//   return (
//     <button onClick={handleJoin} disabled={loading}>
//       {loading ? "Reserving…" : "Join Session"}
//     </button>
//   )
// }



// app/components/JoinButton.tsx
"use client"

import { useState } from "react"
import { supabaseBrowser } from "@/lib/supabaseBrowser"

export function JoinButton({
  sessionId,
  bookId,
}: {
  sessionId: string
  bookId: string
}) {
  const [loading, setLoading] = useState(false)

  async function handleJoin() {
    if (loading) return
    setLoading(true)

    const supabase = supabaseBrowser()

    // ─────────────────────────────
    // 1. AUTH CHECK
    // ─────────────────────────────
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser()

    console.log("[JOINBUTTON] getUser:", { user, userErr })

    if (!user) {
      const { data: sess } = await supabase.auth.getSession()
      console.log(
        "[JOINBUTTON] no user -> redirect /auth. getSession:",
        sess.session
      )

      window.location.href = `/auth?returnTo=${encodeURIComponent(
        `/book/${bookId}`
      )}`
      return
    }

    // ─────────────────────────────
    // 2. PROFILE CHECK (FULL ROW)
    // ─────────────────────────────
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()

    console.log("[PROFILE CHECK][JoinButton]", {
      userId: user.id,
      profile,
      profileErr,
    })

    if (!profile || !profile.is_21_plus) {
      console.log("[PROFILE CHECK][JoinButton] redirect -> /auth/complete")

      window.location.href = `/auth/complete?returnTo=${encodeURIComponent(
        `/book/${bookId}`
      )}`
      return
    }

    // ─────────────────────────────
    // 3. JOIN SESSION
    // ─────────────────────────────
    const res = await fetch("/api/join", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })

    console.log("[JOINBUTTON] /api/join status:", res.status)

    if (res.status === 401) {
      console.log("[JOINBUTTON] 401 -> redirect /auth")

      window.location.href = `/auth?returnTo=${encodeURIComponent(
        `/book/${bookId}`
      )}`
      return
    }

    // ─────────────────────────────
    // 4. ENTER SESSION
    // ─────────────────────────────
    window.location.href = `/session/${sessionId}`
  }

  return (
    <button onClick={handleJoin} disabled={loading}>
      {loading ? "Reserving…" : "Join Session"}
    </button>
  )
}
