import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  'aria-label'?: string;
  'aria-current'?: 'page';

  onClick: () => void;
}

export function PaginationButton({
  children,
  onClick,
  disabled = false,
  isActive = false,
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={cn(
        'flex size-8 cursor-pointer items-center justify-center rounded-md text-sm transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        isActive
          ? 'bg-primary text-white'
          : 'hover:bg-bg-hover text-text-subtle hover:text-text-main',
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
