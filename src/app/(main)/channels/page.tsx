import type { Metadata } from 'next';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.channels.title,
};

// TODO: モック実装
const mockChannels = [
  { id: 1, title: 'モーニングラジオ', category: 'トーク' },
  { id: 2, title: 'テックトーク', category: 'テクノロジー' },
  { id: 3, title: '音楽チャンネル', category: '音楽' },
  { id: 4, title: 'デイリーニュース', category: 'ニュース' },
  { id: 5, title: '朗読チャンネル', category: 'エンタメ' },
  { id: 6, title: 'シネマトーク', category: '映画' },
  { id: 7, title: '語学チャンネル', category: '教育' },
  { id: 8, title: 'ビジネスラジオ', category: 'ビジネス' },
  { id: 9, title: 'クッキングラジオ', category: 'ライフスタイル' },
  { id: 10, title: 'サイエンストーク', category: '科学' },
  { id: 11, title: 'フィットネスラジオ', category: '健康' },
  { id: 12, title: 'トラベルガイド', category: '旅行' },
  { id: 13, title: 'アカデミックラジオ', category: '教育' },
  { id: 14, title: 'ゲームチャンネル', category: 'ゲーム' },
  { id: 15, title: 'ものづくりラジオ', category: 'ライフスタイル' },
];

export default function ChannelsPage() {
  return (
    <div>
      <SectionTitle title={Pages.channels.title} />

      <ArtworkGrid>
        {mockChannels.map((channel) => (
          <Artwork
            key={channel.id}
            src={`https://picsum.photos/seed/channel-${channel.id}/400/400`}
            title={channel.title}
            subtext={channel.category}
          />
        ))}
      </ArtworkGrid>
    </div>
  );
}
