import type { Metadata } from 'next';
import Link from 'next/link';

import { PlayList } from '@/components/dataDisplay/artworks/PlayList/PlayList';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.playList.title,
  robots: { index: false },
};

// TODO: モック実装
const playlists = [
  { id: 1, title: 'テクノロジーの未来', episodeCount: 12 },
  { id: 2, title: '朝の瞑想ガイド', episodeCount: 8 },
  { id: 3, title: '世界のニュースまとめ', episodeCount: 24 },
  { id: 4, title: 'スタートアップの裏側', episodeCount: 5 },
  { id: 5, title: '英語リスニング入門', episodeCount: 30 },
  { id: 6, title: '宇宙の不思議', episodeCount: 3 },
];

export default function LibraryPlaylistPage() {
  return (
    <div>
      <SectionTitle title={Pages.library.playList.title} />

      <ArtworkGrid>
        {playlists.map((playlist) => (
          <Link
            key={playlist.id}
            href={Pages.library.playListDetail.path(String(playlist.id))}
          >
            <PlayList
              src={`https://picsum.photos/seed/playlist-${playlist.id}/400/400`}
              title={playlist.title}
              episodeCount={playlist.episodeCount}
            />
          </Link>
        ))}
      </ArtworkGrid>
    </div>
  );
}
