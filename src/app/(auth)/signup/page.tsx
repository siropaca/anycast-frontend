import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthDivider } from '@/features/auth/components/AuthDivider';
import { AuthHeading } from '@/features/auth/components/AuthHeading';
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
      <AuthHeading subtitle="アカウントを作成" />

      {/* OAuth ボタン */}
      <div className="w-full">
        <OAuthButtons redirectTo={redirect} />
      </div>

      <AuthDivider />

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
