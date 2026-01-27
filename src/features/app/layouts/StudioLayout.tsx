import { HeaderContainer } from '@/features/app/components/HeaderContainer';
import { LayoutBody } from '@/features/app/components/LayoutBody';
import { StudioLayoutSideMenu } from '@/features/app/components/StudioLayoutSideMenu';
import { BottomPlayer } from '@/features/player/components/BottomPlayer';

interface Props {
  children: React.ReactNode;
}

export function StudioLayout({ children }: Props) {
  const sideMenu = <StudioLayoutSideMenu />;

  return (
    <div className="flex flex-col h-screen">
      <HeaderContainer sideMenu={sideMenu} />
      <LayoutBody sideMenu={sideMenu}>{children}</LayoutBody>
      <BottomPlayer />
    </div>
  );
}
