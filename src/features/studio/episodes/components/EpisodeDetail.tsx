'use client';

import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { ScriptLineList } from '@/features/studio/episodes/components/ScriptLineList';
import { useEpisodeDetail } from '@/features/studio/episodes/hooks/useEpisodeDetail';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
  episodeId: string;
}

export function EpisodeDetail({ channelId, episodeId }: Props) {
  const router = useRouter();
  const {
    episode,
    isPublished,
    isMutating,
    isDeleting,
    isPublishing,
    isUnpublishing,
    error,
    deleteEpisode,
    publishEpisode,
    unpublishEpisode,
  } = useEpisodeDetail(channelId, episodeId);

  function handleEditClick() {
    router.push(Pages.studio.editEpisode.path({ id: channelId, episodeId }));
  }

  function handleDeleteClick() {
    deleteEpisode({
      onSuccess: () => {
        router.push(Pages.studio.channel.path({ id: channelId }));
      },
    });
  }

  return (
    <div>
      <h1>{Pages.studio.episode.title}</h1>
      <p>タイトル: {episode.title}</p>
      {episode.description && <p>説明: {episode.description}</p>}
      <p>公開日時: {episode.publishedAt ?? '非公開'}</p>

      {episode.artwork && (
        <img src={episode.artwork.url} alt="" className="size-[200px]" />
      )}

      {error && <p>{error}</p>}

      <button
        type="button"
        className="border"
        disabled={isMutating}
        onClick={handleEditClick}
      >
        エピソードを編集
      </button>

      <button
        type="button"
        className="border"
        disabled={isMutating}
        onClick={handleDeleteClick}
      >
        {isDeleting ? '削除中...' : 'エピソードを削除'}
      </button>

      {isPublished ? (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={unpublishEpisode}
        >
          {isUnpublishing ? '非公開にしています...' : '非公開にする'}
        </button>
      ) : (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={publishEpisode}
        >
          {isPublishing ? '公開しています...' : 'エピソードを公開'}
        </button>
      )}

      <hr className="my-4" />

      <Suspense fallback={<p>読み込み中...</p>}>
        <ScriptLineList
          channelId={channelId}
          episodeId={episodeId}
          episodeName={episode.title}
          fullAudio={episode.fullAudio}
        />
      </Suspense>
    </div>
  );
}
