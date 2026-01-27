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

const defaultWidths: Record<Size, number> = {
  sm: 64,
  md: 80,
  lg: 96,
};

export function ButtonSkeleton({ size = 'md', width, className }: Props) {
  return (
    <Skeleton
      style={{ width: width ?? defaultWidths[size] }}
      className={cn('rounded-full', sizeClasses[size], className)}
    />
  );
}
