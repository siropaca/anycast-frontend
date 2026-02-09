import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function AuthCard({ children }: Props) {
  return (
    <div className="flex w-full max-w-md max-h-[calc(100dvh-3rem)] flex-col items-center gap-8 overflow-y-auto rounded-md border border-border bg-bg-surface px-8 pb-10 py-9">
      {children}
    </div>
  );
}
