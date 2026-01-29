import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Level = 'h2' | 'h3';

interface Props {
  title: string;
  description?: string;
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
  description,
  level = 'h2',
  action,
  className,
}: Props) {
  const Heading = level;

  return (
    <div
      className={cn(
        'flex min-h-(--size-md) flex-wrap items-center justify-between gap-4',
        className,
      )}
    >
      <div className="space-y-1">
        <Heading className={cn(levelStyles[level], 'font-bold')}>
          {title}
        </Heading>
        {description && (
          <p className="text-sm text-text-subtle">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
