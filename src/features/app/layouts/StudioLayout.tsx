import { Sidebar } from '@/components/navigation/Sidebar';
import { StudioLayoutSideMenu } from '@/features/app/components/StudioLayoutSideMenu';

interface Props {
  children: React.ReactNode;
}

export function StudioLayout({ children }: Props) {
  return (
    <div className="flex flex-1">
      <Sidebar>
        <StudioLayoutSideMenu />
      </Sidebar>

      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
}
