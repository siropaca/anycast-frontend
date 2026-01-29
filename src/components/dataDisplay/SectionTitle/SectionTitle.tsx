import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Level = 'h2' | 'h3';

interface Props {
  title: string;
  level?: Level;
  action?: ReactNode;
  className?: string;
}

const levelStyles: Record<Level, string> = {
  h2: 'text-xl',
  h3: 'text-lg',
};

export function SectionTitle({
  title,
  level = 'h2',
  action,
  className,
}: Props) {
  const Heading = level;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-4 font-bold',
        className,
      )}
    >
      <Heading className={levelStyles[level]}>{title}</Heading>
      {action}
    </div>
  );
}
