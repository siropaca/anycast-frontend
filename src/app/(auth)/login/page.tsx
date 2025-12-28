import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { OAuthButtons } from '@/features/auth/ui/OAuthButtons';
import { Paths } from '@/libs/paths';

export const metadata: Metadata = {
  title: 'ログイン',
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { redirect } = await searchParams;

  return (
    <div>
      <h1>ログイン</h1>

      <LoginForm redirectTo={redirect} />

      <hr />

      <OAuthButtons redirectTo={redirect} />

      <p>
        アカウントをお持ちでない方は{' '}
        <Link href={Paths.signup()} className="underline">
          新規登録
        </Link>
      </p>
    </div>
  );
}
