'use client'

import Link from 'next/link'
import Search from '@/components/SearchButton/Search'

export default function NavBar() {
  return (
   <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4">
      {/* Left: catalogue link */}
      <Link
        href="/explore"
        className="
          text-white
          text-2xl
          font-light
          tracking-wider
          hover:opacity-50
          transition
        "
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        Our Current Favorites
      </Link>

      {/* Right: search */}
      <Search
        placeholder="Search books..."
        iconColor="black"
        className="
          px-5 py-3
          w-96
          rounded-full
          bg-white
          border border-black/15
          text-black
          placeholder:text-black
          placeholder:opacity-60
          focus:outline-none
          focus:ring-2
          focus:ring-black/10
        "
      />
    </nav>
  )
}
