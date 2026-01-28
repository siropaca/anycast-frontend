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

export const ARTWORK_FIXED_SIZE = 170;

export function Artwork({ src, alt, size, title, subtext, className }: Props) {
  return (
    <div
      className={cn(
        'rounded-md p-2 hover:bg-bg-elevated cursor-pointer',
        className,
      )}
    >
      <ArtworkImage src={src} alt={alt} size={size} />

      <div className="mt-2" style={size ? { width: size } : undefined}>
        <p className="truncate text-sm font-medium">{title}</p>
        {subtext && (
          <p className="truncate text-sm text-text-subtle">{subtext}</p>
        )}
      </div>
    </div>
  );
}
