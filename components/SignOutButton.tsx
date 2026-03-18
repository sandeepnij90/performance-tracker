"use client"

import { signOut } from "next-auth/react"

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/sign-in" })}
      className="text-sm text-foreground/60 hover:text-foreground transition-colors"
    >
      Sign out
    </button>
  )
}
