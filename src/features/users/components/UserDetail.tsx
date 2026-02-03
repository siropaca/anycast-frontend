'use client';

import { useFollowUser } from '@/features/users/hooks/useFollowUser';
import { useUser } from '@/features/users/hooks/useUser';

interface Props {
  username: string;
  isOwnProfile?: boolean;
}

export function UserDetail({ username, isOwnProfile = false }: Props) {
  const { user } = useUser(username);
  const { isFollowing, isPending, toggleFollow } = useFollowUser(username);

  return (
    <div>
      {!isOwnProfile && (
        <button
          type="button"
          className="border"
          onClick={toggleFollow}
          disabled={isPending}
        >
          {isFollowing ? 'フォロー中' : 'フォローする'}
        </button>
      )}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
