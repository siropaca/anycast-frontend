import Link from 'next/link';

import { Avatar } from '@/components/dataDisplay/Avatar/Avatar';
import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas/responseChannelResponse';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';
import { Pages } from '@/libs/pages';
import { formatDate, formatTime } from '@/utils/date';

const ARTWORK_SIZE = 170;

interface Props {
  episode: ResponseEpisodeResponse;
  channel: ResponseChannelResponse;
  channelId: string;
}

export function EpisodeHeader({ episode, channel, channelId }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
      <ArtworkImage
        src={episode.artwork?.url}
        alt={episode.title}
        size={ARTWORK_SIZE}
        priority
      />

      <div className="flex flex-col items-center gap-2.5 md:items-start">
        <h1 className="text-2xl font-bold">{episode.title}</h1>

        <p className="text-text-subtle">
          <Link
            href={Pages.channel.path({ channelId })}
            className="hover:underline"
          >
            {channel.name}
          </Link>
          <span className="mx-1">·</span>
          <Link
            href={Pages.exploreCategory.path({
              category: channel.category.slug,
            })}
            className="hover:underline"
          >
            {channel.category.name}
          </Link>
        </p>

        <Link
          href={Pages.user.path({
            username: channel.owner.username,
          })}
          className="flex items-center gap-2 text-sm text-text-subtle hover:underline"
        >
          <Avatar
            src={channel.owner.avatar?.url}
            alt={channel.owner.displayName}
            fallback={channel.owner.displayName.charAt(0)}
            size="sm"
          />
          {channel.owner.displayName}
        </Link>

        <p className="text-sm text-text-subtle">
          {episode.publishedAt && (
            <>
              {formatDate(new Date(episode.publishedAt))}
              <span className="mx-1">·</span>
            </>
          )}
          {episode.fullAudio && (
            <>
              {formatTime(episode.fullAudio.durationMs)}
              <span className="mx-1">·</span>
            </>
          )}
          {episode.playCount}回再生
        </p>
      </div>
    </div>
  );
}
