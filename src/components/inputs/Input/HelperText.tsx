import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Props = HTMLAttributes<HTMLParagraphElement> & {
  error?: boolean;
};

export function HelperText({
  error = false,
  className,
  children,
  ...props
}: Props) {
  return (
    <p
      className={cn(
        'text-xs',
        error ? 'text-text-danger' : 'text-text-placeholder',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
