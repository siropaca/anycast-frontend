import { cn } from '@/utils/cn';

type Color = 'green' | 'gray' | 'blue';

const colorClasses: Record<Color, string> = {
  green: 'bg-status-published-bg text-status-published',
  gray: 'bg-status-draft-bg text-status-draft',
  blue: 'bg-primary/20 text-primary',
};

interface Props {
  label: string;
  color: Color;
}

export function Tag({ label, color }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs',
        colorClasses[color],
      )}
    >
      {label}
    </span>
  );
}
