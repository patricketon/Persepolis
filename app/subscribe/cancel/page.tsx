"use client"

import { useRouter } from "next/navigation"

export default function SubscribeCancel() {
  const router = useRouter()

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
        No worries
      </h1>
      <p style={{ fontSize: "1.1rem", opacity: 0.8, marginBottom: "2rem" }}>
        You can start your free trial anytime.
      </p>
      <button
        onClick={() => router.push("/explore")}
        style={{
          padding: "0.75rem 2rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.3)",
          background: "transparent",
          color: "white",
          cursor: "pointer",
        }}
      >
        Back to Exploring
      </button>
    </div>
  )
}