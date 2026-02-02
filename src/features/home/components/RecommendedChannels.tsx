'use client';

import Link from 'next/link';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ContentSectionEmpty } from '@/components/surface/ContentSection/ContentSectionEmpty';
import { RecommendedChannelsSkeleton } from '@/features/home/components/RecommendedChannelsSkeleton';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';
import { useRecommendedChannels } from '@/features/home/hooks/useRecommendedChannels';
import { Pages } from '@/libs/pages';

export function RecommendedChannels() {
  const { channels } = useRecommendedChannels();

  if (channels.length === 0) {
    return (
      <ContentSectionEmpty message="おすすめのチャンネルはありません">
        <RecommendedChannelsSkeleton />
      </ContentSectionEmpty>
    );
  }

  return (
    <ContentSection
      title="おすすめのチャンネル"
      moreHref={Pages.channels.path()}
    >
      {channels.map((channel, index) => (
        <Link
          key={channel.id}
          href={Pages.channel.path({ channelSlug: channel.id })}
        >
          <Artwork
            src={channel.artwork?.url}
            title={channel.name}
            subtext={channel.category.name}
            size={ARTWORK_SIZE}
            priority={index < 8}
          />
        </Link>
      ))}
    </ContentSection>
  );
}
