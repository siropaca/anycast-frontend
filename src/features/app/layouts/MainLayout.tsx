import { Sidebar } from '@/features/app/ui/Sidebar';

interface Props {
  children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
  return (
    <div className="flex flex-1">
      <Sidebar>
        <nav className="p-4">Sidebar</nav>
      </Sidebar>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
