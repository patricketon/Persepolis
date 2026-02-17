// "use client"

// import { useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"

// export default function SubscribeSuccess() {
//   const router = useRouter()
//   const params = useSearchParams()

//   const returnTo = params.get("returnTo") || "/searchPage"

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       router.push(returnTo)
//     }, 2000)

//     return () => clearTimeout(timeout)
//   }, [router, returnTo])

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         color: "white",
//         fontFamily: "var(--font-geist-sans)",
//         textAlign: "center",
//         padding: "2rem",
//       }}
//     >
//       <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
//         Welcome to Persepolis
//       </h1>
//       <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
//         Your 14-day free trial has started. Redirecting you...
//       </p>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseBrowser"

export default function SubscribeSuccess() {
  const router = useRouter()
  const params = useSearchParams()
  const returnTo = params.get("returnTo") || "/searchPage"
  const [status, setStatus] = useState<"verifying" | "ready" | "timeout">("verifying")

  useEffect(() => {
    let cancelled = false
    let attempts = 0
    const maxAttempts = 15 // 15 attempts × 2s = 30s max wait

    async function pollSubscription() {
      const supabase = supabaseBrowser()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push(returnTo)
        return
      }

      while (!cancelled && attempts < maxAttempts) {
        attempts++

        const { data } = await supabase
          .from("subscriptions")
          .select("status")
          .eq("user_id", user.id)
          .in("status", ["active", "trialing"])
          .maybeSingle()

        if (data) {
          // Subscription confirmed in DB
          setStatus("ready")
          setTimeout(() => {
            if (!cancelled) router.push(returnTo)
          }, 1500)
          return
        }

        // Wait 2s before retrying
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }

      // Webhook hasn't fired in 30s — redirect anyway
      if (!cancelled) {
        setStatus("timeout")
        setTimeout(() => {
          if (!cancelled) router.push(returnTo)
        }, 2000)
      }
    }

    pollSubscription()

    return () => {
      cancelled = true
    }
  }, [router, returnTo])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "white",
        fontFamily: "var(--font-geist-sans)",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Welcome to Persepolis
      </h1>
      {status === "verifying" && (
        <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
          Your 14-day free trial has started. Setting things up…
        </p>
      )}
      {status === "ready" && (
        <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
          You&apos;re all set! Redirecting you now…
        </p>
      )}
      {status === "timeout" && (
        <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
          Almost there — redirecting you now…
        </p>
      )}
    </div>
  )
}