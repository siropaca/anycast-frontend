import type { Metadata } from 'next';
import Link from 'next/link';
import { OAuthButtons } from '@/features/auth/ui/OAuthButtons';
import { SignupForm } from '@/features/auth/ui/SignupForm';
import { Paths } from '@/libs/paths';

export const metadata: Metadata = {
  title: '新規登録',
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function SignupPage({ searchParams }: Props) {
  const { redirect } = await searchParams;

  return (
    <div>
      <h1>新規登録</h1>

      <SignupForm redirectTo={redirect} />

      <hr />

      <OAuthButtons redirectTo={redirect} />

      <p>
        すでにアカウントをお持ちの方は{' '}
        <Link href={Paths.login()} className="underline">
          ログイン
        </Link>
      </p>
    </div>
  );
}
