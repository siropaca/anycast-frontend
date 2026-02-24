import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';

export function ScriptLineSkeleton() {
  return (
    <li className="flex items-start gap-2">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </li>
  );
}
