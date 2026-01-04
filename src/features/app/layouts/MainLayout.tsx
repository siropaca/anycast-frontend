import { Sidebar } from '@/components/navigation/Sidebar';
import { MainLayoutSideMenu } from '@/features/app/components/MainLayoutSideMenu';
import { auth } from '@/libs/auth/auth';

interface Props {
  children: React.ReactNode;
}

export async function MainLayout({ children }: Props) {
  const { isLoggedIn } = await auth();

  return (
    <div className="flex flex-1">
      <Sidebar>
        <MainLayoutSideMenu isLoggedIn={isLoggedIn} />
      </Sidebar>

      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
}
