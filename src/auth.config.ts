import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { findOrCreate, generateRandomPassword, loggedUser } from './lib/helper';
import { SignInType } from './types';

export const authConfig = {
  
  trustHost: true,
  
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile) {

        const email = profile?.email;

        if (!email) throw new Error('Google account email is required');

        try {
          const user_name = email.split('@')[0] || `user_${Date.now()}`;
          
          const credentials = {
            user_name,
            email,
            fullName: profile.name,
            provider: account.provider,
            password: generateRandomPassword(10)
          }

          await findOrCreate(credentials);

          return true;
        } catch (error: unknown) {
          console.error("Error during sign-in:", error);
          return false;
        }
      }

      return true;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      console.log(isLoggedIn);
      

      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        username: { type: "text", },
        email: { type: "email" },
        password: { type: "password" },
      },

      authorize({ email, password }) {

        const credentials = {
          email,
          password,
        } as SignInType

        try {
          return loggedUser(credentials);
        } catch (error: unknown) {
          console.error("An error occurred while logging you in", error);
          
          return null;
        }
      }

    })],
  secret: process.env.AUTH_SECRET,
  debug: true,
  session: { strategy: "jwt", maxAge: 60 * 60, }

} satisfies NextAuthConfig;