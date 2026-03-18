"use client"

import { signIn } from "next-auth/react"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8">Energy Tracker</h1>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="rounded-full border border-solid border-foreground/10 px-6 py-3 text-sm hover:bg-foreground/5 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
