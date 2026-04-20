"use client"

import React from "react"
import Link from "next/link"
import { UserProfile } from "./auth/user-profile"

export function Nav() {
  return (
    <div className="flex h-16 items-center border-b px-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold">AI-OS</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
            Dashboard
          </Link>
          <Link href="/ventures" className="transition-colors hover:text-foreground/80">
            Ventures
          </Link>
          <Link href="/agents" className="transition-colors hover:text-foreground/80">
            Agents
          </Link>
        </nav>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <UserProfile />
      </div>
    </div>
  )
} 