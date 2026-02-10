import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';

type Option<T extends string> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onValueChange: (value: T) => void;
  size?: Size;
  disabled?: boolean;
  className?: string;
};

const containerSizeClasses: Record<Size, string> = {
  sm: 'gap-0.5 rounded-md p-0.5',
  md: 'gap-1 rounded-md p-1',
  lg: 'gap-1 rounded-lg p-1',
};

const buttonSizeClasses: Record<Size, string> = {
  sm: 'rounded px-2 py-1 text-xs',
  md: 'rounded-md px-3 py-1.5 text-sm',
  lg: 'rounded-md px-4 py-2 text-base',
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  size = 'md',
  disabled = false,
  className,
}: Props<T>) {
  return (
    <div
      className={cn(
        'flex bg-bg-subtle',
        disabled && 'opacity-50',
        containerSizeClasses[size],
        className,
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        const isDisabled = disabled || option.disabled;

        return (
          <button
            key={option.value}
            type="button"
            disabled={isDisabled}
            className={cn(
              'flex-1 font-medium transition-colors',
              isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
              isActive
                ? 'bg-bg-elevated text-text-main shadow-sm'
                : 'text-text-subtle',
              !isActive && !isDisabled && 'hover:text-text-main',
              buttonSizeClasses[size],
            )}
            onClick={() => {
              if (!isDisabled) onValueChange(option.value);
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
