'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEpisodeList } from '@/features/studio/channels/hooks/useEpisodeList';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function EpisodeList({ channelId }: Props) {
  const router = useRouter();
  const { episodes } = useEpisodeList(channelId);

  function handleNewClick() {
    router.push(Pages.studio.newEpisode.path({ id: channelId }));
  }

  if (episodes.length === 0) {
    return <p>エピソードがありません</p>;
  }

  return (
    <ul>
      {episodes.map((episode) => (
        <li key={episode.id}>
          <Link
            href={Pages.studio.editEpisode.path({
              id: channelId,
              episodeId: episode.id,
            })}
            className="underline"
          >
            {episode.title}
          </Link>
        </li>
      ))}

      <li>
        <button type="button" className="border" onClick={handleNewClick}>
          エピソードを作成
        </button>
      </li>
    </ul>
  );
}
