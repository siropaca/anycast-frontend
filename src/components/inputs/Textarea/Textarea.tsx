import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
  showCounter?: boolean;
};

export function Textarea({
  error = false,
  showCounter = false,
  className,
  value,
  maxLength,
  ...props
}: Props) {
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className="relative inline-block">
      <textarea
        className={cn(
          'block w-full resize-none rounded-sm border bg-transparent px-4 py-3 text-sm transition-colors',
          'text-foreground outline-none placeholder:text-placeholder',
          'focus:ring-2 focus:ring-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-border-error' : 'border-border',
          showCounter && 'pb-8',
          className,
        )}
        value={value}
        maxLength={maxLength}
        {...props}
      />
      {showCounter && (
        <span className="absolute bottom-2 right-3 text-xs tabular-nums text-placeholder">
          {maxLength !== undefined
            ? `${currentLength}/${maxLength}`
            : currentLength}
        </span>
      )}
    </div>
  );
}
