import type { Metadata } from 'next';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.contact.title,
};

export default function ContactPage() {
  return (
    <div>
      <SectionTitle title={Pages.contact.title} />
    </div>
  );
}
