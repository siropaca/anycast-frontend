import type { Metadata } from 'next';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.terms.title,
};

export default function TermsPage() {
  return (
    <div>
      <SectionTitle title={Pages.terms.title} />
    </div>
  );
}
