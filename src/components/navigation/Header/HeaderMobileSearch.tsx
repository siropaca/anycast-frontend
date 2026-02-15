'use client';

import { ArrowLeftIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { Input } from '@/components/inputs/Input/Input';
import { useMobileSearch } from '@/components/navigation/Header/useMobileSearch';

export function HeaderMobileSearch() {
  const { isOpen, query, open, close, updateQuery, clearQuery } =
    useMobileSearch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateQuery(e.target.value);
  }

  return (
    <>
      <IconButton
        icon={<MagnifyingGlassIcon size={20} />}
        aria-label="検索"
        variant="text"
        color="secondary"
        className="md:hidden"
        onClick={open}
      />

      {isOpen && (
        <div className="fixed inset-x-0 top-0 z-50 flex h-header-mobile items-center gap-2 bg-bg-main px-4 md:hidden">
          <IconButton
            icon={<ArrowLeftIcon size={20} />}
            aria-label="検索を閉じる"
            variant="text"
            color="secondary"
            onClick={close}
          />
          <Input
            type="text"
            placeholder="何を聴きたいですか？"
            autoFocus
            value={query}
            leftIcon={<MagnifyingGlassIcon />}
            clearable
            className="flex-1 rounded-full"
            onChange={handleChange}
            onClear={clearQuery}
          />
        </div>
      )}
    </>
  );
}
