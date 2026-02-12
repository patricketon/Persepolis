// app/book/[id]/BookActions.tsx
"use client"

import { useEffect, useState } from "react"
import { supabaseBrowser } from "@/lib/supabaseBrowser"
import { JoinButton } from "@/components/JoinButton"

export default function BookActions({
  bookId,
  sessionId,
}: {
  bookId: string
  sessionId: string
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      const supabase = supabaseBrowser()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_21_plus")
        .eq("id", user.id)
        .single()

      if (profile?.is_21_plus) {
        setReady(true)
      }
    })()
  }, [])

  if (!ready) {
    return <button>Schedule Discussion</button>
  }

  return <JoinButton sessionId={sessionId} bookId={bookId} />
}
