import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import { useGetCategoriesSuspense } from '@/libs/api/generated/categories/categories';
import {
  useGetChannelsChannelIdSuspense,
  usePatchChannelsChannelId,
} from '@/libs/api/generated/channels/channels';
import type {
  ResponseCategoryResponse,
  ResponseChannelResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { useGetVoicesSuspense } from '@/libs/api/generated/voices/voices';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * チャンネル編集に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @returns チャンネルデータ、フォームデータ、カテゴリ一覧、ボイス一覧、更新ミューテーション
 */
export function useEditChannel(channelId: string) {
  const { data: channelData } = useGetChannelsChannelIdSuspense(channelId);
  const { data: categoriesData } = useGetCategoriesSuspense();
  const { data: voicesData } = useGetVoicesSuspense();
  const updateMutation = usePatchChannelsChannelId();

  const channel = unwrapResponse<ResponseChannelResponse>(channelData);
  const categories = unwrapResponse<ResponseCategoryResponse[]>(
    categoriesData,
    [],
  );
  const voices = unwrapResponse<ResponseVoiceResponse[]>(voicesData, []);

  const defaultValues: ChannelFormInput = {
    name: channel.name,
    description: channel.description,
    userPrompt: channel.userPrompt,
    categoryId: channel.category.id,
    characters: channel.characters.map((c) => ({
      name: c.name,
      voiceId: c.voice.id,
      persona: c.persona ?? '',
    })),
  };

  return {
    channel,
    defaultValues,
    categories,
    voices,
    updateMutation,
  };
}
