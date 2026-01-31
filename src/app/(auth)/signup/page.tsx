import type { Metadata } from 'next';
import Link from 'next/link';
import { OAuthButtons } from '@/features/auth/components/OAuthButtons';
import { SignupForm } from '@/features/auth/components/SignupForm';
import { Pages } from '@/libs/pages';
import type { SignupSearchParams } from '@/libs/pages/mainPages';

export const metadata: Metadata = {
  title: Pages.signup.title,
  robots: { index: false },
};

interface Props {
  searchParams: Promise<SignupSearchParams>;
}

export default async function SignupPage({ searchParams }: Props) {
  const { redirect } = await searchParams;

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8 rounded-md border border-border bg-bg-surface p-8">
      {/* ロゴ + サブテキスト */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-primary">Anycast</h1>
        <p className="text-sm text-text-subtle">アカウントを作成</p>
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

      {/* 新規登録フォーム */}
      <div className="w-full">
        <SignupForm redirectTo={redirect} />
      </div>

      {/* ログインリンク */}
      <p className="text-sm text-text-subtle">
        すでにアカウントをお持ちの方は{' '}
        <Link
          href={Pages.login.path()}
          className="text-primary hover:underline"
        >
          ログイン
        </Link>
      </p>
    </div>
  );
}
