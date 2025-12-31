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
    <div>
      <h1>{Pages.signup.title}</h1>

      <SignupForm redirectTo={redirect} />

      <hr />

      <OAuthButtons redirectTo={redirect} />

      <p>
        すでにアカウントをお持ちの方は{' '}
        <Link href={Pages.login.path()} className="underline">
          {Pages.login.title}
        </Link>
      </p>
    </div>
  );
}
