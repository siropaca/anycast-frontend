import { XIcon } from '@phosphor-icons/react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  showCounter?: boolean;
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-[var(--size-sm)] px-3 text-xs gap-1',
  md: 'h-[var(--size-md)] px-4 text-sm gap-1.5',
  lg: 'h-[var(--size-lg)] px-5 text-base gap-2',
};

const iconSizeClasses: Record<Size, string> = {
  sm: '[&>svg]:size-3.5',
  md: '[&>svg]:size-4',
  lg: '[&>svg]:size-5',
};

const clearButtonSizeClasses: Record<Size, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
};

const counterSizeClasses: Record<Size, string> = {
  sm: 'text-[10px]',
  md: 'text-xs',
  lg: 'text-sm',
};

export function Input({
  size = 'md',
  leftIcon,
  rightIcon,
  error = false,
  clearable = false,
  onClear,
  showCounter = false,
  className,
  value,
  maxLength,
  ...props
}: Props) {
  const hasLeftIcon = !!leftIcon;
  const hasValue = value !== undefined && value !== '';
  const showClearButton = clearable && hasValue;
  const currentLength = typeof value === 'string' ? value.length : 0;
  const hasRightContent = !!rightIcon || showClearButton || showCounter;

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-sm border bg-transparent transition-colors',
        'focus-within:ring-2 focus-within:ring-primary',
        error ? 'border-border-error' : 'border-border',
        sizeClasses[size],
        className,
      )}
    >
      {leftIcon && (
        <span className={cn('shrink-0 text-text-placeholder', iconSizeClasses[size])}>
          {leftIcon}
        </span>
      )}
      <input
        className={cn(
          'w-full bg-transparent text-text-main outline-none placeholder:text-text-placeholder',
          hasLeftIcon && 'pl-0',
          hasRightContent && 'pr-0',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
        value={value}
        maxLength={maxLength}
        {...props}
      />
      {showClearButton && (
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 cursor-pointer text-text-placeholder transition-colors hover:text-text-main"
          aria-label="クリア"
        >
          <XIcon className={clearButtonSizeClasses[size]} />
        </button>
      )}
      {showCounter && (
        <span
          className={cn(
            'shrink-0 tabular-nums text-text-placeholder',
            counterSizeClasses[size],
          )}
        >
          {maxLength !== undefined
            ? `${currentLength}/${maxLength}`
            : currentLength}
        </span>
      )}
      {rightIcon && (
        <span className={cn('shrink-0 text-text-placeholder', iconSizeClasses[size])}>
          {rightIcon}
        </span>
      )}
    </div>
  );
}
