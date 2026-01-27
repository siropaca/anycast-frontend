import type { CSSProperties } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({ className, style }: Props) {
  return (
    <div
      style={style}
      className={cn('animate-pulse rounded-md bg-bg-elevated', className)}
    />
  );
}
