import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { createGuest, getGuest } from './data-service'

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user
    },
    async signIn({ user, account, profile }) {
      try {
        const existingdGuest = await getGuest(user.email)
        if (!existingdGuest)
          await createGuest({ email: user.email, fullName: user.name })
        return true
      } catch {
        return false
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email)
      session.user.guestId = guest.id
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig)
