'use client';

import { Suspense } from 'react';
import { DeleteAccountSection } from '@/features/settings/account/components/DeleteAccountSection';
import { PasswordSection } from '@/features/settings/account/components/PasswordSection';
import { UsernameSection } from '@/features/settings/account/components/UsernameSection';
import { UsernameSectionSkeleton } from '@/features/settings/account/components/UsernameSectionSkeleton';

export function AccountContent() {
  return (
    <div className="mx-auto max-w-xl space-y-8 py-8">
      <Suspense fallback={<UsernameSectionSkeleton />}>
        <UsernameSection />
      </Suspense>

      <hr className="border-border" />

      <PasswordSection />

      <hr className="border-border" />

      <DeleteAccountSection />
    </div>
  );
}
