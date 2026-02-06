import { HeaderContainer } from '@/features/app/components/HeaderContainer';
import { LayoutBody } from '@/features/app/components/LayoutBody';
import { StudioLayoutSideMenu } from '@/features/app/components/StudioLayoutSideMenu';

interface Props {
  children: React.ReactNode;
}

export function StudioLayout({ children }: Props) {
  const sideMenu = <StudioLayoutSideMenu />;

  return (
    <div className="flex flex-col h-full">
      <HeaderContainer sideMenu={sideMenu} />
      <LayoutBody sideMenu={sideMenu}>{children}</LayoutBody>
    </div>
  );
}
