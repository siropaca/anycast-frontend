'use client';

import Link from 'next/link';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { AddToPlaylistModal } from '@/features/episodes/components/AddToPlaylistModal';
import { ChannelEpisodeListItem } from '@/features/episodes/components/ChannelEpisodeListItem';
import { useEpisodePlayer } from '@/features/episodes/hooks/useEpisodePlayer';
import { usePlaylistTarget } from '@/features/episodes/hooks/usePlaylistTarget';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';
import { Pages } from '@/libs/pages';

interface Props {
  episodes: ResponseEpisodeResponse[];
  currentEpisodeId: string;
  channelId: string;
  channelName: string;
}

export function ChannelEpisodeList({
  episodes,
  currentEpisodeId,
  channelId,
  channelName,
}: Props) {
  const otherEpisodes = episodes.filter((ep) => ep.id !== currentEpisodeId);

  const nowPlayingEpisodeId = useNowPlayingEpisodeId();
  const { playEpisode, pauseEpisode } = useEpisodePlayer(channelName);
  const playlistTarget = usePlaylistTarget(otherEpisodes);

  if (otherEpisodes.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionTitle
        title="こちらのエピソードもおすすめ"
        action={
          <Link
            href={Pages.channel.path({ channelId })}
            className="text-sm text-text-subtle hover:underline"
          >
            もっと見る
          </Link>
        }
      />

      <div>
        {/* エピソードリスト */}
        {otherEpisodes.map((ep) => (
          <ChannelEpisodeListItem
            key={ep.id}
            episode={ep}
            channelId={channelId}
            channelName={channelName}
            isPlaying={ep.id === nowPlayingEpisodeId}
            onPlay={() => playEpisode(ep)}
            onPause={pauseEpisode}
            onAddToPlaylist={() => playlistTarget.open(ep.id)}
          />
        ))}
      </div>

      {/* 再生リストモーダル */}
      <AddToPlaylistModal
        open={playlistTarget.isOpen}
        episodeId={playlistTarget.episodeId}
        currentPlaylistIds={playlistTarget.currentPlaylistIds}
        onOpenChange={(open) => {
          if (!open) playlistTarget.close();
        }}
      />
    </section>
  );
}
