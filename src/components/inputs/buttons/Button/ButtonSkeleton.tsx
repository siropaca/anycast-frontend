import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';

interface Props {
  size?: Size;
  width?: number;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-[var(--size-sm)] w-16',
  md: 'h-[var(--size-md)] w-20',
  lg: 'h-[var(--size-lg)] w-24',
};

export function ButtonSkeleton({ size = 'md', width, className }: Props) {
  return (
    <Skeleton
      style={{ width }}
      className={cn('rounded-full', sizeClasses[size], className)}
    />
  );
}
