import { PlusIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
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
        action={<Button leftIcon={<PlusIcon size={18} />}>新規追加</Button>}
      />

      <Suspense fallback={<p>読み込み中...</p>}>
        <CharacterList />
      </Suspense>
    </div>
  );
}
