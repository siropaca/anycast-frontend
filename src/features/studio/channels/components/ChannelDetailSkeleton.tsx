'use client';

import { DotsThreeIcon, PencilSimpleIcon } from '@phosphor-icons/react';
import { CaretLeftIcon } from '@phosphor-icons/react/ssr';

import { ArtworkImageSkeleton } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImageSkeleton';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { CharacterCardSkeleton } from '@/features/studio/channels/components/CharacterCardSkeleton';
import { EpisodeListSkeleton } from '@/features/studio/episodes/components/EpisodeListSkeleton';
import { Pages } from '@/libs/pages';

const ARTWORK_SIZE = 150;
const SKELETON_CHARACTER_COUNT = 2;

export function ChannelDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex min-h-(--size-md) flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <IconButton
            href={Pages.studio.channels.path()}
            icon={<CaretLeftIcon size={20} />}
            aria-label="戻る"
            variant="text"
            color="secondary"
            size="sm"
            className="relative top-px"
          />
          <Skeleton className="h-7 w-40" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-14 rounded-full" />
          <Button
            size="sm"
            variant="outline"
            color="secondary"
            leftIcon={<PencilSimpleIcon size={16} />}
            disabled
          >
            編集
          </Button>
          <IconButton
            icon={<DotsThreeIcon size={26} weight="bold" />}
            aria-label="メニュー"
            color="secondary"
            variant="text"
            disabled
          />
        </div>
      </div>

      {/* チャンネル情報 */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <ArtworkImageSkeleton size={ARTWORK_SIZE} />

        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-4 w-20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>

      {/* キャラクター */}
      <div className="space-y-3">
        <SectionTitle title="キャラクター" level="h3" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: SKELETON_CHARACTER_COUNT }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: スケルトン行は固定で並び替えが発生しない
            <CharacterCardSkeleton key={i} />
          ))}
        </ul>
      </div>

      {/* デフォルトBGM */}
      <div className="space-y-3">
        <SectionTitle
          title="デフォルトBGM"
          level="h3"
          action={
            <Button
              size="sm"
              variant="outline"
              color="secondary"
              leftIcon={<PencilSimpleIcon size={16} />}
              disabled
            >
              編集
            </Button>
          }
        />
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded-md" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* 台本プロンプト */}
      <div className="space-y-3">
        <SectionTitle
          title="台本プロンプト"
          level="h3"
          action={
            <Button
              size="sm"
              variant="outline"
              color="secondary"
              leftIcon={<PencilSimpleIcon size={16} />}
              disabled
            >
              編集
            </Button>
          }
        />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* エピソード一覧 */}
      <EpisodeListSkeleton />
    </div>
  );
}
