import { cn } from '@/utils/cn';

interface Props {
  className?: string;
}

export function Copyright({ className }: Props) {
  const year = new Date().getFullYear();

  return (
    <small className={cn('block text-xs text-text-subtle', className)}>
      &copy; {year} Anycast
    </small>
  );
}
