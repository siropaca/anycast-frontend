import { ArtworkImageSkeleton } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImageSkeleton';
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';

const SKELETON_ROW_COUNT = 3;

function SkeletonRow() {
  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-4 py-3">
        <div className="flex items-center gap-4">
          <ArtworkImageSkeleton size={50} />
          <Skeleton className="h-4 w-28" />
        </div>
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-5 w-16 rounded-full" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-8" />
      </td>
    </tr>
  );
}

export function ChannelListSkeleton() {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-bg-elevated">
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              チャンネル
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              カテゴリ
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              ステータス
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              エピソード数
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
  );
}
