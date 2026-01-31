'use client';

import { signIn } from 'next-auth/react';
import { GoogleIcon } from '@/components/dataDisplay/icons/GoogleIcon';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Pages } from '@/libs/pages';

interface Props {
  redirectTo?: string;
}

export function OAuthButton({ redirectTo = Pages.home.path() }: Props) {
  return (
    <Button
      type="button"
      color="inverse"
      variant="outline"
      size="lg"
      className="w-full rounded-sm"
      leftIcon={<GoogleIcon size={20} />}
      onClick={() => signIn('google', { callbackUrl: redirectTo })}
    >
      Googleでログイン
    </Button>
  );
}
