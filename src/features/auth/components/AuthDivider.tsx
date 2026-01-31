export function AuthDivider() {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs text-text-placeholder">または</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
