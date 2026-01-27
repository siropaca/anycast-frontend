import type { ReactNode } from 'react';

interface Props {
  direction?: 'row' | 'column';
  gap?: number;
  children: ReactNode;
}

export function Stack({ direction = 'row', gap = 16, children }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        gap: `${gap}px`,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {children}
    </div>
  );
}
