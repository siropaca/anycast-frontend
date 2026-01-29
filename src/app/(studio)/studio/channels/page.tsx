import { PlusIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ChannelList } from '@/features/studio/channels/components/ChannelList';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.channels.title,
  robots: { index: false },
};

export default function StudioChannelsPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title={Pages.studio.channels.title}
        description="作成したチャンネルの管理ができます"
        action={
          <Button href={Pages.studio.newChannel.path()} leftIcon={<PlusIcon />}>
            新規追加
          </Button>
        }
      />

      {/* TODO: loading 作成 */}
      <Suspense fallback={<p>読み込み中...</p>}>
        <ChannelList />
      </Suspense>
    </div>
  );
}
