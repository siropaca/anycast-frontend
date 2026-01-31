'use client';

import { GoogleLogo } from '@phosphor-icons/react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Pages } from '@/libs/pages';

interface Props {
  redirectTo?: string;
}

export function OAuthButtons({ redirectTo = Pages.home.path() }: Props) {
  return (
    <Button
      type="button"
      color="secondary"
      variant="outline"
      size="lg"
      className="w-full"
      leftIcon={<GoogleLogo weight="bold" />}
      onClick={() => signIn('google', { callbackUrl: redirectTo })}
    >
      Google でログイン
    </Button>
  );
}
