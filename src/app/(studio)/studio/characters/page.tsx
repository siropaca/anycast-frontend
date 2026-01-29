import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { CharacterList } from '@/features/studio/characters/components/CharacterList';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.characters.title,
  robots: { index: false },
};

export default function StudioCharactersPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title={Pages.studio.characters.title}
        description="エピソードで使用しているキャラクターの管理ができます"
      />

      <Suspense fallback={<p>読み込み中...</p>}>
        <CharacterList />
      </Suspense>
    </div>
  );
}
