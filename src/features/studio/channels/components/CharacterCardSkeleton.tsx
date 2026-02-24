import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';

export function CharacterCardSkeleton() {
  return (
    <li className="space-y-2 rounded-lg border border-border p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
    </li>
  );
}
