"use client"

import { ReactNode } from "react"
import { AuthDebug } from "@/components/AuthDebug"

export function AppClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthDebug />
      {children}
    </>
  )
}