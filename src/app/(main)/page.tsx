import type { Metadata } from 'next';

import {
  ARTWORK_FIXED_SIZE,
  Artwork,
} from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.home.title,
};

const recommendedEpisodes = [
  { id: 1, title: 'テクノロジーの未来', subtext: 'TechCast' },
  { id: 2, title: '朝の瞑想ガイド', subtext: 'マインドフルネス FM' },
  { id: 3, title: '世界のニュースまとめ', subtext: 'グローバルニュース' },
  { id: 4, title: 'スタートアップの裏側', subtext: 'ビジネスラボ' },
  { id: 5, title: '英語リスニング入門', subtext: 'Language Lab' },
  { id: 6, title: '宇宙の不思議', subtext: 'サイエンストーク' },
  { id: 7, title: '映画レビュー最新回', subtext: 'シネマパラダイス' },
  { id: 8, title: '料理のコツ 10 選', subtext: 'クッキングラジオ' },
];

const recommendedChannels = [
  { id: 1, title: 'TechCast', subtext: 'テクノロジー' },
  { id: 2, title: 'マインドフルネス FM', subtext: 'ヘルスケア' },
  { id: 3, title: 'グローバルニュース', subtext: 'ニュース' },
  { id: 4, title: 'ビジネスラボ', subtext: 'ビジネス' },
  { id: 5, title: 'Language Lab', subtext: '教育' },
  { id: 6, title: 'サイエンストーク', subtext: 'サイエンス' },
];

const recentlyPlayed = [
  { id: 1, title: '深夜ラジオ #42', subtext: 'ミッドナイトFM' },
  { id: 2, title: '歴史を紐解く', subtext: 'ヒストリーチャンネル' },
  { id: 3, title: 'ランニング BGM', subtext: 'フィットネスラジオ' },
  { id: 4, title: 'プログラミング雑談', subtext: 'DevTalk' },
  { id: 5, title: '読書の時間', subtext: 'ブックカフェ' },
  { id: 6, title: '旅行プランニング', subtext: 'トラベルガイド' },
  { id: 7, title: 'ゲーム実況振り返り', subtext: 'GameStream' },
];

// TODO: モック実装
export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <ContentSection title="おすすめのエピソード" moreHref="/episodes">
        {recommendedEpisodes.map((item) => (
          <Artwork
            key={item.id}
            src={`https://picsum.photos/seed/episode-${item.id}/400/400`}
            title={item.title}
            subtext={item.subtext}
            size={ARTWORK_FIXED_SIZE}
          />
        ))}
      </ContentSection>

      <ContentSection title="おすすめのチャンネル" moreHref="/channels">
        {recommendedChannels.map((item) => (
          <Artwork
            key={item.id}
            src={`https://picsum.photos/seed/channel-${item.id}/400/400`}
            title={item.title}
            subtext={item.subtext}
            size={ARTWORK_FIXED_SIZE}
          />
        ))}
      </ContentSection>

      <ContentSection
        title="最近聴いたコンテンツ"
        moreHref={Pages.library.history.path()}
      >
        {recentlyPlayed.map((item) => (
          <Artwork
            key={item.id}
            src={`https://picsum.photos/seed/recent-${item.id}/400/400`}
            title={item.title}
            subtext={item.subtext}
            size={ARTWORK_FIXED_SIZE}
          />
        ))}
      </ContentSection>
    </div>
  );
}
