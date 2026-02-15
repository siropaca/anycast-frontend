import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { cn } from '@/utils/cn';

interface Props {
  src?: string;
  alt?: string;
  size?: number;
  priority?: boolean;
  rounded?: boolean;
  isPlaying?: boolean;
  title: string;
  subtext?: string;
  subtext2?: string;
  className?: string;

  onPlayClick?: () => void;
}

export const ARTWORK_FIXED_SIZE = 170;

export function Artwork({
  src,
  alt,
  size,
  priority,
  rounded,
  isPlaying,
  title,
  subtext,
  subtext2,
  className,
  onPlayClick,
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
        isPlaying={isPlaying}
        onPlayClick={onPlayClick}
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
