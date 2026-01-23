import type { Metadata } from 'next';
import { Suspense } from 'react';
import { VoiceList } from '@/features/studio/voices/components/VoiceList';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.voices.title,
  robots: { index: false },
};

export default function StudioVoicesPage() {
  return (
    <div>
      <Suspense fallback={<p>読み込み中...</p>}>
        <VoiceList />
      </Suspense>
    </div>
  );
}
