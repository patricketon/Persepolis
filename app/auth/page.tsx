// "use client"

// import { useState } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export default function AuthPage() {
//   const params = useSearchParams()
//   const router = useRouter()
//   const returnTo = params.get("returnTo") || "/"

//   const supabase = supabaseBrowser()

//   const [mode, setMode] = useState<"signup" | "signin">("signup")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [password2, setPassword2] = useState("")
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)

//   async function handleSubmit() {
//     setError(null)
//     setLoading(true)

//     try {
//       if (!email || !password) {
//         setError("Email and password are required.")
//         return
//       }

//       if (mode === "signup") {
//         if (password.length < 8) {
//           setError("Password must be at least 8 characters.")
//           return
//         }
//         if (password !== password2) {
//           setError("Passwords do not match.")
//           return
//         }

//         const { error: signUpErr } = await supabase.auth.signUp({
//           email,
//           password,
//         })

//         if (signUpErr) {
//           setError(signUpErr.message)
//           return
//         }

//         // after signup, always go to profile completion
//         router.replace(
//           `/auth/complete?returnTo=${encodeURIComponent(returnTo)}`
//         )
//         return
//       }

//       // signin
//       const { error: signInErr } =
//         await supabase.auth.signInWithPassword({
//           email,
//           password,
//         })

//       if (signInErr) {
//         setError(signInErr.message)
//         return
//       }

//       router.replace(
//         `/auth/complete?returnTo=${encodeURIComponent(returnTo)}`
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="w-full max-w-sm space-y-5">
//         <div className="flex gap-2">
//           <button
//             className={`flex-1 border py-2 ${
//               mode === "signup" ? "bg-black text-white" : ""
//             }`}
//             onClick={() => setMode("signup")}
//             disabled={loading}
//           >
//             Sign up
//           </button>
//           <button
//             className={`flex-1 border py-2 ${
//               mode === "signin" ? "bg-black text-white" : ""
//             }`}
//             onClick={() => setMode("signin")}
//             disabled={loading}
//           >
//             Sign in
//           </button>
//         </div>

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {mode === "signup" && (
//           <input
//             className="w-full border px-3 py-2 text-black"
//             placeholder="Confirm password"
//             type="password"
//             value={password2}
//             onChange={(e) => setPassword2(e.target.value)}
//           />
//         )}

//         {error && <div className="text-sm text-red-600">{error}</div>}

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full bg-black text-white py-2"
//         >
//           {loading
//             ? "Continuing…"
//             : mode === "signup"
//             ? "Create account"
//             : "Sign in"}
//         </button>
//       </div>
//     </div>
//   )
// }



// "use client"

// import { useState } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export default function AuthPage() {
//   const params = useSearchParams()
//   const router = useRouter()
//   const returnTo = params.get("returnTo") || "/"

//   const supabase = supabaseBrowser()

//   const [mode, setMode] = useState<"signup" | "signin">("signup")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [password2, setPassword2] = useState("")
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)

//   async function handleSubmit() {
//     setError(null)
//     setLoading(true)

//     try {
//       if (!email || !password) {
//         setError("Email and password are required.")
//         return
//       }

//       if (mode === "signup") {
//         if (password.length < 8) {
//           setError("Password must be at least 8 characters.")
//           return
//         }

//         if (password !== password2) {
//           setError("Passwords do not match.")
//           return
//         }

//         const { error: signUpErr } = await supabase.auth.signUp({
//           email,
//           password,
//         })

//         if (signUpErr) {
//           setError(signUpErr.message)
//           return
//         }

//         // New users must complete profile
//         router.replace(
//           `/auth/complete?returnTo=${encodeURIComponent(returnTo)}`
//         )
//         return
//       }

//       // Sign in
//       const { error: signInErr } =
//         await supabase.auth.signInWithPassword({
//           email,
//           password,
//         })

//       if (signInErr) {
//         setError(signInErr.message)
//         return
//       }

//       // Existing users go directly back to intent
//       router.replace(returnTo)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="w-full max-w-sm space-y-5">
//         <div className="flex gap-2">
//           <button
//             className={`flex-1 border py-2 ${
//               mode === "signup" ? "bg-black text-white" : ""
//             }`}
//             onClick={() => setMode("signup")}
//             disabled={loading}
//           >
//             Sign up
//           </button>
//           <button
//             className={`flex-1 border py-2 ${
//               mode === "signin" ? "bg-black text-white" : ""
//             }`}
//             onClick={() => setMode("signin")}
//             disabled={loading}
//           >
//             Sign in
//           </button>
//         </div>

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {mode === "signup" && (
//           <input
//             className="w-full border px-3 py-2 text-black"
//             placeholder="Confirm password"
//             type="password"
//             value={password2}
//             onChange={(e) => setPassword2(e.target.value)}
//           />
//         )}

//         {error && <div className="text-sm text-red-600">{error}</div>}

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full bg-black text-white py-2"
//         >
//           {loading
//             ? "Continuing…"
//             : mode === "signup"
//             ? "Create account"
//             : "Sign in"}
//         </button>
//       </div>
//     </div>
//   )
// }



// "use client"

// import { useState } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export default function AuthPage() {
//   const params = useSearchParams()
//   const router = useRouter()
//   const returnTo = params.get("returnTo") || "/"

//   const supabase = supabaseBrowser()

//   const [mode, setMode] = useState<"signup" | "signin">("signup")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [password2, setPassword2] = useState("")
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)

//   async function handleSubmit() {
//     setError(null)
//     setLoading(true)

//     try {
//       if (!email || !password) {
//         setError("Email and password are required.")
//         return
//       }

//       if (mode === "signup") {
//         if (password.length < 8) {
//           setError("Password must be at least 8 characters.")
//           return
//         }

//         if (password !== password2) {
//           setError("Passwords do not match.")
//           return
//         }

//         const { error: signUpErr } = await supabase.auth.signUp({
//           email,
//           password,
//         })

//         if (signUpErr) {
//           setError(signUpErr.message)
//           return
//         }

//         // 🔑 CRITICAL: establish session immediately after signup
//         const { error: signInErr } =
//           await supabase.auth.signInWithPassword({
//             email,
//             password,
//           })

//         if (signInErr) {
//           setError(signInErr.message)
//           return
//         }

//         router.replace(
//           `/auth/complete?returnTo=${encodeURIComponent(returnTo)}`
//         )
//         return
//       }

//       // Sign in
//       const { error: signInErr } =
//         await supabase.auth.signInWithPassword({
//           email,
//           password,
//         })

//       if (signInErr) {
//         setError(signInErr.message)
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
//         <div className="flex gap-2">
//           <button
//             className={`flex-1 border py-2 ${
//               mode === "signup" ? "bg-black text-white" : ""
//             }`}
//             onClick={() => setMode("signup")}
//             disabled={loading}
//           >
//             Sign up
//           </button>
//           <button
//             className={`flex-1 border py-2 ${
//               mode === "signin" ? "bg-black text-white" : ""
//             }`}
//             onClick={() => setMode("signin")}
//             disabled={loading}
//           >
//             Sign in
//           </button>
//         </div>

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {mode === "signup" && (
//           <input
//             className="w-full border px-3 py-2 text-black"
//             placeholder="Confirm password"
//             type="password"
//             value={password2}
//             onChange={(e) => setPassword2(e.target.value)}
//           />
//         )}

//         {error && <div className="text-sm text-red-600">{error}</div>}

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full bg-black text-white py-2"
//         >
//           {loading
//             ? "Continuing…"
//             : mode === "signup"
//             ? "Create account"
//             : "Sign in"}
//         </button>
//       </div>
//     </div>
//   )
// }




// "use client"

// import { useState } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export default function AuthPage() {
//   const params = useSearchParams()
//   const router = useRouter()
//   const returnTo = params.get("returnTo") || "/"

//   const supabase = supabaseBrowser()

//   const [mode, setMode] = useState<"signup" | "signin">("signup")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [password2, setPassword2] = useState("")
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault() // 🔑 CRITICAL: prevent page refresh
//     setError(null)
//     setLoading(true)

//     try {
//       if (!email || !password) {
//         setError("Email and password are required.")
//         return
//       }

//       if (mode === "signup") {
//         if (password.length < 8) {
//           setError("Password must be at least 8 characters.")
//           return
//         }

//         if (password !== password2) {
//           setError("Passwords do not match.")
//           return
//         }

//         const { error: signUpErr } = await supabase.auth.signUp({
//           email,
//           password,
//         })

//         if (signUpErr) {
//           setError(signUpErr.message)
//           return
//         }

//         // 🔑 establish session immediately
//         const { error: signInErr } =
//           await supabase.auth.signInWithPassword({
//             email,
//             password,
//           })

//         if (signInErr) {
//           setError(signInErr.message)
//           return
//         }

//         router.replace(
//           `/auth/complete?returnTo=${encodeURIComponent(returnTo)}`
//         )
//         return
//       }

//       // Sign in
//       const { error: signInErr } =
//         await supabase.auth.signInWithPassword({
//           email,
//           password,
//         })

//       if (signInErr) {
//         setError(signInErr.message)
//         return
//       }

//       router.replace(returnTo)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm space-y-5"
//       >
//         <div className="flex gap-2">
//           <button
//             type="button"
//             className={`flex-1 border py-2 ${
//               mode === "signup" ? "bg-black text-white" : ""
//             }`}
//             onClick={() => setMode("signup")}
//             disabled={loading}
//           >
//             Sign up
//           </button>
//           <button
//             type="button"
//             className={`flex-1 border py-2 ${
//               mode === "signin" ? "bg-black text-white" : ""
//             }`}
//             onClick={() => setMode("signin")}
//             disabled={loading}
//           >
//             Sign in
//           </button>
//         </div>

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {mode === "signup" && (
//           <input
//             className="w-full border px-3 py-2 text-black"
//             placeholder="Confirm password"
//             type="password"
//             value={password2}
//             onChange={(e) => setPassword2(e.target.value)}
//           />
//         )}

//         {error && <div className="text-sm text-red-600">{error}</div>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-black text-white py-2"
//         >
//           {loading
//             ? "Continuing…"
//             : mode === "signup"
//             ? "Create account"
//             : "Sign in"}
//         </button>
//       </form>
//     </div>
//   )
// }


// "use client"

// import { useState } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import { supabaseBrowser } from "@/lib/supabaseBrowser"

// export default function AuthPage() {
//   const params = useSearchParams()
//   const router = useRouter()
//   const returnTo = params.get("returnTo") || "/"

//   const supabase = supabaseBrowser()

//   const [mode, setMode] = useState<"signup" | "signin">("signup")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [password2, setPassword2] = useState("")
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     setError(null)
//     setLoading(true)

//     try {
//       if (!email || !password) {
//         setError("Email and password are required.")
//         return
//       }

//       if (mode === "signup") {
//         if (password.length < 8) {
//           setError("Password must be at least 8 characters.")
//           return
//         }

//         if (password !== password2) {
//           setError("Passwords do not match.")
//           return
//         }

//         const { error: signUpErr } = await supabase.auth.signUp({
//           email,
//           password,
//         })

//         if (signUpErr) {
//           setError(signUpErr.message)
//           return
//         }

//         // Establish session immediately
//         const { error: signInErr } =
//           await supabase.auth.signInWithPassword({
//             email,
//             password,
//           })

//         if (signInErr) {
//           setError(signInErr.message)
//           return
//         }

//         router.replace(
//           `/auth/complete?returnTo=${encodeURIComponent(returnTo)}`
//         )
//         return
//       }

//       // Sign in
//       const { error: signInErr } =
//         await supabase.auth.signInWithPassword({
//           email,
//           password,
//         })

//       if (signInErr) {
//         setError(signInErr.message)
//         return
//       }

//       // 🔑 FIXED: Full page reload to trigger BookClient pendingSession logic
//       window.location.href = returnTo
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm space-y-5"
//       >
//         <div className="flex gap-2">
//           <button
//             type="button"
//             className={`flex-1 border py-2 ${
//               mode === "signup" ? "bg-black text-white" : ""
//             }`}
//             onClick={() => setMode("signup")}
//             disabled={loading}
//           >
//             Sign up
//           </button>
//           <button
//             type="button"
//             className={`flex-1 border py-2 ${
//               mode === "signin" ? "bg-black text-white" : ""
//             }`}
//             onClick={() => setMode("signin")}
//             disabled={loading}
//           >
//             Sign in
//           </button>
//         </div>

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           className="w-full border px-3 py-2 text-black"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {mode === "signup" && (
//           <input
//             className="w-full border px-3 py-2 text-black"
//             placeholder="Confirm password"
//             type="password"
//             value={password2}
//             onChange={(e) => setPassword2(e.target.value)}
//           />
//         )}

//         {error && <div className="text-sm text-red-600">{error}</div>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-black text-white py-2"
//         >
//           {loading
//             ? "Continuing…"
//             : mode === "signup"
//             ? "Create account"
//             : "Sign in"}
//         </button>
//       </form>
//     </div>
//   )
// }





"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseBrowser"
import AuthBackground from "./AuthBackground"

export default function AuthPage() {
  const params = useSearchParams()
  const router = useRouter()
  const returnTo = params.get("returnTo") || "/"

  const supabase = supabaseBrowser()

  const [mode, setMode] = useState<"signup" | "signin">("signup")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (!email || !password) {
        setError("Email and password are required.")
        return
      }

      if (mode === "signup") {
        if (password.length < 8) {
          setError("Password must be at least 8 characters.")
          return
        }

        if (password !== password2) {
          setError("Passwords do not match.")
          return
        }

        const { error: signUpErr } = await supabase.auth.signUp({
          email,
          password,
        })

        if (signUpErr) {
          setError(signUpErr.message)
          return
        }

        const { error: signInErr } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          })

        if (signInErr) {
          setError(signInErr.message)
          return
        }

        router.replace(
          `/auth/complete?returnTo=${encodeURIComponent(returnTo)}`
        )
        return
      }

      const { error: signInErr } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        })

      if (signInErr) {
        setError(signInErr.message)
        return
      }

      window.location.href = returnTo
    } finally {
      setLoading(false)
    }
  }

  return (
    // <div className="relative min-h-screen bg-white text-black">
    //   {/* Background */}
    //   <AuthBackground />

    //   {/* Foreground */}
    //   <div className="relative z-10 flex min-h-screen items-center justify-center">
    //     <form
    //       onSubmit={handleSubmit}
    //       className="w-full max-w-sm space-y-6 px-6 text-lg"
    //     >
    //       <h1 className="text-center text-2xl font-light tracking-wide">
    //         Persepolis
    //       </h1>

    //       <p className="text-center text-black/60">
    //         A place to read together.
    //       </p>

    //       <div className="flex gap-2">
    //         <button
    //           type="button"
    //           className={`flex-1 rounded-full border py-2 text-sm transition ${
    //             mode === "signup"
    //               ? "bg-black text-white border-black"
    //               : "border-black/20"
    //           }`}
    //           onClick={() => setMode("signup")}
    //           disabled={loading}
    //         >
    //           Sign up
    //         </button>
    //         <button
    //           type="button"
    //           className={`flex-1 rounded-full border py-2 text-sm transition ${
    //             mode === "signin"
    //               ? "bg-black text-white border-black"
    //               : "border-black/20"
    //           }`}
    //           onClick={() => setMode("signin")}
    //           disabled={loading}
    //         >
    //           Sign in
    //         </button>
    //       </div>

    //       <input
    //         className="w-full rounded-full border border-black/20 px-4 py-3 focus:outline-none focus:border-black"
    //         placeholder="Email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />

    //       <input
    //         className="w-full rounded-full border border-black/20 px-4 py-3 focus:outline-none focus:border-black"
    //         placeholder="Password"
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />

    //       {mode === "signup" && (
    //         <input
    //           className="w-full rounded-full border border-black/20 px-4 py-3 focus:outline-none focus:border-black"
    //           placeholder="Confirm password"
    //           type="password"
    //           value={password2}
    //           onChange={(e) => setPassword2(e.target.value)}
    //         />
    //       )}

    //       {error && (
    //         <div className="text-center text-red-600">
    //           {error}
    //         </div>
    //       )}

    //       <button
    //         type="submit"
    //         disabled={loading}
    //         className="w-full rounded-full bg-black py-3 text-white transition hover:opacity-90"
    //       >
    //         {loading
    //           ? "Continuing…"
    //           : mode === "signup"
    //           ? "Create account"
    //           : "Sign in"}
    //       </button>

    //       <p className="pt-4 text-center text-md text-black/40">
    //         By entering, you agree to keep the space thoughtful.
    //       </p>
    //     </form>
    //   </div>
    // </div>
        <div className="relative min-h-screen bg-white text-black">
            {/* Background */}
            <AuthBackground />

            {/* Foreground */}
            <div className="relative z-10 flex min-h-screen items-center justify-center">
                <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-6 px-6 text-xl"
                >
                <h1 className="text-center text-3xl font-light tracking-wide">
                    Persepolis
                </h1>

                <p className="text-center text-black/60">
                    A place for all of us to thrive.
                </p>

                <div className="flex gap-2">
                    <button
                    type="button"
                    className={`flex-1 rounded-full border py-3 transition ${
                        mode === "signup"
                        ? "bg-black text-white border-black"
                        : "border-black/20"
                    }`}
                    onClick={() => setMode("signup")}
                    disabled={loading}
                    >
                    Sign up
                    </button>

                    <button
                    type="button"
                    className={`flex-1 rounded-full border py-3 transition ${
                        mode === "signin"
                        ? "bg-black text-white border-black"
                        : "border-black/20"
                    }`}
                    onClick={() => setMode("signin")}
                    disabled={loading}
                    >
                    Sign in
                    </button>
                </div>

                <input
                    className="w-full rounded-full border border-black/20 px-4 py-3 focus:outline-none focus:border-black"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full rounded-full border border-black/20 px-4 py-3 focus:outline-none focus:border-black"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {mode === "signup" && (
                    <input
                    className="w-full rounded-full border border-black/20 px-4 py-3 focus:outline-none focus:border-black"
                    placeholder="Confirm password"
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    />
                )}

                {error && (
                    <div className="text-center text-red-600">
                    {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-black py-3 text-white transition hover:opacity-90"
                >
                    {loading
                    ? "Continuing…"
                    : mode === "signup"
                    ? "Create account"
                    : "Sign in"}
                </button>

                <p className="pt-4 text-center text-black/40">
                    By entering, you agree to maintain our community guidelines.
                </p>
                </form>
            </div>
        </div>
  )
}
