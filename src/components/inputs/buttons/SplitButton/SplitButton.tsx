'use client';

import { Menu } from '@base-ui/react/menu';
import { CaretDownIcon, SpinnerGapIcon } from '@phosphor-icons/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import type {
  ButtonColor,
  ButtonSize,
} from '@/components/inputs/buttons/buttonVariants';
import {
  buttonBaseClasses,
  colorVariantClasses,
} from '@/components/inputs/buttons/buttonVariants';
import { cn } from '@/utils/cn';

type SplitButtonVariant = 'solid' | 'outline';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: SplitButtonVariant;
  loading?: boolean;
  leftIcon?: ReactNode;
  disabled?: boolean;
  disabledReason?: string;
  className?: string;
  children?: ReactNode;
  menu: ReactNode;
}

const mainSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-[var(--size-sm)] pl-3 pr-2 text-xs gap-1',
  md: 'h-[var(--size-md)] pl-4 pr-3 text-sm gap-1.5',
  lg: 'h-[var(--size-lg)] pl-5 pr-4 text-base gap-2',
  xl: 'h-[var(--size-xl)] pl-6 pr-5 text-lg gap-2.5',
};

const triggerSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-[var(--size-sm)] px-1.5',
  md: 'h-[var(--size-md)] px-2',
  lg: 'h-[var(--size-lg)] px-2.5',
  xl: 'h-[var(--size-xl)] px-3',
};

const caretSizeMap: Record<ButtonSize, number> = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
};

const spinnerSizeMap: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
};

const dividerClasses: Record<
  ButtonColor,
  Record<SplitButtonVariant, string>
> = {
  primary: {
    solid: 'bg-white/20',
    outline: 'bg-primary',
  },
  secondary: {
    solid: 'bg-black/15',
    outline: 'bg-secondary',
  },
  danger: {
    solid: 'bg-white/20',
    outline: 'bg-text-danger',
  },
  inverse: {
    solid: 'bg-black/15',
    outline: 'bg-border',
  },
};

export function SplitButton({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  loading = false,
  leftIcon,
  className,
  children,
  disabled,
  disabledReason,
  menu,
  ...props
}: Props) {
  const isDisabled = disabled || loading;

  const mainClassName = cn(
    buttonBaseClasses,
    mainSizeClasses[size],
    colorVariantClasses[color][variant],
    'rounded-l-full rounded-r-none border-r-0',
  );

  const triggerClassName = cn(
    buttonBaseClasses,
    triggerSizeClasses[size],
    colorVariantClasses[color][variant],
    'rounded-r-full rounded-l-none border-l-0',
  );

  const spinner = (
    <SpinnerGapIcon size={spinnerSizeMap[size]} className="animate-spin" />
  );

  const mainContent = (
    <>
      {loading ? (
        <span className="shrink-0">{spinner}</span>
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
    </>
  );

  const divider = (
    <span className={cn('w-px self-stretch', dividerClasses[color][variant])} />
  );

  if (isDisabled) {
    const disabledView = (
      <div className={cn('inline-flex items-stretch', className)}>
        <button
          className={mainClassName}
          aria-busy={loading}
          disabled
          {...props}
        >
          {mainContent}
        </button>
        {divider}
        <button
          type="button"
          className={triggerClassName}
          disabled
          aria-label="メニューを開く"
        >
          <CaretDownIcon size={caretSizeMap[size]} weight="bold" />
        </button>
      </div>
    );

    if (disabledReason) {
      return (
        <Tooltip label={disabledReason}>
          <span className="inline-flex">{disabledView}</span>
        </Tooltip>
      );
    }

    return disabledView;
  }

  return (
    <Menu.Root>
      <div className={cn('inline-flex items-stretch', className)}>
        <button className={mainClassName} aria-busy={loading} {...props}>
          {mainContent}
        </button>
        {divider}
        <Menu.Trigger
          render={
            <button
              type="button"
              className={triggerClassName}
              aria-label="メニューを開く"
            />
          }
        >
          <CaretDownIcon size={caretSizeMap[size]} weight="bold" />
        </Menu.Trigger>
      </div>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup className="min-w-36 rounded-md border border-border bg-bg-elevated p-1 shadow-lg">
            {menu}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
