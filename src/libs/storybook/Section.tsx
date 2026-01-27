import type { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3 style={{ margin: 0, fontSize: '14px', color: '#888' }}>{title}</h3>
      {children}
    </div>
  );
}
