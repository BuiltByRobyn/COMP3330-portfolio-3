'use client'

import Link from 'next/link'

export default function MyNavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <ul className="flex gap-6 list-none">
          <li>
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
          </li>

          <li>
            <Link href="/projects" className="text-sm font-medium transition-colors hover:text-primary">
              Projects
            </Link>
          </li>

          <li>
            <Link href="/resume" className="text-sm font-medium transition-colors hover:text-primary">
              Resume
            </Link>
          </li>

          <li>
            <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}