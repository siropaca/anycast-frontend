import Link from 'next/link';
import { Dialog } from '@/components/utils/Dialog/Dialog';

interface Props {
  title: string;
  items: { label: string; href: string }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BgmUsageDialog({ title, items, open, onOpenChange }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Close />
        <Dialog.Title>{title}</Dialog.Title>

        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-primary hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Dialog.Content>
    </Dialog.Root>
  );
}
