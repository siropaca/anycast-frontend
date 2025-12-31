import { Sidebar } from '@/components/navigation/Sidebar';
import { SideMenu } from '@/components/navigation/SideMenu';
import {
  MAIN_MENU_SECTIONS,
  MY_PAGE_SECTION,
} from '@/features/app/config/mainMenu';
import { auth } from '@/libs/auth/auth';

interface Props {
  children: React.ReactNode;
}

export async function MainLayout({ children }: Props) {
  const { isLoggedIn } = await auth();

  const sections = isLoggedIn
    ? [...MAIN_MENU_SECTIONS, MY_PAGE_SECTION]
    : MAIN_MENU_SECTIONS;

  return (
    <div className="flex flex-1">
      <Sidebar>
        <SideMenu sections={sections} />
      </Sidebar>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
