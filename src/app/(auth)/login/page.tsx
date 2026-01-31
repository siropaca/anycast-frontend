import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthDivider } from '@/features/auth/components/AuthDivider';
import { AuthHeading } from '@/features/auth/components/AuthHeading';
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
      <AuthHeading subtitle="おかえりなさい" />

      {/* OAuth ボタン */}
      <div className="w-full">
        <OAuthButtons redirectTo={redirect} />
      </div>

      <AuthDivider />

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
