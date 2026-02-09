import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ButtonSkeleton } from '@/components/inputs/buttons/Button/ButtonSkeleton';
import { InputSkeleton } from '@/components/inputs/Input/InputSkeleton';

export function UsernameSectionSkeleton() {
  return (
    <section className="space-y-4">
      <SectionTitle
        title="ユーザー名"
        description="プロフィールページの URL に使用されます"
        level="h3"
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <span className="block text-sm text-text-main">ユーザー名</span>
          <InputSkeleton className="w-full" />
        </div>

        <ButtonSkeleton width={140} />
      </div>
    </section>
  );
}
