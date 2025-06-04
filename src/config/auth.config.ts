import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { findOrCreate, loggedUser } from '../lib/helper';
import { SignInType } from '../types';
import { isDev } from './env.config';
import { z } from 'zod';

// Validation schema for OAuth profile
const oauthProfileSchema = z.object({
  email: z.string().email('Invalid email address!'),
  name: z.string().optional(),
  picture: z.string().url().optional(),
});

const credentialsSchema = z.object({
  email: z.string().email('Invalid email address!'),
  password: z.string().min(6, 'Password must be at least 6 characters!'),
});

export const authConfig = {
  // Trust host in production (required for some deployments)
  trustHost: true,

  // Custom pages
  pages: {
    signIn: '/signin',
    error: '/auth/error',
  },

  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // Callbacks
  callbacks: {
    async signIn({ account, profile, user }) {
      try {
        if (account?.provider === 'google' && profile) {
          console.log(profile);

          const validatedProfile = oauthProfileSchema.safeParse(profile);

          if (!validatedProfile.success) {
            console.error('Invalid OAuth profile:', validatedProfile.error);
            return false;
          }

          const { email, name, picture } = validatedProfile.data;

          // Generate username from email
          const username = email.split('@')[0] || `user_${Date.now()}`;

          const userCredentials = {
            username,
            email,
            full_name: name,
            provider: account.provider,
            // password: generateRandomPassword(10),
            avatar: picture,
            isOAuthUser: true,
          };

          try {
            const createdUser = await findOrCreate(userCredentials);

            // Add user data to the user object for JWT callback
            if (createdUser) {
              user.id = createdUser.id || createdUser._id;
              user.name = createdUser.full_name || createdUser.username;
              user.email = createdUser.email;
              user.image = createdUser.avatar;
            }

            return true;
          } catch (error) {
            console.error('Database error during OAuth sign-in:', error);
            return false;
          }
        }

        // Handle credentials provider
        if (account?.provider === 'credentials') {
          // User is already authenticated by the authorize function
          return true;
        }

        // Allow other providers or return true by default
        return true;
      } catch (error: unknown) {
        console.error('Unexpected error during sign-in:', error);
        return false;
      }
    },

    // Customize JWT token
    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in - add user data to token
      if (user && account) {
        token.id = user.id;
        token.provider = account.provider;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      // Handle session update
      if (trigger === 'update' && session) {
        token.name = session.name;
        token.email = session.email;
        token.picture = session.picture;
      }

      return token;
    },

    // Customize session object
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name || '';
        session.user.email = token.email || '';
        session.user.image = token.picture || '';

        // Add custom fields
        session.provider = token.provider || undefined;
      }
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAuth =
        nextUrl.pathname.startsWith('/signin') || nextUrl.pathname.startsWith('/signup');

      // Protect dashboard routes
      if (isOnDashboard) {
        return isLoggedIn;
      }

      // Redirect logged-in users away from auth pages
      if (isOnAuth && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Allow all other routes
      return true;
    },
  },

  // Providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'your-email@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },

      async authorize(credentials) {
        try {
          // Validate credentials format
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          const validatedCredentials = credentialsSchema.safeParse({
            email: credentials.email,
            password: credentials.password,
          });

          if (!validatedCredentials.success) {
            console.error('Invalid credentials format:', validatedCredentials.error);
            return null;
          }

          const { email, password } = validatedCredentials.data;

          // Authenticate user
          const user = await loggedUser({ email, password } as SignInType);

          if (!user) {
            console.error('Authentication failed for email:', email);
            return null;
          }

          // Return user object that will be passed to JWT callback
          return {
            id: user._id,
            name: user.full_name || user.username,
            email: user.email,
            image: user.avatar,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],

  // Security configuration
  secret: process.env.AUTH_SECRET,

  // Enable debug only in development
  debug: isDev,

  // Additional security options
  useSecureCookies: !isDev, // Use secure cookies in production

  // Cookie configuration
  cookies: {
    sessionToken: {
      name: isDev ? 'next-auth.session-token' : '__Secure-next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: !isDev,
        domain: isDev ? 'localhost' : undefined, // Set your domain in production
      },
    },
  },

  // Events for logging
  events: {
    async signIn({ user, account }) {
      console.log(`User signed in: ${user.email} via ${account?.provider}`);
    },

    async signOut(message) {
      if ('session' in message) {
        const session = message.session as { user?: { email?: string } };
        console.log(`User signed out: ${session?.user?.email}`);
      } else if ('token' in message) {
        console.log(`User signed out: ${message.token?.email}`);
      }
    },

    async createUser({ user }) {
      console.log(`New user created: ${user.email}`);
    },
  },
} satisfies NextAuthConfig;
