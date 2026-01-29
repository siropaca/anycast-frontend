'use client';

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/ssr';
import { cn } from '@/utils/cn';

interface Props {
  currentPage: number;
  totalPages: number;
  siblingsCount?: number;

  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  siblingsCount = 1,
  onPageChange,
}: Props) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = generatePageNumbers(currentPage, totalPages, siblingsCount);

  return (
    <nav aria-label="ページネーション" className="flex items-center gap-1">
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="前のページ"
      >
        <CaretLeftIcon size={16} />
      </PaginationButton>

      {pages.map((page, index) =>
        page === 'ellipsis' ? (
          <span
            key={index < pages.length / 2 ? 'ellipsis-left' : 'ellipsis-right'}
            className="flex size-8 items-center justify-center text-text-subtle"
          >
            …
          </span>
        ) : (
          <PaginationButton
            key={page}
            onClick={() => onPageChange(page)}
            isActive={page === currentPage}
            aria-label={`${page}ページ目`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </PaginationButton>
        ),
      )}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="次のページ"
      >
        <CaretRightIcon size={16} />
      </PaginationButton>
    </nav>
  );
}

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  'aria-label'?: string;
  'aria-current'?: 'page';
}

function PaginationButton({
  children,
  onClick,
  disabled = false,
  isActive = false,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex size-8 items-center justify-center rounded-md text-sm transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        isActive
          ? 'bg-primary text-white'
          : 'hover:bg-bg-hover text-text-subtle hover:text-text-main',
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

type PageItem = number | 'ellipsis';

/**
 * ページ番号の配列を生成する
 *
 * @param currentPage - 現在のページ
 * @param totalPages - 総ページ数
 * @param siblingsCount - 現在のページの左右に表示するページ数
 * @returns ページ番号と省略記号の配列
 *
 * @example
 * generatePageNumbers(5, 10, 1) // => [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
 */
function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  siblingsCount: number,
): PageItem[] {
  const totalPageNumbers = siblingsCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingsCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingsCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1,
    );
    return [1, 'ellipsis', ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i,
  );
  return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
}
