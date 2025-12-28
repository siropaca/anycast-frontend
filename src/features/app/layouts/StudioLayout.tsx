import { Sidebar } from '@/features/app/ui/Sidebar';

interface Props {
  children: React.ReactNode;
}

export function StudioLayout({ children }: Props) {
  return (
    <div className="flex flex-1">
      <Sidebar>
        <nav className="p-4">Studio Sidebar</nav>
      </Sidebar>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
