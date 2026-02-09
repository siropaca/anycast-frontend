'use client';

import { Menu } from '@base-ui/react/menu';
import type { ReactElement, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'default' | 'danger';
  onClick?: () => void;
  render?: ReactElement;
}

export function DropdownMenuItem({
  children,
  icon,
  variant = 'default',
  onClick,
  render,
}: Props) {
  return (
    <Menu.Item
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none hover:bg-bg-hover-strong focus:bg-bg-hover-strong',
        variant === 'danger' && 'text-danger',
      )}
      onClick={onClick}
      render={render}
    >
      {icon}
      {children}
    </Menu.Item>
  );
}
