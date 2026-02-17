'use client';

import { Menu } from '@base-ui/react/menu';
import type { ReactElement, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'default' | 'danger';
  disabled?: boolean;
  render?: ReactElement;

  onClick?: () => void;
}

export function DropdownMenuItem({
  children,
  icon,
  variant = 'default',
  disabled = false,
  render,
  onClick,
}: Props) {
  return (
    <Menu.Item
      className={cn(
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm outline-none',
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:bg-bg-hover-strong focus:bg-bg-hover-strong',
        variant === 'danger' && 'text-text-danger',
      )}
      disabled={disabled}
      onClick={onClick}
      render={render}
    >
      {icon}
      {children}
    </Menu.Item>
  );
}
