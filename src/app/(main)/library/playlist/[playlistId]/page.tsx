import type { Metadata } from 'next';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.playListDetail.title,
  robots: { index: false },
};

// TODO: モック実装
const mockPlaylistEpisodes = [
  { id: 1, title: 'テクノロジーの未来', channel: 'TechCast' },
  { id: 2, title: '朝の瞑想ガイド', channel: 'マインドフルネス FM' },
  { id: 3, title: '世界のニュースまとめ', channel: 'グローバルニュース' },
  { id: 4, title: 'スタートアップの裏側', channel: 'ビジネスラボ' },
  { id: 5, title: '英語リスニング入門', channel: 'Language Lab' },
  { id: 6, title: '宇宙の不思議', channel: 'サイエンストーク' },
  { id: 7, title: '映画レビュー最新回', channel: 'シネマパラダイス' },
  { id: 8, title: '料理のコツ 10 選', channel: 'クッキングラジオ' },
];

interface Props {
  params: Promise<{ playlistId: string }>;
}

export default async function PlaylistDetailPage({ params }: Props) {
  const { playlistId } = await params;

  return (
    <div>
      <SectionTitle title={`再生リスト #${playlistId}`} />

      <ArtworkGrid>
        {mockPlaylistEpisodes.map((episode) => (
          <Artwork
            key={episode.id}
            src={`https://picsum.photos/seed/pl-${playlistId}-${episode.id}/400/400`}
            title={episode.title}
            subtext={episode.channel}
          />
        ))}
      </ArtworkGrid>
    </div>
  );
}
