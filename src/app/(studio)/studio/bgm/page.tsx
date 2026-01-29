import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { BgmList } from '@/features/studio/bgm/components/BgmList';
import { BgmUploadModal } from '@/features/studio/bgm/components/BgmUploadModal';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.bgm.title,
  robots: { index: false },
};

export default function StudioBgmPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title={Pages.studio.bgm.title}
        description="エピソードで使用するBGMの管理ができます"
        action={<BgmUploadModal />}
      />

      <Suspense fallback={<p>読み込み中...</p>}>
        <BgmList />
      </Suspense>
    </div>
  );
}
