interface Props {
  children: React.ReactNode;
}

export function ArtworkGrid({ children }: Props) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {children}
    </div>
  );
}
