import { SpinnerGapIcon } from '@phosphor-icons/react';
import { cn } from '@/utils/cn';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface Props {
  size?: SpinnerSize;
  className?: string;
}

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export function Spinner({ size = 'md', className }: Props) {
  return (
    <SpinnerGapIcon
      size={sizeMap[size]}
      className={cn('animate-spin text-text-subtle', className)}
    />
  );
}
