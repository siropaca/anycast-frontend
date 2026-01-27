import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { cn } from '@/utils/cn';

interface Props {
  rows?: number;
  width?: number;
  className?: string;
}

export function TextareaSkeleton({ rows = 4, width = 240, className }: Props) {
  return (
    <Skeleton
      style={{ width, height: rows * 24 + 24 }}
      className={cn('rounded-sm', className)}
    />
  );
}
