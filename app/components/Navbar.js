"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()
  const isActive = (path) => pathname === path
  return (
    <nav className="fixed top-3.5 left-0 right-0 z-70 flex justify-center">
      <div className="bg-white px-8 py-3 rounded-b-2xl shadow-sm flex items-center gap-8 border-x border-b border-gray-100 font-mono">
        <Link
          href="/"
          className="font-bold text-xl bg-linear-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          GIFT WISHLIST
        </Link>
        <Link
          href="/my-list"
          className={`text-xs uppercase tracking-widest font-bold transition-colors ${
            isActive("/my-list")
              ? "text-blue-400"
              : "text-gray-400 hover:text-gray-900"
          }`}
        >
          Lista per lui
        </Link>
        <Link
          href="/partner-list"
          className={`text-xs uppercase tracking-widest font-bold transition-colors ${
            isActive("/partner-list")
              ? "text-pink-500"
              : "text-gray-400 hover:text-pink-500"
          }`}
        >
          Lista per lei
        </Link>
      </div>
    </nav>
  )
}
