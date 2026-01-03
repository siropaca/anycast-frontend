import { useQueryClient } from '@tanstack/react-query';
import { useDeleteChannelsChannelId } from '@/libs/api/generated/channels/channels';
import { getGetMeChannelsQueryKey } from '@/libs/api/generated/me/me';

/**
 * チャンネル削除のミューテーションを提供する
 *
 * @returns 削除ミューテーション
 */
export function useDeleteChannel() {
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteChannelsChannelId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetMeChannelsQueryKey(),
        });
      },
    },
  });

  return {
    deleteMutation,
  };
}
