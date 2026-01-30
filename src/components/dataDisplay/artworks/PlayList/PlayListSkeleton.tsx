import { ArtworkImageSkeleton } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImageSkeleton';
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { cn } from '@/utils/cn';

interface Props {
  size?: number;
  className?: string;
}

export function PlayListSkeleton({ size = 128, className }: Props) {
  return (
    <div className={cn('rounded-md p-2', className)}>
      <ArtworkImageSkeleton size={size} />

      <div className="mt-2" style={{ width: size }}>
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
