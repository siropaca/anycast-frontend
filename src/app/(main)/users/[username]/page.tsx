import type { Metadata } from 'next';

import { Pages } from '@/libs/pages';

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return {
    title: Pages.user.title(username),
  };
}

export default async function UserPage({ params }: Props) {
  const { username } = await params;

  return (
    <div>
      <div>User Page</div>
      <div>@{username}</div>
    </div>
  );
}
