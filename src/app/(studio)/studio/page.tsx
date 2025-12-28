import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ダッシュボード',
  robots: { index: false },
};

export default function StudioPage() {
  return <div>Studio Dashboard</div>;
}
