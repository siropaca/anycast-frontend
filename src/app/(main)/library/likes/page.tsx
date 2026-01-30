import type { Metadata } from 'next';
import Link from 'next/link';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.likes.title,
  robots: { index: false },
};

const items = [
  { id: 1, title: 'テクノロジーの未来', subtext: 'TechCast', channelSlug: 'techcast', episodeId: '1' },
  { id: 2, title: '朝の瞑想ガイド', subtext: 'マインドフルネス FM', channelSlug: 'mindfulness-fm', episodeId: '2' },
  { id: 3, title: '世界のニュースまとめ', subtext: 'グローバルニュース', channelSlug: 'global-news', episodeId: '3' },
  { id: 4, title: 'スタートアップの裏側', subtext: 'ビジネスラボ', channelSlug: 'business-lab', episodeId: '4' },
  { id: 5, title: '英語リスニング入門', subtext: 'Language Lab', channelSlug: 'language-lab', episodeId: '5' },
  { id: 6, title: '宇宙の不思議', subtext: 'サイエンストーク', channelSlug: 'science-talk', episodeId: '6' },
  { id: 7, title: '映画レビュー最新回', subtext: 'シネマパラダイス', channelSlug: 'cinema-paradise', episodeId: '7' },
  { id: 8, title: '料理のコツ 10 選', subtext: 'クッキングラジオ', channelSlug: 'cooking-radio', episodeId: '8' },
  { id: 9, title: '深夜ラジオ #42', subtext: 'ミッドナイトFM', channelSlug: 'midnight-fm', episodeId: '9' },
  { id: 10, title: '歴史を紐解く', subtext: 'ヒストリーチャンネル', channelSlug: 'history-channel', episodeId: '10' },
  { id: 11, title: 'ランニング BGM', subtext: 'フィットネスラジオ', channelSlug: 'fitness-radio', episodeId: '11' },
  { id: 12, title: 'プログラミング雑談', subtext: 'DevTalk', channelSlug: 'devtalk', episodeId: '12' },
  { id: 13, title: '読書の時間', subtext: 'ブックカフェ', channelSlug: 'book-cafe', episodeId: '13' },
  { id: 14, title: '旅行プランニング', subtext: 'トラベルガイド', channelSlug: 'travel-guide', episodeId: '14' },
  { id: 15, title: 'ゲーム実況振り返り', subtext: 'GameStream', channelSlug: 'gamestream', episodeId: '15' },
];

// TODO: モック実装
export default function LibraryLikesPage() {
  return (
    <div>
      <SectionTitle title={Pages.library.likes.title} />

      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((item) => (
          <Link key={item.id} href={Pages.episode.path(item.channelSlug, item.episodeId)}>
            <Artwork
              src={`https://picsum.photos/seed/like-${item.id}/400/400`}
              title={item.title}
              subtext={item.subtext}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
