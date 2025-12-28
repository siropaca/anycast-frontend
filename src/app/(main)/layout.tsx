import { MainLayout } from '@/features/app/layouts/MainLayout';

interface Props {
  children: React.ReactNode;
}

export default function MainGroupLayout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
