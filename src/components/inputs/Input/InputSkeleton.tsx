import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';

interface Props {
  size?: Size;
  width?: number;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-[var(--size-sm)]',
  md: 'h-[var(--size-md)]',
  lg: 'h-[var(--size-lg)]',
};

export function InputSkeleton({ size = 'md', width = 240, className }: Props) {
  return (
    <Skeleton
      style={{ width }}
      className={cn('rounded-sm', sizeClasses[size], className)}
    />
  );
}
