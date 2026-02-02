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
import { cn } from '@/utils/cn';

interface BaseProps {
  icon: ReactNode;
  'aria-label': string;
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  loading?: boolean;
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
};

const spinnerSizeMap: Record<ButtonSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export function IconButton({
  icon,
  size = 'md',
  color = 'primary',
  variant = 'solid',
  loading = false,
  className,
  href,
  ...props
}: Props) {
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
    return (
      <Link
        href={href}
        className={buttonClassName}
        aria-label={props['aria-label']}
        aria-busy={loading}
        aria-disabled={loading || undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={buttonClassName}
      aria-busy={loading}
      {...props}
      {...(loading ? { disabled: true } : {})}
    >
      {content}
    </button>
  );
}
