'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { usePlaylistDetail } from '@/features/library/playlist/hooks/usePlaylistDetail';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { Pages } from '@/libs/pages';

interface Props {
  playlistId: string;
}

export function PlaylistDetail({ playlistId }: Props) {
  const { playlist } = usePlaylistDetail(playlistId);
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();

  return (
    <div>
      <SectionTitle title={playlist.name} />

      {playlist.items.length === 0 ? (
        <p className="py-12 text-center text-text-subtle">
          再生リストにエピソードはありません
        </p>
      ) : (
        <ArtworkGrid>
          {playlist.items.map((item, index) => (
            <Link
              key={item.id}
              href={Pages.episode.path({
                channelId: item.episode.channel.id,
                episodeId: item.episode.id,
              })}
            >
              <Artwork
                src={item.episode.artwork?.url}
                title={item.episode.title}
                subtext={item.episode.channel.name}
                priority={index < 6}
                isPlaying={item.episode.id === nowPlayingEpisodeId}
              />
            </Link>
          ))}
        </ArtworkGrid>
      )}
    </div>
  );
}
