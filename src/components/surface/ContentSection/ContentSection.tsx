import { ScrollArea } from '@base-ui/react/scroll-area';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';

interface Props {
  title: string;
  moreHref?: string;
  children: ReactNode;
}

export function ContentSection({ title, moreHref, children }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <SectionTitle title={title} />

        {moreHref && (
          <Link
            href={moreHref}
            className="text-sm text-text-subtle hover:underline"
          >
            もっと見る
          </Link>
        )}
      </div>

      <ScrollArea.Root className="relative py-2">
        <ScrollArea.Viewport className="overflow-x-auto">
          <div className="inline-flex space-x-2">{children}</div>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          orientation="horizontal"
          className="flex h-scrollbar items-center bg-transparent pt-1"
        >
          <ScrollArea.Thumb className="h-full rounded-full bg-bg-elevated/75" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </section>
  );
}
