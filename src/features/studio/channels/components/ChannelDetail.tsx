'use client';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ChannelCharacterList } from '@/features/studio/channels/components/ChannelCharacterList';
import { ChannelDefaultBgmSection } from '@/features/studio/channels/components/ChannelDefaultBgmSection';
import { ChannelDeleteDialog } from '@/features/studio/channels/components/ChannelDeleteDialog';
import { ChannelDetailMenu } from '@/features/studio/channels/components/ChannelDetailMenu';
import { ChannelInfoSection } from '@/features/studio/channels/components/ChannelInfoSection';
import { ChannelPromptSection } from '@/features/studio/channels/components/ChannelPromptSection';
import { ChannelPublishDialog } from '@/features/studio/channels/components/ChannelPublishDialog';
import { StatusTag } from '@/features/studio/channels/components/StatusTag';
import { useChannelDeleteDialog } from '@/features/studio/channels/hooks/useChannelDeleteDialog';
import { useChannelDetail } from '@/features/studio/channels/hooks/useChannelDetail';
import { useChannelPublishDialog } from '@/features/studio/channels/hooks/useChannelPublishDialog';
import { EpisodeList } from '@/features/studio/episodes/components/EpisodeList';
import { EpisodeListSkeleton } from '@/features/studio/episodes/components/EpisodeListSkeleton';
import { useToast } from '@/hooks/useToast';
import { usePostChannelsChannelIdEpisodesEpisodeIdPublish } from '@/libs/api/generated/episodes/episodes';
import { getGetMeChannelsChannelIdEpisodesQueryKey } from '@/libs/api/generated/me/me';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function ChannelDetail({ channelId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();
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

  const unpublishedEpisodes = channel.episodes.filter(
    (e) => !e.publishedAt && e.fullAudio,
  );
  const [includeEpisodes, setIncludeEpisodes] = useState(true);
  const publishEpisodeMutation =
    usePostChannelsChannelIdEpisodesEpisodeIdPublish();

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

  async function handlePublishConfirm() {
    const success = await publishDialog.confirm();
    if (!success) return;

    if (
      publishDialog.action === 'publish' &&
      includeEpisodes &&
      unpublishedEpisodes.length > 0
    ) {
      const results = await Promise.allSettled(
        unpublishedEpisodes.map((ep) =>
          publishEpisodeMutation.mutateAsync({
            channelId,
            episodeId: ep.id,
            data: {},
          }),
        ),
      );

      const successCount = results.filter(
        (r) => r.status === 'fulfilled' && r.value.status === StatusCodes.OK,
      ).length;

      if (successCount > 0) {
        toast.success({
          title: `${successCount}件のエピソードを公開しました`,
        });
        queryClient.invalidateQueries({
          queryKey: getGetMeChannelsChannelIdEpisodesQueryKey(channelId),
        });
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <SectionTitle
        title={channel.name}
        backHref={Pages.studio.channels.path()}
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
      <ChannelInfoSection
        name={channel.name}
        artwork={channel.artwork}
        category={channel.category}
        publishedAt={channel.publishedAt}
        description={channel.description}
      />

      {/* キャラクター */}
      <ChannelCharacterList
        channelId={channelId}
        characters={channel.characters}
      />

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
      <Suspense fallback={<EpisodeListSkeleton />}>
        <EpisodeList channelId={channelId} />
      </Suspense>

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
        unpublishedEpisodeCount={unpublishedEpisodes.length}
        includeEpisodes={includeEpisodes}
        onClose={publishDialog.close}
        onConfirm={handlePublishConfirm}
        onIncludeEpisodesChange={setIncludeEpisodes}
      />
    </div>
  );
}
