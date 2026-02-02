import type { Metadata } from 'next';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.privacy.title,
};

export default function PrivacyPage() {
  return (
    <div>
      <SectionTitle title={Pages.privacy.title} />
    </div>
  );
}
