import { HeaderContainer } from '@/features/app/components/HeaderContainer';
import { LayoutBody } from '@/features/app/components/LayoutBody';
import { MainLayoutSideMenu } from '@/features/app/components/MainLayoutSideMenu';
import { auth } from '@/libs/auth/auth';

interface Props {
  children: React.ReactNode;
}

export async function MainLayout({ children }: Props) {
  const { session, isLoggedIn } = await auth();

  const sideMenu = (
    <MainLayoutSideMenu
      isLoggedIn={isLoggedIn}
      username={session?.user?.username}
    />
  );

  return (
    <div className="flex flex-col h-full">
      <HeaderContainer sideMenu={sideMenu} />
      <LayoutBody sideMenu={sideMenu}>{children}</LayoutBody>
    </div>
  );
}
