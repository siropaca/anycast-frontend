import { BottomPlayer } from '@/features/app/components/BottomPlayer';
import { HeaderContainer } from '@/features/app/components/HeaderContainer';
import { LayoutBody } from '@/features/app/components/LayoutBody';
import { MainLayoutSideMenu } from '@/features/app/components/MainLayoutSideMenu';
import { auth } from '@/libs/auth/auth';

interface Props {
  children: React.ReactNode;
}

export async function MainLayout({ children }: Props) {
  const { isLoggedIn } = await auth();

  const sideMenu = <MainLayoutSideMenu isLoggedIn={isLoggedIn} />;

  return (
    <div className="flex flex-col h-screen">
      <HeaderContainer sideMenu={sideMenu} />
      <LayoutBody sideMenu={sideMenu}>{children}</LayoutBody>
      <BottomPlayer />
    </div>
  );
}
