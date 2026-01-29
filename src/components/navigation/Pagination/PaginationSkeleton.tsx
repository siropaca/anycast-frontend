import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/ssr';
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { cn } from '@/utils/cn';

interface Props {
  pageCount?: number;
  className?: string;
}

export function PaginationSkeleton({ pageCount = 5, className }: Props) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex size-8 items-center justify-center text-text-subtle">
        <CaretLeftIcon size={16} />
      </div>

      {Array.from({ length: pageCount }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: スケルトンは静的なリストで順序が変わらない
        <Skeleton key={i} className="size-8 rounded-md" />
      ))}

      <div className="flex size-8 items-center justify-center text-text-subtle">
        <CaretRightIcon size={16} />
      </div>
    </div>
  );
}
