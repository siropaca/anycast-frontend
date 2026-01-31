import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { OAuthButtons } from '@/features/auth/components/OAuthButtons';
import { Pages } from '@/libs/pages';
import type { LoginSearchParams } from '@/libs/pages/mainPages';

export const metadata: Metadata = {
  title: Pages.login.title,
  robots: { index: false },
};

interface Props {
  searchParams: Promise<LoginSearchParams>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { redirect } = await searchParams;

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8 rounded-md border border-border bg-bg-surface p-8">
      {/* ロゴ + サブテキスト */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-primary">Anycast</h1>
        <p className="text-sm text-text-subtle">おかえりなさい</p>
      </div>

      {/* OAuth ボタン */}
      <div className="w-full">
        <OAuthButtons redirectTo={redirect} />
      </div>

      {/* 区切り線 */}
      <div className="flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-text-placeholder">または</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* ログインフォーム */}
      <div className="w-full">
        <LoginForm redirectTo={redirect} />
      </div>

      {/* 新規登録リンク */}
      <p className="text-sm text-text-subtle">
        アカウントをお持ちでない方は{' '}
        <Link
          href={Pages.signup.path()}
          className="text-primary hover:underline"
        >
          新規登録
        </Link>
      </p>
    </div>
  );
}
