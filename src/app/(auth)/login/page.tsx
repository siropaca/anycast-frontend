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
    <div>
      <h1>{Pages.login.title}</h1>

      <LoginForm redirectTo={redirect} />

      <hr />

      <OAuthButtons redirectTo={redirect} />

      <p>
        アカウントをお持ちでない方は{' '}
        <Link href={Pages.signup.path()} className="underline">
          {Pages.signup.title}
        </Link>
      </p>
    </div>
  );
}
