# 認証仕様

## 概要

Anycast では Auth.js v5（next-auth@beta）を使用した認証を実装している。

### 対応認証方式

- メール/パスワード認証（Credentials プロバイダ）
- Google OAuth

## アーキテクチャ

```
Frontend (Next.js + Auth.js)
  │
  │ authorize() / signIn callback
  ▼
Backend API (Go + Gin)
  │
  ▼
PostgreSQL (users, credentials, oauth_accounts)
```

### フロントエンド主導

- Auth.js が JWT を発行・セッション管理
- バックエンドはユーザー作成/検証 API を提供
- バックエンド API は Auth.js の JWT を検証して認可

## ディレクトリ構成

```
src/
├── libs/
│   ├── api/
│   │   └── auth.ts        # 認証 API クライアント
│   └── auth/
│       ├── auth.ts        # Auth.js 設定
│       └── types.ts       # 型定義
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # ルートハンドラー
│   └── (auth)/
│       ├── login/page.tsx    # ログインページ
│       ├── signup/page.tsx   # サインアップページ
│       └── layout.tsx        # 認証ページレイアウト
├── components/auth/
│   ├── LoginForm.tsx      # ログインフォーム
│   ├── SignupForm.tsx     # サインアップフォーム
│   ├── OAuthButtons.tsx   # OAuth ボタン
│   └── AuthButton.tsx     # ログイン/ログアウトボタン
└── features/auth/
    ├── schemas/auth.ts    # Zod バリデーションスキーマ
    └── hooks/
        └── useRegister.ts # 登録 mutation フック
```

## バックエンド API 仕様

### POST /api/v1/auth/register

ユーザー登録

```json
// Request
{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "表示名"
}

// Response 201
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "表示名",
    "displayName": "表示名",
    "avatarUrl": null
  }
}

// Error 409 (Conflict)
{
  "error": "email_exists",
  "message": "このメールアドレスは既に使用されています"
}
```

### POST /api/v1/auth/login

メール/パスワード認証

```json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response 200
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "表示名",
    "displayName": "表示名",
    "avatarUrl": "https://..."
  }
}

// Error 401
{
  "error": "invalid_credentials",
  "message": "メールアドレスまたはパスワードが正しくありません"
}
```

### POST /api/v1/auth/oauth/google

Google OAuth ユーザー作成/更新

```json
// Request
{
  "providerUserId": "google-provider-id",
  "email": "user@gmail.com",
  "displayName": "表示名",
  "accessToken": "...",
  "refreshToken": "...",
  "expiresAt": 1234567890
}

// Response 200/201
{
  "data": {
    "id": "uuid",
    "email": "user@gmail.com",
    "username": "表示名",
    "displayName": "表示名",
    "avatarUrl": "https://...",
    "isNewUser": false
  }
}
```

## 環境変数

```bash
# Auth.js
AUTH_SECRET=           # openssl rand -base64 32 で生成

# Google OAuth (Google Cloud Console から取得)
AUTH_GOOGLE_CLIENT_ID=
AUTH_GOOGLE_CLIENT_SECRET=

# Backend API
BACKEND_URL=http://localhost:8081              # サーバーサイド用
NEXT_PUBLIC_BACKEND_URL=http://localhost:8081  # クライアントサイド用

# App URL
NEXTAUTH_URL=http://localhost:3210
```

## セッション管理

- **戦略**: JWT
- **保存場所**: Cookie
- **有効期限**: Auth.js デフォルト（30日）

## 保護されたルート

現時点では明示的なルート保護は実装していない。必要に応じて `src/middleware.ts` で設定する。

```typescript
// 例: middleware.ts
import { auth } from '@/libs/auth/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/studio')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
});

export const config = {
  matcher: ['/studio/:path*'],
};
```

## Google OAuth 設定

Google Cloud Console での設定手順:

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. プロジェクトを作成または選択
3. 「API とサービス」→「認証情報」
4. 「認証情報を作成」→「OAuth クライアント ID」
5. アプリケーションの種類: ウェブアプリケーション
6. 承認済みのリダイレクト URI を追加:
   - 開発: `http://localhost:3210/api/auth/callback/google`
   - 本番: `https://your-domain.com/api/auth/callback/google`
7. クライアント ID とシークレットを `.env` に設定
