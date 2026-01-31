import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { cn } from '@/utils/cn';

interface Props {
  src?: string;
  alt?: string;
  size?: number;
  priority?: boolean;
  rounded?: boolean;
  title: string;
  subtext?: string;
  subtext2?: string;
  className?: string;
}

export const ARTWORK_FIXED_SIZE = 170;

export function Artwork({
  src,
  alt,
  size,
  priority,
  rounded,
  title,
  subtext,
  subtext2,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'rounded-md p-2 hover:bg-bg-elevated cursor-pointer',
        className,
      )}
    >
      <ArtworkImage
        src={src}
        alt={alt}
        size={size}
        priority={priority}
        rounded={rounded}
      />

      <div
        className="mt-2 space-y-1"
        style={size ? { width: size } : undefined}
      >
        <p className="truncate text-sm">{title}</p>
        {subtext && (
          <p className="truncate text-sm text-text-subtle">{subtext}</p>
        )}
        {subtext2 && (
          <p className="truncate text-sm text-text-subtle">{subtext2}</p>
        )}
      </div>
    </div>
  );
}
