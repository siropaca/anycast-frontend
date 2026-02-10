'use client';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ChannelCharacterList } from '@/features/studio/channels/components/ChannelCharacterList';
import { ChannelDefaultBgmSection } from '@/features/studio/channels/components/ChannelDefaultBgmSection';
import { ChannelDeleteDialog } from '@/features/studio/channels/components/ChannelDeleteDialog';
import { ChannelDetailMenu } from '@/features/studio/channels/components/ChannelDetailMenu';
import { ChannelPromptSection } from '@/features/studio/channels/components/ChannelPromptSection';
import { ChannelPublishDialog } from '@/features/studio/channels/components/ChannelPublishDialog';
import { StatusTag } from '@/features/studio/channels/components/StatusTag';
import { useChannelDeleteDialog } from '@/features/studio/channels/hooks/useChannelDeleteDialog';
import { useChannelDetail } from '@/features/studio/channels/hooks/useChannelDetail';
import { useChannelPublishDialog } from '@/features/studio/channels/hooks/useChannelPublishDialog';
import { EpisodeList } from '@/features/studio/episodes/components/EpisodeList';
import { Pages } from '@/libs/pages';

const ARTWORK_SIZE = 170;

interface Props {
  channelId: string;
}

export function ChannelDetail({ channelId }: Props) {
  const router = useRouter();
  const {
    channel,
    isPublished,
    isMutating,
    isDeleting,
    isPublishing,
    isUnpublishing,
    error,
    deleteChannel,
    publishChannel,
    unpublishChannel,
    clearError,
  } = useChannelDetail(channelId);

  const deleteDialog = useChannelDeleteDialog({
    deleteChannel,
    clearError,
    isDeleting,
    error,
  });

  const publishDialog = useChannelPublishDialog({
    publishChannel,
    unpublishChannel,
    clearError,
    isMutating: isPublishing || isUnpublishing,
    error,
  });

  async function handleDeleteConfirm() {
    const success = await deleteDialog.confirm();
    if (success) {
      router.push(Pages.studio.channels.path());
    }
  }

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <SectionTitle
        title={channel.name}
        action={
          <div className="flex items-center gap-3">
            <StatusTag isPublished={isPublished} />
            <Button
              size="sm"
              variant="outline"
              color="secondary"
              leftIcon={<PencilSimpleIcon size={16} />}
              href={Pages.studio.editChannel.path({ id: channelId })}
            >
              編集
            </Button>
            <ChannelDetailMenu
              isPublished={isPublished}
              disabled={isMutating}
              onPublish={() => publishDialog.open('publish')}
              onUnpublish={() => publishDialog.open('unpublish')}
              onDelete={deleteDialog.open}
            />
          </div>
        }
      />

      {/* チャンネル情報 */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <ArtworkImage
          src={channel.artwork?.url}
          alt={channel.name}
          size={ARTWORK_SIZE}
          priority
        />

        <div className="flex flex-1 flex-col gap-3">
          <p className="text-sm text-text-subtle">{channel.category.name}</p>

          {channel.description && (
            <p className="whitespace-pre-wrap">{channel.description}</p>
          )}
        </div>
      </div>

      {/* キャラクター */}
      <ChannelCharacterList characters={channel.characters} />

      {/* デフォルトBGM */}
      <ChannelDefaultBgmSection
        channelId={channelId}
        defaultBgm={channel.defaultBgm}
      />

      {/* 台本プロンプト */}
      <ChannelPromptSection
        channelId={channelId}
        userPrompt={channel.userPrompt}
      />

      {/* エピソード一覧 */}
      <div className="space-y-4">
        <Suspense
          fallback={<p className="text-sm text-text-subtle">読み込み中...</p>}
        >
          <EpisodeList channelId={channelId} />
        </Suspense>
      </div>

      <ChannelDeleteDialog
        channelName={channel.name}
        open={deleteDialog.isOpen}
        error={deleteDialog.error}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      />

      <ChannelPublishDialog
        channelName={channel.name}
        action={publishDialog.action}
        open={publishDialog.isOpen}
        error={publishDialog.error}
        onClose={publishDialog.close}
        onConfirm={publishDialog.confirm}
      />
    </div>
  );
}
