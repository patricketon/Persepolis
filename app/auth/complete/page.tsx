// "use client"

// import { useEffect, useState } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export default function CompleteProfilePage() {
//   const params = useSearchParams()
//   const router = useRouter()
//   const returnTo = params.get("returnTo") || "/"

//   const supabase = supabaseBrowser()

//   const [displayName, setDisplayName] = useState("")
//   const [is21, setIs21] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     ;(async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()

//       if (!user) {
//         router.replace(`/auth?returnTo=${encodeURIComponent(returnTo)}`)
//         return
//       }

//       const { data: existing } = await supabase
//         .from("profiles")
//         .select("id,is_21_plus")
//         .eq("id", user.id)
//         .maybeSingle()

//       if (existing?.id && existing.is_21_plus) {
//         router.replace(returnTo)
//       }
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   async function complete() {
//     setError(null)
//     setLoading(true)

//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()

//       if (!user) {
//         router.replace(`/auth?returnTo=${encodeURIComponent(returnTo)}`)
//         return
//       }

//       if (!displayName.trim()) {
//         setError("Display name is required.")
//         return
//       }

//       if (!is21) {
//         setError("You must confirm you are 21+ to continue.")
//         return
//       }

//       const { error: upsertErr } = await supabase.from("profiles").upsert({
//         id: user.id,
//         display_name: displayName.trim(),
//         is_21_plus: true,
//       })

//       if (upsertErr) {
//         setError(upsertErr.message)
//         return
//       }

//       router.replace(returnTo)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="w-full max-w-sm space-y-5">
//         <h1 className="text-xl font-semibold">Complete your profile</h1>

//         <div className="text-sm text-black/70">
//           This name is displayed to other people in discussions.
//         </div>

//         <input
//           className="w-full border px-3 py-2"
//           placeholder="Display name"
//           value={displayName}
//           onChange={(e) => setDisplayName(e.target.value)}
//         />

//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             checked={is21}
//             onChange={(e) => setIs21(e.target.checked)}
//           />
//           I confirm I am 21 or older
//         </label>

//         {error && <div className="text-sm text-red-600">{error}</div>}

//         <button
//           onClick={complete}
//           disabled={loading}
//           className="w-full bg-black text-white py-2"
//         >
//           {loading ? "Saving…" : "Enter"}
//         </button>
//       </div>
//     </div>
//   )
// }



// "use client"

// import { useEffect, useState } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export default function CompleteProfilePage() {
//   const params = useSearchParams()
//   const router = useRouter()
//   const returnTo = params.get("returnTo") || "/"

//   const supabase = supabaseBrowser()

//   const [displayName, setDisplayName] = useState("")
//   const [is21, setIs21] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [checkingProfile, setCheckingProfile] = useState(true)

//   useEffect(() => {
//     ;(async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()

//       if (!user) {
//         router.replace(`/auth?returnTo=${encodeURIComponent(returnTo)}`)
//         return
//       }

//       const { data: existing } = await supabase
//         .from("profiles")
//         .select("id,is_21_plus")
//         .eq("id", user.id)
//         .maybeSingle()

//       if (existing?.id && existing.is_21_plus) {
//         // Profile already complete - redirect immediately
//         window.location.href = returnTo
//         return
//       }

//       // Profile not complete - show form
//       setCheckingProfile(false)
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   async function complete() {
//     setError(null)
//     setLoading(true)

//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()

//       if (!user) {
//         router.replace(`/auth?returnTo=${encodeURIComponent(returnTo)}`)
//         return
//       }

//       if (!displayName.trim()) {
//         setError("Display name is required.")
//         return
//       }

//       if (!is21) {
//         setError("You must confirm you are 21+ to continue.")
//         return
//       }

//       // Save profile
//       const { error: upsertErr } = await supabase.from("profiles").upsert({
//         id: user.id,
//         display_name: displayName.trim(),
//         is_21_plus: true,
//       })

//       if (upsertErr) {
//         setError(upsertErr.message)
//         return
//       }

//       // Wait a moment for DB to sync
//       await new Promise(resolve => setTimeout(resolve, 300))

//       // Force full page reload to ensure auth state is fresh
//       window.location.href = returnTo
//     } catch (err) {
//       setError("Something went wrong. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Show loading while checking profile
//   if (checkingProfile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-sm text-black/70">Loading...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="w-full max-w-sm space-y-5">
//         <h1 className="text-xl font-semibold">Complete your profile</h1>

//         <div className="text-sm text-black/70">
//           This name is displayed to other people in discussions.
//         </div>

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Display name"
//           value={displayName}
//           onChange={(e) => setDisplayName(e.target.value)}
//         />

//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             checked={is21}
//             onChange={(e) => setIs21(e.target.checked)}
//           />
//           I confirm I am 21 or older
//         </label>

//         {error && <div className="text-sm text-red-600">{error}</div>}

//         <button
//           onClick={complete}
//           disabled={loading}
//           className="w-full bg-black text-white py-2"
//         >
//           {loading ? "Saving…" : "Enter"}
//         </button>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useEffect, useState } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export default function CompleteProfilePage() {
//   const params = useSearchParams()
//   const router = useRouter()
//   const returnTo = params.get("returnTo") || "/"

//   const supabase = supabaseBrowser()

//   const [displayName, setDisplayName] = useState("")
//   const [is21, setIs21] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [checkingProfile, setCheckingProfile] = useState(true)

//   useEffect(() => {
//     ;(async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()

//       if (!user) {
//         router.replace(`/auth?returnTo=${encodeURIComponent(returnTo)}`)
//         return
//       }

//       const { data: existing } = await supabase
//         .from("profiles")
//         .select("id,is_21_plus")
//         .eq("id", user.id)
//         .maybeSingle()

//       if (existing?.id && existing.is_21_plus) {
//         // Profile already complete - redirect immediately
//         window.location.href = returnTo
//         return
//       }

//       // Profile not complete - show form
//       setCheckingProfile(false)
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   async function complete() {
//     setError(null)
//     setLoading(true)

//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()

//       if (!user) {
//         router.replace(`/auth?returnTo=${encodeURIComponent(returnTo)}`)
//         return
//       }

//       if (!displayName.trim()) {
//         setError("Display name is required.")
//         return
//       }

//       if (!is21) {
//         setError("You must confirm you are 21+ to continue.")
//         return
//       }

//       // Save profile
//       const { error: upsertErr } = await supabase.from("profiles").upsert({
//         id: user.id,
//         display_name: displayName.trim(),
//         is_21_plus: true,
//       })

//       if (upsertErr) {
//         setError(upsertErr.message)
//         return
//       }

//       // Wait a moment for DB to sync
//       await new Promise(resolve => setTimeout(resolve, 300))

//       // Force full page reload to ensure auth state is fresh
//       window.location.href = returnTo
//     } catch (err) {
//       setError("Something went wrong. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Show loading while checking profile
//   if (checkingProfile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-sm text-black/70">Loading...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="w-full max-w-sm space-y-5">
//         <h1 className="text-xl font-semibold">Complete your profile</h1>

//         <div className="text-sm text-black/70">
//           This name is displayed to other people in discussions.
//         </div>

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Display name"
//           value={displayName}
//           onChange={(e) => setDisplayName(e.target.value)}
//         />

//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             checked={is21}
//             onChange={(e) => setIs21(e.target.checked)}
//           />
//           I confirm I am 21 or older
//         </label>

//         {error && <div className="text-sm text-red-600">{error}</div>}

//         <button
//           onClick={complete}
//           disabled={loading}
//           className="w-full bg-black text-white py-2"
//         >
//           {loading ? "Saving…" : "Enter"}
//         </button>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useEffect, useState } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export default function CompleteProfilePage() {
//   const params = useSearchParams()
//   const router = useRouter()
//   const returnTo = params.get("returnTo") || "/"

//   const supabase = supabaseBrowser()

//   const [displayName, setDisplayName] = useState("")
//   const [is21, setIs21] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [checkingProfile, setCheckingProfile] = useState(true)

//   useEffect(() => {
//     ;(async () => {
//       console.log('[PROFILE COMPLETE] Checking existing profile...')
//       console.log('[PROFILE COMPLETE] returnTo:', returnTo)
      
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()

//       console.log('[PROFILE COMPLETE] User:', user?.id)

//       if (!user) {
//         console.log('[PROFILE COMPLETE] No user, redirecting to auth')
//         router.replace(`/auth?returnTo=${encodeURIComponent(returnTo)}`)
//         return
//       }

//       const { data: existing } = await supabase
//         .from("profiles")
//         .select("id,is_21_plus")
//         .eq("id", user.id)
//         .maybeSingle()

//       console.log('[PROFILE COMPLETE] Existing profile:', existing)

//       if (existing?.id && existing.is_21_plus) {
//         console.log('[PROFILE COMPLETE] Profile complete, redirecting to:', returnTo)
//         window.location.href = returnTo
//         return
//       }

//       console.log('[PROFILE COMPLETE] No profile, showing form')
//       setCheckingProfile(false)
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   async function complete() {
//     console.log('[PROFILE COMPLETE] Starting profile creation...')
//     setError(null)
//     setLoading(true)

//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()

//       console.log('[PROFILE COMPLETE] User ID:', user?.id)

//       if (!user) {
//         console.log('[PROFILE COMPLETE] No user during save')
//         router.replace(`/auth?returnTo=${encodeURIComponent(returnTo)}`)
//         return
//       }

//       if (!displayName.trim()) {
//         setError("Display name is required.")
//         return
//       }

//       if (!is21) {
//         setError("You must confirm you are 21+ to continue.")
//         return
//       }

//       console.log('[PROFILE COMPLETE] Saving profile:', {
//         id: user.id,
//         display_name: displayName.trim(),
//         is_21_plus: true
//       })

//       const { error: upsertErr } = await supabase.from("profiles").upsert({
//         id: user.id,
//         display_name: displayName.trim(),
//         is_21_plus: true,
//       })

//       if (upsertErr) {
//         console.error('[PROFILE COMPLETE] Save error:', upsertErr)
//         setError(upsertErr.message)
//         return
//       }

//       console.log('[PROFILE COMPLETE] Profile saved successfully')
//       console.log('[PROFILE COMPLETE] Redirecting to:', returnTo)

//       // Wait for DB sync
//       await new Promise(resolve => setTimeout(resolve, 500))

//       window.location.href = returnTo
//     } catch (err) {
//       console.error('[PROFILE COMPLETE] Unexpected error:', err)
//       setError("Something went wrong. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (checkingProfile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-sm text-black/70">Loading...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="w-full max-w-sm space-y-5">
//         <h1 className="text-xl font-semibold">Complete your profile</h1>

//         <div className="text-sm text-black/70">
//           This name is displayed to other people in discussions.
//         </div>

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Display name"
//           value={displayName}
//           onChange={(e) => setDisplayName(e.target.value)}
//         />

//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             checked={is21}
//             onChange={(e) => setIs21(e.target.checked)}
//           />
//           I confirm I am 21 or older
//         </label>

//         {error && <div className="text-sm text-red-600">{error}</div>}

//         <button
//           onClick={complete}
//           disabled={loading}
//           className="w-full bg-black text-white py-2"
//         >
//           {loading ? "Saving…" : "Enter"}
//         </button>
//       </div>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseBrowser"

export default function CompleteProfilePage() {
  const params = useSearchParams()
  const router = useRouter()
  const returnTo = params.get("returnTo") || "/"

  const supabase = supabaseBrowser()

  const [displayName, setDisplayName] = useState("")
  const [is21, setIs21] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkingProfile, setCheckingProfile] = useState(true)

  useEffect(() => {
    ;(async () => {
      console.log("[PROFILE COMPLETE] mount")
      console.log("[PROFILE COMPLETE] returnTo:", returnTo)

      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser()

      console.log("[PROFILE COMPLETE] getUser:", { user, userErr })

      if (!user) {
        console.log("[PROFILE COMPLETE] no user -> redirect /auth")
        router.replace(`/auth?returnTo=${encodeURIComponent(returnTo)}`)
        return
      }

      const { data: existing, error: profileErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()

      console.log("[PROFILE COMPLETE] existing profile:", {
        existing,
        profileErr,
      })

      if (existing?.is_21_plus) {
        console.log("[PROFILE COMPLETE] already complete -> redirect", returnTo)
        window.location.href = returnTo
        return
      }

      setCheckingProfile(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function complete() {
    console.log("[PROFILE COMPLETE] submit")
    setError(null)
    setLoading(true)

    try {
      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser()

      console.log("[PROFILE COMPLETE] submit getUser:", { user, userErr })

      if (!user) {
        console.log("[PROFILE COMPLETE] submit no user -> redirect /auth")
        router.replace(`/auth?returnTo=${encodeURIComponent(returnTo)}`)
        return
      }

      if (!displayName.trim()) {
        setError("Display name is required.")
        return
      }

      if (!is21) {
        setError("You must confirm you are 21+ to continue.")
        return
      }

      const payload = {
        id: user.id,
        display_name: displayName.trim(),
        is_21_plus: true,
      }

      console.log("[PROFILE COMPLETE] upsert payload:", payload)

      const { error: upsertErr } = await supabase
        .from("profiles")
        .upsert(payload)

      if (upsertErr) {
        console.error("[PROFILE COMPLETE] upsert error:", upsertErr)
        setError(upsertErr.message)
        return
      }

      console.log("[PROFILE COMPLETE] upsert success -> redirect", returnTo)

      await new Promise((r) => setTimeout(r, 500))
      window.location.href = returnTo
    } catch (err) {
      console.error("[PROFILE COMPLETE] unexpected error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (checkingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-sm text-black/70">Loading…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm space-y-5">
        <h1 className="text-xl font-semibold">Complete your profile</h1>

        <div className="text-sm text-black/70">
          This name is displayed to other people in discussions.
        </div>

        <input
          className="w-full border px-3 py-2 text-black"
          placeholder="Display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={is21}
            onChange={(e) => setIs21(e.target.checked)}
          />
          I confirm I am 21 or older
        </label>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          onClick={complete}
          disabled={loading}
          className="w-full bg-black text-white py-2"
        >
          {loading ? "Saving…" : "Enter"}
        </button>
      </div>
    </div>
  )
}
