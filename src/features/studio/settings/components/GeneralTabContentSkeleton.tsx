import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { TextareaSkeleton } from '@/components/inputs/Textarea/TextareaSkeleton';

export function GeneralTabContentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5.25 w-36" />
      <TextareaSkeleton height={206} className="w-full" />
    </div>
  );
}
