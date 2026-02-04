// import { createClient } from "@supabase/supabase-js";

// export function supabaseBrowser() {
//   return createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );
// }


// import { createBrowserClient } from "@supabase/ssr"

// export const supabaseBrowser = () =>
//   createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           const value = document.cookie
//             .split('; ')
//             .find(row => row.startsWith(`${name}=`))
//             ?.split('=')[1]
//           return value ? decodeURIComponent(value) : undefined
//         },
//         set(name: string, value: string, options: any) {
//           let cookie = `${name}=${encodeURIComponent(value)}`
//           cookie += `; path=${options.path || '/'}`
//           cookie += `; max-age=${options.maxAge || 31536000}`
//           cookie += `; SameSite=Lax`
//           document.cookie = cookie
//         },
//         remove(name: string, options: any) {
//           document.cookie = `${name}=; path=${options.path || '/'}; max-age=0`
//         },
//       },
//     }
//   )


import { createBrowserClient } from "@supabase/ssr"

export const supabaseBrowser = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          if (typeof document === 'undefined') return undefined
          const value = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${name}=`))
            ?.split('=')[1]
          return value ? decodeURIComponent(value) : undefined
        },
        set(name: string, value: string, options: any) {
          if (typeof document === 'undefined') return
          let cookie = `${name}=${encodeURIComponent(value)}`
          cookie += `; path=${options.path || '/'}`
          cookie += `; max-age=${options.maxAge || 31536000}`
          cookie += `; SameSite=Lax`
          document.cookie = cookie
        },
        remove(name: string, options: any) {
          if (typeof document === 'undefined') return
          document.cookie = `${name}=; path=${options.path || '/'}; max-age=0`
        },
      },
    }
  )