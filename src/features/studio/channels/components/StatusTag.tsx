import { Tag } from '@/components/dataDisplay/Tag/Tag';

interface Props {
  isPublished: boolean;
}

export function StatusTag({ isPublished }: Props) {
  return (
    <Tag
      label={isPublished ? '公開中' : '下書き'}
      color={isPublished ? 'green' : 'gray'}
    />
  );
}
