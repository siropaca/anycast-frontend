import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { cn } from '@/utils/cn';

interface Props {
  size?: number;
  className?: string;
}

export function ArtworkSkeleton({ size = 128, className }: Props) {
  return (
    <Skeleton
      style={{ width: size, height: size }}
      className={cn('shrink-0', className)}
    />
  );
}
