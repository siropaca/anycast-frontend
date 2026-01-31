import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { AuthDivider } from '@/features/auth/components/AuthDivider';
import { AuthHeading } from '@/features/auth/components/AuthHeading';
import { OAuthButton } from '@/features/auth/components/OAuthButton';
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
    <AuthCard>
      <AuthHeading subtitle="アカウントを作成" />

      {/* OAuth ボタン */}
      <div className="w-full">
        <OAuthButton redirectTo={redirect} />
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
    </AuthCard>
  );
}
