import type { Metadata } from 'next';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.episodes.title,
};

// TODO: モック実装
const mockEpisodes = [
  { id: 1, title: '第1話 はじまりの朝', channel: 'モーニングラジオ' },
  { id: 2, title: 'AIの未来を語る', channel: 'テックトーク' },
  { id: 3, title: '初心者向けギター講座', channel: '音楽チャンネル' },
  { id: 4, title: '今週のニュースまとめ', channel: 'デイリーニュース' },
  { id: 5, title: '眠れる森の物語', channel: '朗読チャンネル' },
  { id: 6, title: 'おすすめ映画レビュー', channel: 'シネマトーク' },
  { id: 7, title: '英語リスニング練習', channel: '語学チャンネル' },
  { id: 8, title: 'スタートアップの始め方', channel: 'ビジネスラジオ' },
  { id: 9, title: '季節のレシピ紹介', channel: 'クッキングラジオ' },
  { id: 10, title: '宇宙の不思議', channel: 'サイエンストーク' },
  { id: 11, title: '朝のストレッチ', channel: 'フィットネスラジオ' },
  { id: 12, title: '旅行プランの立て方', channel: 'トラベルガイド' },
  { id: 13, title: '心理学入門', channel: 'アカデミックラジオ' },
  { id: 14, title: 'ゲーム実況振り返り', channel: 'ゲームチャンネル' },
  { id: 15, title: '週末DIYプロジェクト', channel: 'ものづくりラジオ' },
];

export default function EpisodesPage() {
  return (
    <div>
      <SectionTitle title={Pages.episodes.title} />

      <ArtworkGrid>
        {mockEpisodes.map((episode) => (
          <Artwork
            key={episode.id}
            src={`https://picsum.photos/seed/episode-${episode.id}/400/400`}
            title={episode.title}
            subtext={episode.channel}
          />
        ))}
      </ArtworkGrid>
    </div>
  );
}
