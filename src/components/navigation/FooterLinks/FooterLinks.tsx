import Link from 'next/link';
import { Pages } from '@/libs/pages';
import { cn } from '@/utils/cn';

const links = [
  { href: Pages.terms.path(), label: Pages.terms.title },
  { href: Pages.privacy.path(), label: Pages.privacy.title },
  { href: Pages.contact.path(), label: Pages.contact.title },
] as const;

interface Props {
  className?: string;
}

export function FooterLinks({ className }: Props) {
  return (
    <nav className={cn('flex justify-center gap-6 flex-wrap', className)}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-text-subtle hover:underline"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
