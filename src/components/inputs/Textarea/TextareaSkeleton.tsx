import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { cn } from '@/utils/cn';

interface Props {
  height?: number;
  width?: number;
  className?: string;
}

export function TextareaSkeleton({ height = 120, width, className }: Props) {
  return (
    <Skeleton
      style={{ width, height }}
      className={cn('w-60 rounded-sm', className)}
    />
  );
}
