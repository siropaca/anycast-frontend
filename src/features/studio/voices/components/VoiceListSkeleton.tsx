import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { IconButtonSkeleton } from '@/components/inputs/buttons/IconButton/IconButtonSkeleton';

const SKELETON_ROW_COUNT = 8;

function SkeletonRow() {
  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-28" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-12" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="w-0 px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <IconButtonSkeleton size="sm" className="mr-2" />
          <IconButtonSkeleton />
        </div>
      </td>
    </tr>
  );
}

export function VoiceListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-bg-elevated">
              <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
                ボイス名
              </th>
              <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
                性別
              </th>
              <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
                プロバイダー
              </th>
              <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold" />
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
