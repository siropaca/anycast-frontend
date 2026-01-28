import type { Metadata } from 'next';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.bookmarks.title,
  robots: { index: false },
};

const bookmarks = [
  { id: 1, title: 'テクノロジーの未来', subtext: 'TechCast' },
  { id: 2, title: '朝の瞑想ガイド', subtext: 'マインドフルネス FM' },
  { id: 3, title: '世界のニュースまとめ', subtext: 'グローバルニュース' },
  { id: 4, title: 'スタートアップの裏側', subtext: 'ビジネスラボ' },
  { id: 5, title: '英語リスニング入門', subtext: 'Language Lab' },
  { id: 6, title: '宇宙の不思議', subtext: 'サイエンストーク' },
  { id: 7, title: '映画レビュー最新回', subtext: 'シネマパラダイス' },
  { id: 8, title: '料理のコツ 10 選', subtext: 'クッキングラジオ' },
  { id: 9, title: '深夜ラジオ #42', subtext: 'ミッドナイトFM' },
  { id: 10, title: '歴史を紐解く', subtext: 'ヒストリーチャンネル' },
  { id: 11, title: 'ランニング BGM', subtext: 'フィットネスラジオ' },
  { id: 12, title: 'プログラミング雑談', subtext: 'DevTalk' },
  { id: 13, title: '読書の時間', subtext: 'ブックカフェ' },
  { id: 14, title: '旅行プランニング', subtext: 'トラベルガイド' },
  { id: 15, title: 'ゲーム実況振り返り', subtext: 'GameStream' },
];

// TODO: モック実装
export default function LibraryBookmarksPage() {
  return (
    <div>
      <SectionTitle title="後で聴く" />

      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {bookmarks.map((item) => (
          <Artwork
            key={item.id}
            src={`https://picsum.photos/seed/bookmark-${item.id}/400/400`}
            title={item.title}
            subtext={item.subtext}
          />
        ))}
      </div>
    </div>
  );
}
