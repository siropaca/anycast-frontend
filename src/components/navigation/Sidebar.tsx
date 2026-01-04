interface Props {
  children: React.ReactNode;
}

// TODO: 仮コンポーネント
export function Sidebar({ children }: Props) {
  return (
    <aside className="w-sidebar shrink-0 overflow-y-auto border-r">
      {children}
    </aside>
  );
}
