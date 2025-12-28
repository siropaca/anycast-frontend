interface Props {
  children: React.ReactNode;
}

export function Sidebar({ children }: Props) {
  return <aside className="w-sidebar shrink-0 border-r">{children}</aside>;
}
