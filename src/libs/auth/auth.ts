import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import {
  postAuthLogin,
  postAuthOauthGoogle,
} from '@/libs/api/generated/auth/auth';
import { Pages } from '@/libs/pages';

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
          const response = await postAuthLogin({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (response.status !== 200) {
            return null;
          }

          const user = response.data.data?.user;
          if (!user) {
            return null;
          }

          return {
            id: user.id ?? '',
            email: user.email ?? '',
            name: user.displayName ?? '',
            image: user.avatarUrl ?? null,
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
          const response = await postAuthOauthGoogle({
            providerUserId: account.providerAccountId,
            email: user.email ?? '',
            displayName: user.name ?? '',
            accessToken: account.access_token ?? '',
            refreshToken: account.refresh_token,
            expiresAt: account.expires_at,
          });

          if (response.status !== 200 && response.status !== 201) {
            return false;
          }

          const backendUser = response.data.data?.user;
          if (!backendUser?.id) {
            return false;
          }

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
    signIn: Pages.login.path(),
  },
  trustHost: true,
});
