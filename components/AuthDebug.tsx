"use client"

import { useEffect } from "react"
import { supabaseBrowser } from "@/lib/supabaseBrowser"

export function AuthDebug() {
  useEffect(() => {
    const supabase = supabaseBrowser()

    // Log initial state
    supabase.auth.getSession().then(({ data }) => {
      console.log("[AUTH DEBUG] initial session:", data.session)
    })

    supabase.auth.getUser().then(({ data }) => {
      console.log("[AUTH DEBUG] initial user:", data.user)
    })

    // Listen to *all* auth changes
    const { data: sub } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("[AUTH DEBUG] event:", event)
        console.log("[AUTH DEBUG] session:", session)
        console.log("[AUTH DEBUG] user:", session?.user)
      }
    )

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  return null
}
