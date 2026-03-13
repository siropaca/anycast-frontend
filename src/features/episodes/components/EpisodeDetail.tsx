import Link from 'next/link';
import { CharacterList } from '@/features/channels/components/CharacterList';
import { ChannelEpisodeList } from '@/features/episodes/components/ChannelEpisodeList';
import { EpisodeActionBar } from '@/features/episodes/components/EpisodeActionBar';
import { EpisodeDescription } from '@/features/episodes/components/EpisodeDescription';
import { EpisodeHeader } from '@/features/episodes/components/EpisodeHeader';
import { getChannelsChannelId } from '@/libs/api/generated/channels/channels';
import { getChannelsChannelIdEpisodesEpisodeId } from '@/libs/api/generated/episodes/episodes';
import type {
  ResponseChannelResponse,
  ResponseEpisodeResponse,
} from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { auth } from '@/libs/auth/auth';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
  episodeId: string;
}

export async function EpisodeDetail({ channelId, episodeId }: Props) {
  const [channelResponse, episodeResponse, { isLoggedIn }] = await Promise.all([
    getChannelsChannelId(channelId),
    getChannelsChannelIdEpisodesEpisodeId(channelId, episodeId),
    auth(),
  ]);
  const channel = unwrapResponse<ResponseChannelResponse>(channelResponse);
  const episode = unwrapResponse<ResponseEpisodeResponse>(episodeResponse);

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <EpisodeHeader
        episode={episode}
        channel={channel}
        channelId={channelId}
      />

      {/* アクションボタン */}
      <EpisodeActionBar
        episode={episode}
        channelName={channel.name}
        isLoggedIn={isLoggedIn}
      />

      {/* 説明セクション */}
      <EpisodeDescription description={episode.description} />

      {/* キャラクター一覧 */}
      <CharacterList characters={channel.characters} />

      {/* こちらのエピソードもおすすめ */}
      <ChannelEpisodeList
        episodes={channel.episodes}
        channelId={channelId}
        channelName={channel.name}
        title="こちらのエピソードもおすすめ"
        excludeEpisodeId={episode.id}
        action={
          <Link
            href={Pages.channel.path({ channelId })}
            className="text-sm text-text-subtle hover:underline"
          >
            もっと見る
          </Link>
        }
      />
    </div>
  );
}
