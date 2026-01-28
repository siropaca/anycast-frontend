import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { cn } from '@/utils/cn';

interface Props {
  src?: string;
  alt?: string;
  size?: number;
  title: string;
  subtext?: string;
  className?: string;
}

export function Artwork({
  src,
  alt,
  size = 170,
  title,
  subtext,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'rounded-md p-4 hover:bg-bg-elevated cursor-pointer',
        className,
      )}
    >
      <ArtworkImage src={src} alt={alt} size={size} />

      <div className="mt-2" style={{ width: size }}>
        <p className="truncate text-sm font-medium">{title}</p>
        {subtext && (
          <p className="truncate text-sm text-text-subtle">{subtext}</p>
        )}
      </div>
    </div>
  );
}
