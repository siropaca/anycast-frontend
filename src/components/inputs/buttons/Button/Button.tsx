'use client';

import { SpinnerGapIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/inputs/buttons/buttonVariants';
import {
  buttonBaseClasses,
  colorVariantClasses,
} from '@/components/inputs/buttons/buttonVariants';
import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import { cn } from '@/utils/cn';

interface BaseProps {
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  disabledReason?: string;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
};

type Props = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-[var(--size-sm)] px-3 text-xs gap-1',
  md: 'h-[var(--size-md)] px-4 text-sm gap-1.5',
  lg: 'h-[var(--size-lg)] px-5 text-base gap-2',
};

const spinnerSizeMap: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

export function Button({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
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

  const spinner = (
    <SpinnerGapIcon size={spinnerSizeMap[size]} className="animate-spin" />
  );

  const content = (
    <>
      {loading ? (
        <span className="shrink-0">{spinner}</span>
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (href !== undefined) {
    const link = (
      <Link
        href={href}
        className={buttonClassName}
        aria-busy={loading}
        aria-disabled={isDisabled || undefined}
      >
        {content}
      </Link>
    );

    if (isDisabled && disabledReason) {
      return (
        <Tooltip label={disabledReason}>
          <span className="inline-flex">{link}</span>
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
        <span className="inline-flex">{button}</span>
      </Tooltip>
    );
  }

  return button;
}
