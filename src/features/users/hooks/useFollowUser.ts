'use client';

import { useQueryClient } from '@tanstack/react-query';
import { getGetMeFollowsQueryKey } from '@/libs/api/generated/me/me';
import type { ResponseFollowStatusResponse } from '@/libs/api/generated/schemas/responseFollowStatusResponse';
import {
  getGetUsersUsernameFollowQueryKey,
  useDeleteUsersUsernameFollow,
  useGetUsersUsernameFollow,
  usePostUsersUsernameFollow,
} from '@/libs/api/generated/users/users';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * ユーザーのフォロー状態と操作を提供する
 *
 * @param username - 対象ユーザーのユーザー名
 * @returns フォロー状態と操作
 */
export function useFollowUser(username: string) {
  const queryClient = useQueryClient();

  const { data: followStatusData } = useGetUsersUsernameFollow(username);

  const followStatus = followStatusData
    ? unwrapResponse<ResponseFollowStatusResponse>(followStatusData, {
        following: false,
      })
    : undefined;

  const isFollowing = followStatus?.following ?? false;

  const invalidateFollowQueries = {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getGetUsersUsernameFollowQueryKey(username),
      });
      queryClient.invalidateQueries({
        queryKey: getGetMeFollowsQueryKey(),
      });
    },
  };

  const { mutate: follow, isPending: isFollowPending } =
    usePostUsersUsernameFollow({ mutation: invalidateFollowQueries });

  const { mutate: unfollow, isPending: isUnfollowPending } =
    useDeleteUsersUsernameFollow({ mutation: invalidateFollowQueries });

  function toggleFollow() {
    if (isFollowing) {
      unfollow({ username });
    } else {
      follow({ username });
    }
  }

  return {
    isFollowing,
    isPending: isFollowPending || isUnfollowPending,

    toggleFollow,
  };
}
