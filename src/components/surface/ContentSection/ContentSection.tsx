import { ScrollArea } from '@base-ui/react/scroll-area';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  moreHref?: string;
  children: ReactNode;
}

export function ContentSection({ title, moreHref, children }: Props) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-bold">{title}</h2>

        {moreHref && (
          <Link
            href={moreHref}
            className="text-sm text-text-subtle hover:underline"
          >
            もっと見る
          </Link>
        )}
      </div>

      <ScrollArea.Root className="relative">
        <ScrollArea.Viewport className="overflow-x-auto">
          <div className="inline-flex">{children}</div>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          orientation="horizontal"
          className="flex h-scrollbar items-center bg-transparent p-0.5"
        >
          <ScrollArea.Thumb className="h-full rounded-full bg-bg-elevated/75" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </section>
  );
}
