'use client';

import Link from 'next/link';
import { PlayList } from '@/components/dataDisplay/artworks/PlayList/PlayList';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { usePlaylists } from '@/features/library/playlist/hooks/usePlaylists';
import { Pages } from '@/libs/pages';

export function PlaylistList() {
  const { items } = usePlaylists();

  // エンプティ
  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">
        再生リストはありません
      </p>
    );
  }

  // 通常表示
  return (
    <ArtworkGrid>
      {items.map((playlist, index) => (
        <Link
          key={playlist.id}
          href={Pages.library.playListDetail.path({
            playlistId: playlist.id,
          })}
        >
          <PlayList
            title={playlist.name}
            episodeCount={playlist.itemCount}
            priority={index < 6}
          />
        </Link>
      ))}
    </ArtworkGrid>
  );
}
