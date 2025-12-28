import { StudioLayout } from '@/features/app/layouts/StudioLayout';

interface Props {
  children: React.ReactNode;
}

export default function StudioGroupLayout({ children }: Props) {
  return <StudioLayout>{children}</StudioLayout>;
}
