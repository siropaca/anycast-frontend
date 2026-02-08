'use client';

import { CalendarBlankIcon, PencilSimpleIcon } from '@phosphor-icons/react';
import Image from 'next/image';

import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ChannelListItem } from '@/features/channels/components/ChannelListItem';
import { useFollowUser } from '@/features/users/hooks/useFollowUser';
import { useUser } from '@/features/users/hooks/useUser';
import { Pages } from '@/libs/pages';
import { formatYearMonth } from '@/utils/date';

const AVATAR_SIZE = 100;
const HEADER_HEIGHT = 200;

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
      {/* ヘッダー画像 */}
      <div
        className="-mx-6 -mt-5 relative overflow-hidden rounded-t-md"
        style={{ height: HEADER_HEIGHT }}
      >
        {user.headerImage ? (
          <Image
            src={user.headerImage.url}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-r from-primary/30 to-primary/10" />
        )}
      </div>

      {/* アバター・アクションボタン行 */}
      <div className="flex items-end justify-between px-1">
        <div className="-mt-[50px]">
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

        <div className="mt-3">
          {isOwnProfile ? (
            <Button
              href={Pages.settings.account.path()}
              variant="outline"
              color="secondary"
              leftIcon={<PencilSimpleIcon size={16} />}
            >
              プロフィール編集
            </Button>
          ) : (
            isLoggedIn && (
              <Button
                variant={isFollowing ? 'outline' : 'solid'}
                color="primary"
                disabled={isPending}
                onClick={toggleFollow}
              >
                {isFollowing ? 'フォロー中' : 'フォローする'}
              </Button>
            )
          )}
        </div>
      </div>

      {/* プロフィール情報 */}
      <div className="mt-3 space-y-3 px-1">
        <div>
          <h1 className="text-xl font-bold">{user.displayName}</h1>
          <p className="text-text-subtle">@{user.username}</p>
        </div>

        {user.bio && <p className="text-sm leading-relaxed">{user.bio}</p>}

        <p className="flex items-center gap-1.5 text-sm text-text-subtle">
          <CalendarBlankIcon size={16} />
          {formatYearMonth(new Date(user.createdAt))}に登録
        </p>
      </div>

      {/* チャンネル一覧 */}
      <section className="mt-8">
        <SectionTitle title="チャンネル" />
        {user.channels.length > 0 ? (
          <div>
            {user.channels.map((channel) => (
              <ChannelListItem key={channel.id} channel={channel} />
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-text-subtle">
            チャンネルはまだありません
          </p>
        )}
      </section>
    </div>
  );
}
