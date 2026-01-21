'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
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
    isDeleting,
    isPublishing,
    isUnpublishing,
    error,
    deleteChannel,
    publishChannel,
    unpublishChannel,
  } = useChannelDetail(channelId);

  function handleEditClick() {
    router.push(Pages.studio.editChannel.path({ id: channelId }));
  }

  function handleDeleteClick() {
    deleteChannel({
      onSuccess: () => {
        router.push(Pages.studio.channels.path());
      },
    });
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
        {isDeleting ? '削除中...' : 'チャンネルを削除'}
      </button>

      {isPublished ? (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={unpublishChannel}
        >
          {isUnpublishing ? '非公開にしています...' : '非公開にする'}
        </button>
      ) : (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={publishChannel}
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
    </div>
  );
}
