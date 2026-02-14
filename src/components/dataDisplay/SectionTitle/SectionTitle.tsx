import { CaretLeftIcon } from '@phosphor-icons/react/ssr';
import type { ReactNode } from 'react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { cn } from '@/utils/cn';

type Level = 'h2' | 'h3';

interface Props {
  title: string;
  description?: string;
  level?: Level;
  action?: ReactNode;
  backHref?: string;
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
  backHref,
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
      <div className="flex items-center gap-1">
        {backHref && (
          <IconButton
            href={backHref}
            icon={<CaretLeftIcon size={20} />}
            aria-label="戻る"
            variant="text"
            color="secondary"
            size="sm"
          />
        )}

        <div className="space-y-1">
          <Heading className={cn(levelStyles[level], 'font-bold')}>
            {title}
          </Heading>
          {description && (
            <p className="text-sm text-text-subtle">{description}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}
