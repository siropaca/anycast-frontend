import { ButtonSkeleton } from '@/components/inputs/buttons/Button/ButtonSkeleton';

export function FooterSkeleton() {
  return (
    <div className="flex justify-end gap-3">
      <ButtonSkeleton width={100} />
      <ButtonSkeleton width={64} />
    </div>
  );
}
