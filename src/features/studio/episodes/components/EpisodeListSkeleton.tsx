import { PlusIcon } from '@phosphor-icons/react/ssr';

import { ArtworkImageSkeleton } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImageSkeleton';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { Button } from '@/components/inputs/buttons/Button/Button';

const SKELETON_ROW_COUNT = 3;

function SkeletonRow() {
  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-4 py-3">
        <div className="flex items-center gap-4">
          <ArtworkImageSkeleton size={50} />
          <Skeleton className="h-4 w-32" />
        </div>
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-5 w-16 rounded-full" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-8" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-8" />
      </td>
    </tr>
  );
}

export function EpisodeListSkeleton() {
  return (
    <div className="space-y-4">
      <SectionTitle
        title="エピソード"
        level="h3"
        action={
          <Button size="sm" leftIcon={<PlusIcon size={16} />} disabled>
            新規追加
          </Button>
        }
      />

      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-bg-elevated">
              <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
                エピソード
              </th>
              <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
                ステータス
              </th>
              <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
                台本行数
              </th>
              <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
                再生数
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: スケルトン行は固定で並び替えが発生しない
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
