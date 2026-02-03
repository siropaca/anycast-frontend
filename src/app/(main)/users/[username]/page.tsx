import type { Metadata } from 'next';
import { Suspense } from 'react';
import { UserDetail } from '@/features/users/components/UserDetail';
import { auth } from '@/libs/auth/auth';
import { Pages } from '@/libs/pages';
import type { UserParams } from '@/libs/pages/mainPages';

interface Props {
  params: Promise<UserParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    title: Pages.user.title(resolvedParams),
  };
}

export default async function UserPage({ params }: Props) {
  const { username } = await params;
  const { session } = await auth();
  const isOwnProfile = session?.user?.username === username;

  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <UserDetail username={username} isOwnProfile={isOwnProfile} />
    </Suspense>
  );
}
