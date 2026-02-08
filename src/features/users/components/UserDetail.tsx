'use client';

import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { UserChannelList } from '@/features/users/components/UserChannelList';
import { UserHeaderImage } from '@/features/users/components/UserHeaderImage';
import { UserProfileActions } from '@/features/users/components/UserProfileActions';
import { UserProfileInfo } from '@/features/users/components/UserProfileInfo';
import { useFollowUser } from '@/features/users/hooks/useFollowUser';
import { useUser } from '@/features/users/hooks/useUser';

const AVATAR_SIZE = 120;

interface Props {
  username: string;
  isOwnProfile?: boolean;
  isLoggedIn?: boolean;
}

export function UserDetail({
  username,
  isOwnProfile = false,
  isLoggedIn = false,
}: Props) {
  const { user } = useUser(username);
  const { isFollowing, isPending, toggleFollow } = useFollowUser(username);

  return (
    <div>
      <UserHeaderImage src={user.headerImage?.url} />

      {/* アバター・アクションボタン行 */}
      <div className="flex items-end justify-between">
        <div
          className="relative"
          style={{ marginTop: `-${AVATAR_SIZE / 2}px` }}
        >
          <div className="rounded-full border-4 border-bg-surface">
            <ArtworkImage
              src={user.avatar?.url}
              alt={user.displayName}
              size={AVATAR_SIZE}
              rounded
              priority
            />
          </div>
        </div>

        <UserProfileActions
          user={user}
          isOwnProfile={isOwnProfile}
          isLoggedIn={isLoggedIn}
          isFollowing={isFollowing}
          isPending={isPending}
          onToggleFollow={toggleFollow}
        />
      </div>

      <UserProfileInfo
        displayName={user.displayName}
        username={user.username}
        bio={user.bio}
        createdAt={user.createdAt}
      />

      <UserChannelList channels={user.channels} />
    </div>
  );
}
