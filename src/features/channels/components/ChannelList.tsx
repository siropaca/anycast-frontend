'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { useChannels } from '@/features/channels/hooks/useChannels';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { Pages } from '@/libs/pages';

export function ChannelList() {
  const { channels } = useChannels();

  // エンプティ
  if (channels.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">
        おすすめのチャンネルはありません
      </p>
    );
  }

  // 通常表示
  return (
    <ArtworkGrid>
      {channels.map((channel, index) => (
        <Link
          key={channel.id}
          href={Pages.channel.path({ channelSlug: channel.id })}
        >
          <Artwork
            src={channel.artwork?.url}
            title={channel.name}
            subtext={channel.category.name}
            priority={index < 6}
          />
        </Link>
      ))}
    </ArtworkGrid>
  );
}
