import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';

interface Props {
  size?: Size;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: 'size-[var(--size-sm)]',
  md: 'size-[var(--size-md)]',
  lg: 'size-[var(--size-lg)]',
};

export function AvatarSkeleton({ size = 'md', className }: Props) {
  return (
    <Skeleton
      className={cn('shrink-0 rounded-full', sizeClasses[size], className)}
    />
  );
}
