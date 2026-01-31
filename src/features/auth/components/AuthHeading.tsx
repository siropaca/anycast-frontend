interface Props {
  subtitle: string;
}

export function AuthHeading({ subtitle }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-2xl font-bold text-primary">Anycast</h1>
      <p className="text-sm text-text-subtle">{subtitle}</p>
    </div>
  );
}
