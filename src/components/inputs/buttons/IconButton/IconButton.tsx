'use client';

import { SpinnerGapIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import type {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/inputs/buttons/buttonVariants';
import {
  buttonBaseClasses,
  colorVariantClasses,
} from '@/components/inputs/buttons/buttonVariants';
import { cn } from '@/utils/cn';

interface BaseProps {
  icon: ReactNode;
  'aria-label': string;
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  disabledReason?: string;
  className?: string;
}

type IconButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type IconButtonAsLink = BaseProps & {
  href: string;
};

type Props = IconButtonAsButton | IconButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'size-[var(--size-sm)] text-xs',
  md: 'size-[var(--size-md)] text-sm',
  lg: 'size-[var(--size-lg)] text-base',
  xl: 'size-[var(--size-xl)] text-lg',
};

const spinnerSizeMap: Record<ButtonSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

export function IconButton({
  icon,
  size = 'md',
  color = 'primary',
  variant = 'solid',
  loading = false,
  className,
  href,
  disabled,
  disabledReason,
  ...props
}: Props) {
  const isDisabled = disabled || loading;

  const buttonClassName = cn(
    buttonBaseClasses,
    sizeClasses[size],
    colorVariantClasses[color][variant],
    className,
  );

  const content = loading ? (
    <SpinnerGapIcon size={spinnerSizeMap[size]} className="animate-spin" />
  ) : (
    icon
  );

  if (href !== undefined) {
    const link = (
      <Link
        href={href}
        className={buttonClassName}
        aria-label={props['aria-label']}
        aria-busy={loading}
        aria-disabled={isDisabled || undefined}
      >
        {content}
      </Link>
    );

    if (isDisabled && disabledReason) {
      return (
        <Tooltip label={disabledReason}>
          <span className={cn('inline-flex', className)}>{link}</span>
        </Tooltip>
      );
    }

    return link;
  }

  const button = (
    <button
      className={buttonClassName}
      aria-busy={loading}
      disabled={isDisabled}
      {...props}
    >
      {content}
    </button>
  );

  if (isDisabled && disabledReason) {
    return (
      <Tooltip label={disabledReason}>
        <span className={cn('inline-flex', className)}>{button}</span>
      </Tooltip>
    );
  }

  return button;
}
