'use client';

import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useChannelDetail } from '@/features/studio/channels/hooks/useChannelDetail';
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
    deleteMutation,
    publishMutation,
    unpublishMutation,
  } = useChannelDetail(channelId);
  const [error, setError] = useState<string | undefined>(undefined);

  function handleEditClick() {
    router.push(Pages.studio.editChannel.path({ id: channelId }));
  }

  function handleDeleteClick() {
    setError(undefined);

    deleteMutation.mutate(
      {
        channelId,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.NO_CONTENT) {
            setError(
              response.data.error?.message ?? 'チャンネルの削除に失敗しました',
            );
            return;
          }

          router.push(Pages.studio.channels.path());
        },
      },
    );
  }

  function handlePublishClick() {
    setError(undefined);

    publishMutation.mutate(
      {
        channelId,
        data: {},
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ?? 'チャンネルの公開に失敗しました',
            );
          }
        },
      },
    );
  }

  function handleUnpublishClick() {
    setError(undefined);

    unpublishMutation.mutate(
      {
        channelId,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ??
                'チャンネルの非公開に失敗しました',
            );
          }
        },
      },
    );
  }

  return (
    <div>
      <h1>{Pages.studio.channel.title}</h1>
      <p>チャンネル名: {channel.name}</p>
      {channel.description && <p>説明: {channel.description}</p>}
      <p>公開日時: {channel.publishedAt ?? '非公開'}</p>

      {channel.artwork && (
        <img src={channel.artwork.url} alt="" className="size-[200px]" />
      )}

      {error && <p>{error}</p>}

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
        onClick={handleDeleteClick}
      >
        {deleteMutation.isPending ? '削除中...' : 'チャンネルを削除'}
      </button>

      {isPublished ? (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={handleUnpublishClick}
        >
          {unpublishMutation.isPending
            ? '非公開にしています...'
            : '非公開にする'}
        </button>
      ) : (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={handlePublishClick}
        >
          {publishMutation.isPending ? '公開しています...' : 'チャンネルを公開'}
        </button>
      )}

      <hr className="my-4" />

      <ul>
        {channel.characters.map((character) => (
          <li key={character.id}>{character.name} ({character.voice.name})</li>
        ))}
      </ul>

      <hr className="my-4" />

      <h2>エピソード一覧</h2>
      <Suspense fallback={<p>読み込み中...</p>}>
        <EpisodeList channelId={channelId} />
      </Suspense>
    </div>
  );
}
