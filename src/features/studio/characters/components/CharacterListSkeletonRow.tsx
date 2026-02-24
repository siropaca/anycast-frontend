import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { IconButtonSkeleton } from '@/components/inputs/buttons/IconButton/IconButtonSkeleton';

export function CharacterListSkeletonRow() {
  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-4 py-3">
        <div className="flex items-center gap-4">
          <Skeleton className="size-[50px] shrink-0 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="w-0 px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <IconButtonSkeleton />
          <IconButtonSkeleton />
        </div>
      </td>
    </tr>
  );
}
