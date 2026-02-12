// 'use client'

// import Link from 'next/link'

// export default function HomeButton() {
//   return (
//     <nav className="fixed top-0 left-0 z-[1000] px-10 py-4 pointer-events-auto">
//       <Link
//         href="/searchPage"
//         className="text-white text-2xl font-light tracking-wider hover:opacity-50 transition"
//         style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
//       >
//         Persepolis
//       </Link>
//     </nav>
//   )
// }

'use client'

import Link from 'next/link'
import { useBook } from '@/app/context/BookContext'

export default function HomeButton() {
  const { lastQuery } = useBook()

  const href = lastQuery
    ? `/searchPage?query=${encodeURIComponent(lastQuery)}`
    : '/searchPage'

  return (
    <nav className="fixed top-0 left-0 z-[1000] px-10 py-4 pointer-events-auto">
      <Link
        href={href}
        className="text-white text-2xl font-light tracking-wider hover:opacity-50 transition"
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        Persepolis
      </Link>
    </nav>
  )
}