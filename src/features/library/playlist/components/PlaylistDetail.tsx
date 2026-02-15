'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { PlaylistDeleteDialog } from '@/features/library/playlist/components/PlaylistDeleteDialog';
import { PlaylistDetailMenu } from '@/features/library/playlist/components/PlaylistDetailMenu';
import { PlaylistEditModal } from '@/features/library/playlist/components/PlaylistEditModal';
import { usePlaylistDeleteDialog } from '@/features/library/playlist/hooks/usePlaylistDeleteDialog';
import { usePlaylistDetail } from '@/features/library/playlist/hooks/usePlaylistDetail';
import { usePlaylistEditModal } from '@/features/library/playlist/hooks/usePlaylistEditModal';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { usePlayEpisode } from '@/features/player/hooks/usePlayEpisode';
import type { ResponsePlaylistItemResponse } from '@/libs/api/generated/schemas/responsePlaylistItemResponse';
import { Pages } from '@/libs/pages';

interface Props {
  playlistId: string;
}

export function PlaylistDetail({ playlistId }: Props) {
  const router = useRouter();
  const { playlist } = usePlaylistDetail(playlistId);

  const deleteDialog = usePlaylistDeleteDialog(playlistId);
  const editModal = usePlaylistEditModal({
    playlistId,
    currentName: playlist.name,
  });

  async function handleDeleteConfirm() {
    const success = await deleteDialog.confirm();
    if (success) {
      router.push(Pages.library.playList.path());
    }
  }

  return (
    <div>
      <SectionTitle
        title={playlist.name}
        backHref={Pages.library.playList.path()}
        action={
          <PlaylistDetailMenu
            disabled={playlist.isDefault}
            disabledReason="デフォルトの再生リストは編集・削除できません"
            onEdit={editModal.open}
            onDelete={deleteDialog.open}
          />
        }
      />

      {playlist.items.length === 0 ? (
        <p className="py-12 text-center text-text-subtle">
          再生リストにエピソードはありません
        </p>
      ) : (
        <ArtworkGrid>
          {playlist.items.map((item, index) => (
            <PlaylistEpisodeItem
              key={item.id}
              item={item}
              priority={index < 6}
            />
          ))}
        </ArtworkGrid>
      )}

      <PlaylistDeleteDialog
        playlistName={playlist.name}
        open={deleteDialog.isOpen}
        error={deleteDialog.error}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      />

      <PlaylistEditModal editModal={editModal} />
    </div>
  );
}

interface PlaylistEpisodeItemProps {
  item: ResponsePlaylistItemResponse;
  priority: boolean;
}

function PlaylistEpisodeItem({ item, priority }: PlaylistEpisodeItemProps) {
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();
  const { isEpisodePlaying, playOrResume, pauseEpisode } = usePlayEpisode();
  const { episode } = item;

  function handlePlayClick() {
    if (isEpisodePlaying(episode.id)) {
      pauseEpisode();
    } else {
      playOrResume(episode);
    }
  }

  return (
    <Link
      href={Pages.episode.path({
        channelId: episode.channel.id,
        episodeId: episode.id,
      })}
    >
      <Artwork
        src={episode.artwork?.url}
        title={episode.title}
        subtext={episode.channel.name}
        priority={priority}
        isPlaying={episode.id === nowPlayingEpisodeId}
        onPlayClick={episode.fullAudio ? handlePlayClick : undefined}
      />
    </Link>
  );
}
