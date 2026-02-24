import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { IconButtonSkeleton } from '@/components/inputs/buttons/IconButton/IconButtonSkeleton';

export function ApiKeySkeletonRow() {
  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-28" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-16" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-16" />
      </td>
      <td className="w-0 px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <IconButtonSkeleton />
        </div>
      </td>
    </tr>
  );
}
