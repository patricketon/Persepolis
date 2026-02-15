"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SubscribeSuccess() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to explore page after 3 seconds
    const timeout = setTimeout(() => {
      router.push("/explore")
    }, 3000)
    return () => clearTimeout(timeout)
  }, [router])

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
      <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
        Your 14-day free trial has started. Redirecting you to explore...
      </p>
    </div>
  )
}