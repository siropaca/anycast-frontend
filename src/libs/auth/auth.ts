import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import {
  postAuthLogin,
  postAuthOauthGoogle,
} from '@/libs/api/generated/auth/auth';
import { deduplicatedRefresh } from '@/libs/auth/refresh';
import { isTokenExpiringSoon } from '@/libs/auth/token';
import { Pages } from '@/libs/pages';

// ---------------------------------------------------------------------------
// 型拡張
// ---------------------------------------------------------------------------

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: 'RefreshTokenError';
    user: {
      id: string;
      username?: string;
    } & DefaultSession['user'];
  }
}

/** jwt コールバック内で使用する拡張 JWT 型 */
interface ExtendedJWT {
  id?: string;
  username?: string;
  accessToken?: string;
  refreshToken?: string;
  error?: 'RefreshTokenError';
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// NextAuth 設定
// ---------------------------------------------------------------------------

const nextAuth = NextAuth({
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

          const data = response.data.data;
          const user = data?.user;
          const accessToken = data?.accessToken;
          const refreshToken = data?.refreshToken;
          if (!user || !accessToken) {
            return null;
          }

          return {
            id: user.id ?? '',
            username: user.username,
            email: user.email ?? '',
            name: user.displayName ?? '',
            image: user.avatarUrl ?? null,
            accessToken,
            refreshToken,
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

          const data = response.data.data;
          const backendUser = data?.user;
          const backendAccessToken = data?.accessToken;
          if (!backendUser?.id || !backendAccessToken) {
            return false;
          }

          user.id = backendUser.id;
          (user as { username?: string }).username = backendUser.username;
          (user as { accessToken?: string }).accessToken = backendAccessToken;
          (user as { refreshToken?: string }).refreshToken = data?.refreshToken;
        } catch {
          return false;
        }
      }
      return true;
    },
    async jwt({ token: rawToken, user }) {
      const token = rawToken as ExtendedJWT;

      // 初回ログイン時: user からトークンを引き継ぐ
      if (user) {
        token.id = user.id as string;
        token.username = (user as { username?: string }).username;
        token.accessToken = (user as { accessToken?: string }).accessToken;
        token.refreshToken = (user as { refreshToken?: string }).refreshToken;
        token.error = undefined;
        return token;
      }

      // アクセストークンがまだ有効な場合はそのまま返す
      if (token.accessToken && !isTokenExpiringSoon(token.accessToken)) {
        token.error = undefined;
        return token;
      }

      // アクセストークンの有効期限が近い or 切れている → リフレッシュ
      if (token.refreshToken) {
        try {
          const result = await deduplicatedRefresh(token.refreshToken);
          token.accessToken = result.accessToken;
          token.refreshToken = result.refreshToken;
          token.error = undefined;
          return token;
        } catch {
          token.error = 'RefreshTokenError';
          return token;
        }
      }

      return token;
    },
    async session({ session, token: rawToken }) {
      const token = rawToken as ExtendedJWT;
      if (token.id) {
        session.user.id = token.id;
      }
      if (token.username) {
        session.user.username = token.username;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      session.error = token.error;
      return session;
    },
  },
  events: {
    async signOut(message) {
      // JWT strategy では { token } を受け取る
      if ('token' in message && message.token) {
        const { accessToken, refreshToken } = message.token as ExtendedJWT;
        if (refreshToken) {
          try {
            await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(accessToken
                    ? { Authorization: `Bearer ${accessToken}` }
                    : {}),
                },
                body: JSON.stringify({ refreshToken }),
              },
            );
          } catch {
            // ログアウト API の失敗は無視（トークンは自然に期限切れになる）
          }
        }
      }
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

export const { handlers, signIn, signOut } = nextAuth;

/** ミドルウェア用の認証ハンドラ */
export const authMiddleware = nextAuth.auth;

/**
 * 認証情報を取得する
 *
 * @returns session と isLoggedIn
 *
 * @example
 * const { session, isLoggedIn } = await auth();
 * if (isLoggedIn) {
 *   console.log(session.user.name);
 * }
 */
export async function auth() {
  const session = await nextAuth.auth();

  return {
    session,
    isLoggedIn: !!session,
  };
}
