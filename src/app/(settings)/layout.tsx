import { SettingsLayout } from '@/features/app/layouts/SettingsLayout';

interface Props {
  children: React.ReactNode;
}

export default function SettingsGroupLayout({ children }: Props) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
