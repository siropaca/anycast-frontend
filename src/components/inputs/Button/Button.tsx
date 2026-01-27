import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';
type Color = 'primary' | 'white';
type Variant = 'solid' | 'outline' | 'text';

type BaseProps = {
  size?: Size;
  color?: Color;
  variant?: Variant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
};

type Props = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<Size, string> = {
  sm: 'h-[var(--size-sm)] px-3 text-xs gap-1',
  md: 'h-[var(--size-md)] px-4 text-sm gap-1.5',
  lg: 'h-[var(--size-lg)] px-5 text-base gap-2',
};

const colorVariantClasses: Record<Color, Record<Variant, string>> = {
  primary: {
    solid:
      'bg-primary text-white border-transparent enabled:hover:bg-primary/80 enabled:active:bg-primary/70',
    outline:
      'bg-transparent text-primary border-primary enabled:hover:bg-primary/10 enabled:active:bg-primary/20',
    text: 'bg-transparent text-primary border-transparent enabled:hover:bg-primary/10 enabled:active:bg-primary/20',
  },
  white: {
    solid:
      'bg-white text-black border-transparent enabled:hover:bg-white/80 enabled:active:bg-white/70',
    outline:
      'bg-transparent text-white border-white enabled:hover:bg-white/10 enabled:active:bg-white/20',
    text: 'bg-transparent text-white border-transparent enabled:hover:bg-white/10 enabled:active:bg-white/20',
  },
};

export function Button({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  leftIcon,
  rightIcon,
  className,
  children,
  href,
  ...props
}: Props) {
  const buttonClassName = cn(
    'inline-flex cursor-pointer items-center justify-center rounded-full border font-medium leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-50',
    sizeClasses[size],
    colorVariantClasses[color][variant],
    className,
  );

  const content = (
    <>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (href !== undefined) {
    return (
      <Link href={href} className={buttonClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} {...props}>
      {content}
    </button>
  );
}
