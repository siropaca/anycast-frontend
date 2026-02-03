'use client';

import { useQueryClient } from '@tanstack/react-query';
import {
  getGetEpisodesEpisodeIdReactionsQueryKey,
  useDeleteEpisodesEpisodeIdReactions,
  useGetEpisodesEpisodeIdReactions,
  usePostEpisodesEpisodeIdReactions,
} from '@/libs/api/generated/episodes/episodes';
import { getGetMeLikesQueryKey } from '@/libs/api/generated/me/me';
import type { RequestCreateOrUpdateReactionRequestReactionType } from '@/libs/api/generated/schemas/requestCreateOrUpdateReactionRequestReactionType';
import type { ResponseReactionStatusResponse } from '@/libs/api/generated/schemas/responseReactionStatusResponse';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * エピソードのリアクション状態と操作を提供する
 *
 * @param episodeId - エピソード ID
 * @returns リアクション状態と操作
 */
export function useEpisodeReaction(episodeId: string) {
  const queryClient = useQueryClient();

  const { data: reactionData } = useGetEpisodesEpisodeIdReactions(episodeId);

  const reactionStatus = reactionData
    ? unwrapResponse<ResponseReactionStatusResponse>(reactionData, {
        reactionType: null,
      })
    : undefined;

  const currentReaction =
    (reactionStatus?.reactionType as RequestCreateOrUpdateReactionRequestReactionType | null) ??
    null;

  function invalidateReactionQueries() {
    queryClient.invalidateQueries({
      queryKey: getGetEpisodesEpisodeIdReactionsQueryKey(episodeId),
    });
    queryClient.invalidateQueries({
      queryKey: getGetMeLikesQueryKey(),
    });
  }

  const { mutate: postReaction, isPending: isPostPending } =
    usePostEpisodesEpisodeIdReactions({
      mutation: { onSuccess: invalidateReactionQueries },
    });

  const { mutate: deleteReaction, isPending: isDeletePending } =
    useDeleteEpisodesEpisodeIdReactions({
      mutation: { onSuccess: invalidateReactionQueries },
    });

  /**
   * リアクションを切り替える
   *
   * 同じリアクションを再度押すと解除、異なるリアクションを押すと更新する
   *
   * @param reactionType - リアクション種別
   */
  function toggleReaction(
    reactionType: RequestCreateOrUpdateReactionRequestReactionType,
  ) {
    if (currentReaction === reactionType) {
      deleteReaction({ episodeId });
    } else {
      postReaction({ episodeId, data: { reactionType } });
    }
  }

  return {
    currentReaction,
    isPending: isPostPending || isDeletePending,

    toggleReaction,
  };
}
