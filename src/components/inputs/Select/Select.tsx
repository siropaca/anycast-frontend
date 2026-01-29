import { Select as BaseSelect } from '@base-ui/react/select';
import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';

type Option<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  options: Option<T>[];
  value?: T | null;
  defaultValue?: T;
  onValueChange?: (value: T | null) => void;
  placeholder?: string;
  size?: Size;
  error?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  className?: string;
  name?: string;
  required?: boolean;
};

const triggerSizeClasses: Record<Size, string> = {
  sm: 'h-[var(--size-sm)] px-3 text-xs gap-1',
  md: 'h-[var(--size-md)] px-4 text-sm gap-1.5',
  lg: 'h-[var(--size-lg)] px-5 text-base gap-2',
};

const iconSizeClasses: Record<Size, string> = {
  sm: '[&>svg]:size-3.5',
  md: '[&>svg]:size-4',
  lg: '[&>svg]:size-5',
};

const caretSizeClasses: Record<Size, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
};

const popupSizeClasses: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const itemSizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 gap-1',
  md: 'px-4 py-2 gap-1.5',
  lg: 'px-5 py-2.5 gap-2',
};

const checkIconSizeClasses: Record<Size, string> = {
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
};

export function Select<T extends string>({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = '選択してください',
  size = 'md',
  error = false,
  disabled = false,
  leftIcon,
  className,
  name,
  required,
}: Props<T>) {
  function handleValueChange(newValue: T | null) {
    onValueChange?.(newValue);
  }

  return (
    <BaseSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      name={name}
      required={required}
      items={options}
    >
      <BaseSelect.Trigger
        className={cn(
          'inline-flex items-center justify-between rounded-sm border bg-bg-elevated transition-colors',
          'focus:ring-2 focus:ring-primary focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-border-error' : 'border-border',
          triggerSizeClasses[size],
          className,
        )}
      >
        {leftIcon && (
          <span
            className={cn(
              'shrink-0 text-text-placeholder',
              iconSizeClasses[size],
            )}
          >
            {leftIcon}
          </span>
        )}
        <BaseSelect.Value className="flex-1 text-left text-text-main">
          {(selectedValue: T | null) =>
            selectedValue !== null ? (
              options.find((opt) => opt.value === selectedValue)?.label
            ) : (
              <span className="text-text-placeholder">{placeholder}</span>
            )
          }
        </BaseSelect.Value>
        <BaseSelect.Icon
          className={cn(
            'shrink-0 text-text-placeholder',
            caretSizeClasses[size],
          )}
        >
          <CaretDownIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={4} alignItemWithTrigger={false}>
          <BaseSelect.Popup
            className={cn(
              'w-(--anchor-width) rounded-sm border border-border bg-bg-elevated py-1 shadow-lg',
              'origin-(--transform-origin) transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
              popupSizeClasses[size],
            )}
          >
            {options.map((option) => (
              <BaseSelect.Item
                key={option.value}
                value={option.value}
                className={cn(
                  'flex cursor-pointer items-center outline-none transition-colors',
                  'text-text-main data-highlighted:bg-bg-hover',
                  itemSizeClasses[size],
                )}
              >
                <BaseSelect.ItemIndicator
                  className={cn(
                    'shrink-0 text-primary',
                    checkIconSizeClasses[size],
                  )}
                >
                  <CheckIcon weight="bold" />
                </BaseSelect.ItemIndicator>
                <BaseSelect.ItemText className="flex-1">
                  {option.label}
                </BaseSelect.ItemText>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
