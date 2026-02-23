'use client';

import { PlusIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { DataTable } from '@/components/dataDisplay/DataTable/DataTable';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { StatusTag } from '@/features/studio/channels/components/StatusTag';
import { useEpisodeList } from '@/features/studio/episodes/hooks/useEpisodeList';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

const columns = [
  {
    key: 'episode',
    header: 'エピソード',
    accessor: (episode: ResponseEpisodeResponse) => (
      <div className="flex items-center gap-4">
        <ArtworkImage
          src={episode.artwork?.url}
          alt={episode.title}
          size={50}
        />
        <span className="text-sm">{episode.title}</span>
      </div>
    ),
  },
  {
    key: 'status',
    header: 'ステータス',
    accessor: (episode: ResponseEpisodeResponse) => (
      <StatusTag isPublished={episode.publishedAt != null} />
    ),
  },
  {
    key: 'scriptLineCount',
    header: '台本行数',
    accessor: (episode: ResponseEpisodeResponse) => (
      <span className="text-sm text-text-subtle">
        {episode.scriptLineCount ?? 0}
      </span>
    ),
  },
  {
    key: 'playCount',
    header: '再生数',
    accessor: (episode: ResponseEpisodeResponse) => (
      <span className="text-sm text-text-subtle">{episode.playCount}</span>
    ),
  },
];

export function EpisodeList({ channelId }: Props) {
  const router = useRouter();
  const { episodes } = useEpisodeList(channelId);

  function handleRowClick(episode: ResponseEpisodeResponse) {
    router.push(
      Pages.studio.episode.path({ id: channelId, episodeId: episode.id }),
    );
  }

  return (
    <div className="space-y-4">
      <SectionTitle
        title={
          episodes.length > 0
            ? `エピソード（${episodes.length}話）`
            : 'エピソード'
        }
        level="h3"
        action={
          <Button
            size="sm"
            href={Pages.studio.newEpisode.path({ id: channelId })}
            leftIcon={<PlusIcon size={16} />}
          >
            新規追加
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={episodes}
        emptyMessage="エピソードがありません"
        keyExtractor={(episode) => episode.id}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
