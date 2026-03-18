import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import prisma from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  callbacks: {
    jwt({ token, user }) {
      // On first sign-in, user object is present — persist id into the token
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      // Expose the id on session.user so API routes and server components can use it
      if (token.id) session.user.id = token.id as string
      return session
    },
  },
})
