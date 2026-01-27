import { BottomPlayer } from '@/features/app/components/BottomPlayer';
import { HeaderContainer } from '@/features/app/components/HeaderContainer';
import { LayoutBody } from '@/features/app/components/LayoutBody';
import { SettingsLayoutSideMenu } from '@/features/app/components/SettingsLayoutSideMenu';

interface Props {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: Props) {
  const sideMenu = <SettingsLayoutSideMenu />;

  return (
    <div className="flex flex-col h-screen">
      <HeaderContainer sideMenu={sideMenu} />
      <LayoutBody sideMenu={sideMenu}>{children}</LayoutBody>
      <BottomPlayer />
    </div>
  );
}
