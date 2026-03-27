import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/auth"

export async function proxy(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }
}

export const config = {
  matcher: ["/((?!sign-in|api/auth|_next/static|_next/image|favicon.ico).*)"],
}
