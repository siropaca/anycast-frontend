'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';
import { useChannelDeleteDialog } from '@/features/studio/channels/hooks/useChannelDeleteDialog';
import { useChannelDetail } from '@/features/studio/channels/hooks/useChannelDetail';
import { useChannelPublishDialog } from '@/features/studio/channels/hooks/useChannelPublishDialog';
import { EpisodeList } from '@/features/studio/episodes/components/EpisodeList';
import { Pages } from '@/libs/pages';

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

  function handleEditClick() {
    router.push(Pages.studio.editChannel.path({ id: channelId }));
  }

  async function handleDeleteConfirm() {
    const success = await deleteDialog.confirm();
    if (success) {
      router.push(Pages.studio.channels.path());
    }
  }

  return (
    <div>
      <h1>{Pages.studio.channel.title}</h1>
      <p>チャンネル名: {channel.name}</p>
      {channel.description && <p>説明: {channel.description}</p>}
      <p>公開日時: {channel.publishedAt ?? '非公開'}</p>

      {channel.artwork && (
        <Image
          src={channel.artwork.url}
          alt=""
          width={200}
          height={200}
          className="size-[200px]"
        />
      )}

      <hr className="my-4" />

      <button
        type="button"
        className="border"
        disabled={isMutating}
        onClick={handleEditClick}
      >
        チャンネルを編集
      </button>

      <button
        type="button"
        className="border"
        disabled={isMutating}
        onClick={deleteDialog.open}
      >
        {isDeleting ? '削除中...' : 'チャンネルを削除'}
      </button>

      {isPublished ? (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={() => publishDialog.open('unpublish')}
        >
          {isUnpublishing ? '非公開にしています...' : '非公開にする'}
        </button>
      ) : (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={() => publishDialog.open('publish')}
        >
          {isPublishing ? '公開しています...' : 'チャンネルを公開'}
        </button>
      )}

      <hr className="my-4" />

      <ul>
        {channel.characters.map((character) => (
          <li key={character.id}>
            {character.name} ({character.voice.name})
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <h2>エピソード一覧</h2>
      <Suspense fallback={<p>読み込み中...</p>}>
        <EpisodeList channelId={channelId} />
      </Suspense>

      <ConfirmDialog
        trigger={<span className="hidden" />}
        open={deleteDialog.isOpen}
        title="チャンネルを削除"
        description={
          <>
            「{channel.name}」を削除しますか？
            <br />
            この操作は取り消せません。
          </>
        }
        error={deleteDialog.error}
        confirmLabel="削除"
        confirmColor="danger"
        onOpenChange={(open) => !open && deleteDialog.close()}
        onConfirm={handleDeleteConfirm}
      />

      <ConfirmDialog
        trigger={<span className="hidden" />}
        open={publishDialog.isOpen}
        title={
          publishDialog.action === 'publish'
            ? 'チャンネルを公開'
            : 'チャンネルを非公開にする'
        }
        description={
          publishDialog.action === 'publish'
            ? `「${channel.name}」を公開しますか？`
            : `「${channel.name}」を非公開にしますか？`
        }
        error={publishDialog.error}
        confirmLabel={
          publishDialog.action === 'publish' ? '公開' : '非公開にする'
        }
        confirmColor={publishDialog.action === 'publish' ? 'primary' : 'danger'}
        onOpenChange={(open) => !open && publishDialog.close()}
        onConfirm={publishDialog.confirm}
      />
    </div>
  );
}
