import { ChannelEpisodeList } from '@/features/episodes/components/ChannelEpisodeList';
import { EpisodeDescription } from '@/features/episodes/components/EpisodeDescription';
import { getChannelsChannelId } from '@/libs/api/generated/channels/channels';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

import { ChannelActionBar } from './ChannelActionBar';
import { ChannelHeader } from './ChannelHeader';
import { CharacterList } from './CharacterList';

interface Props {
  channelId: string;
}

export async function ChannelDetail({ channelId }: Props) {
  const channelResponse = await getChannelsChannelId(channelId);
  const channel = unwrapResponse<ResponseChannelResponse>(channelResponse);

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <ChannelHeader channel={channel} />

      {/* アクションボタン */}
      <ChannelActionBar
        episodes={channel.episodes}
        channelName={channel.name}
      />

      {/* 説明セクション */}
      <EpisodeDescription description={channel.description} />

      {/* キャラクター一覧 */}
      <CharacterList characters={channel.characters} />

      {/* エピソード一覧 */}
      <ChannelEpisodeList
        episodes={channel.episodes}
        channelId={channel.id}
        channelName={channel.name}
        title="エピソード"
        emptyMessage="エピソードはまだありません"
        showChannelName={false}
      />
    </div>
  );
}
