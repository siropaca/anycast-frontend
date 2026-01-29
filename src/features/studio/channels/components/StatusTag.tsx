import { cn } from '@/utils/cn';

interface Props {
  isPublished: boolean;
}

export function StatusTag({ isPublished }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs',
        isPublished
          ? 'bg-status-published-bg text-status-published'
          : 'bg-status-draft-bg text-status-draft',
      )}
    >
      {isPublished ? '公開中' : '下書き'}
    </span>
  );
}
