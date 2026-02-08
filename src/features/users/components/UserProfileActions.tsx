'use client';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import { Button } from '@/components/inputs/buttons/Button/Button';
import { UserProfileEditModal } from '@/features/users/components/UserProfileEditModal';
import type { ResponsePublicUserResponse } from '@/libs/api/generated/schemas';

interface Props {
  user: ResponsePublicUserResponse;
  isOwnProfile: boolean;
  isLoggedIn: boolean;
  isFollowing: boolean;
  isPending: boolean;

  onToggleFollow: () => void;
}

export function UserProfileActions({
  user,
  isOwnProfile,
  isLoggedIn,
  isFollowing,
  isPending,
  onToggleFollow,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isOwnProfile) {
    return (
      <>
        <Button
          variant="outline"
          color="secondary"
          leftIcon={<PencilSimpleIcon size={16} />}
          onClick={() => setIsEditModalOpen(true)}
        >
          プロフィール編集
        </Button>

        <UserProfileEditModal
          user={user}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      </>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Button
      variant={isFollowing ? 'outline' : 'solid'}
      color="primary"
      disabled={isPending}
      onClick={onToggleFollow}
    >
      {isFollowing ? 'フォロー中' : 'フォローする'}
    </Button>
  );
}
