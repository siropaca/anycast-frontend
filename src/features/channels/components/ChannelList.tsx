'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { useChannels } from '@/features/channels/hooks/useChannels';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { Pages } from '@/libs/pages';

export function ChannelList() {
  const { channels } = useChannels();

  if (channels.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">
        おすすめのチャンネルはありません
      </p>
    );
  }

  return (
    <ArtworkGrid>
      {channels.map((channel, index) => (
        <Link
          key={channel.id}
          href={Pages.channel.path({ channelId: channel.id })}
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
