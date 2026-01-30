import { ArtworkImageSkeleton } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImageSkeleton';
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { cn } from '@/utils/cn';

interface Props {
  size?: number;
  hasSubtext?: boolean;
  hasSubtext2?: boolean;
  className?: string;
}

export function ArtworkSkeleton({
  size = 128,
  hasSubtext = true,
  hasSubtext2 = false,
  className,
}: Props) {
  return (
    <div className={cn('rounded-md p-2', className)}>
      <ArtworkImageSkeleton size={size} />

      <div className="mt-2 flex flex-col gap-1" style={{ width: size }}>
        <Skeleton className="h-4 w-3/4" />
        {hasSubtext && <Skeleton className="h-4 w-1/2" />}
        {hasSubtext2 && <Skeleton className="h-4 w-1/3" />}
      </div>
    </div>
  );
}
