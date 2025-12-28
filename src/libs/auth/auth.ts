import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { loginWithCredentials, loginWithGoogle } from '@/libs/api/auth';
import { Paths } from '@/libs/paths';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await loginWithCredentials({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          return {
            id: user.id,
            email: user.email,
            name: user.displayName,
            image: user.avatarUrl,
          };
        } catch {
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const backendUser = await loginWithGoogle({
            providerUserId: account.providerAccountId,
            email: user.email ?? '',
            displayName: user.name ?? '',
            accessToken: account.access_token ?? '',
            refreshToken: account.refresh_token,
            expiresAt: account.expires_at,
          });

          user.id = backendUser.id;
        } catch {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: Paths.login(),
  },
  trustHost: true,
});
