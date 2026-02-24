'use client';

import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { DeleteAccountSection } from '@/features/settings/account/components/DeleteAccountSection';
import { PasswordSection } from '@/features/settings/account/components/PasswordSection';
import { ProfilePageLink } from '@/features/settings/account/components/ProfilePageLink';
import { UsernameSection } from '@/features/settings/account/components/UsernameSection';
import { UsernameSectionSkeleton } from '@/features/settings/account/components/UsernameSectionSkeleton';

export function AccountContent() {
  return (
    <div className="space-y-8">
      <SectionTitle title="アカウント" level="h2" />

      <ProfilePageLink />

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
