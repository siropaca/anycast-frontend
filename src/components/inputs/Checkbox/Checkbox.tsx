import { CheckIcon, MinusIcon } from '@phosphor-icons/react';
import { type InputHTMLAttributes, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
  size?: Size;
  error?: boolean;
  label?: string;
  indeterminate?: boolean;
};

const boxSizeClasses: Record<Size, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

const checkIconSizeClasses: Record<Size, string> = {
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
};

const labelSizeClasses: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function Checkbox({
  size = 'md',
  error = false,
  label,
  indeterminate = false,
  className,
  disabled,
  checked,
  ...props
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 select-none',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      )}
    >
      <span className="relative inline-flex shrink-0 items-center justify-center">
        <input
          ref={inputRef}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          {...props}
        />

        {/* チェックボックスの外枠 */}
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-[4px] border transition-colors',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-primary',
            error ? 'border-border-danger' : 'border-border',
            'peer-checked:border-primary peer-checked:bg-primary',
            indeterminate && 'border-primary bg-primary',
            !disabled && 'hover:border-primary',
            boxSizeClasses[size],
          )}
        />

        {/* アイコン */}
        {indeterminate ? (
          <MinusIcon
            weight="bold"
            className={cn(
              'pointer-events-none absolute text-white',
              checkIconSizeClasses[size],
            )}
          />
        ) : (
          <CheckIcon
            weight="bold"
            className={cn(
              'pointer-events-none absolute text-white opacity-0 transition-opacity',
              'peer-checked:opacity-100',
              checkIconSizeClasses[size],
            )}
          />
        )}
      </span>

      {label && (
        <span className={cn('text-text-main', labelSizeClasses[size])}>
          {label}
        </span>
      )}
    </label>
  );
}
