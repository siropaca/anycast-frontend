import type { Metadata } from 'next';
import Link from 'next/link';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.following.title,
  robots: { index: false },
};

const followingUsers = [
  { id: 1, title: 'さくら', subtext: '@sakura' },
  { id: 2, title: '知世', subtext: '@tomoyo' },
  { id: 3, title: '小狼', subtext: '@syaoran' },
  { id: 4, title: 'エリオル', subtext: '@eriol' },
  { id: 5, title: '雪兎', subtext: '@yukito' },
  { id: 6, title: '桃矢', subtext: '@touya' },
  { id: 7, title: '苺鈴', subtext: '@meiling' },
  { id: 8, title: '奈久留', subtext: '@nakuru' },
  { id: 9, title: '観月', subtext: '@mizuki' },
  { id: 10, title: 'スピネル', subtext: '@spinel' },
  { id: 11, title: '山崎', subtext: '@yamazaki' },
  { id: 12, title: '千春', subtext: '@chiharu' },
  { id: 13, title: '利佳', subtext: '@rika' },
  { id: 14, title: '柳沢', subtext: '@yanagisawa' },
  { id: 15, title: '寺田', subtext: '@terada' },
];

// TODO: モック実装
export default function LibraryFollowingPage() {
  return (
    <div>
      <SectionTitle title={Pages.library.following.title} />

      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {followingUsers.map((user) => (
          <Link key={user.id} href={Pages.user.path(user.subtext)}>
            <Artwork
              src={`https://picsum.photos/seed/user-${user.id}/400/400`}
              title={user.title}
              subtext={user.subtext}
              rounded
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
