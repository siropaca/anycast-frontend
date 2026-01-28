'use client';

import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/inputs/Input/Input';
import { Pages } from '@/libs/pages';

export function HeaderSearchInput() {
  const router = useRouter();

  const [value, setValue] = useState('');

  function handleFocus() {
    router.push(Pages.explore.path({ q: value || undefined }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);
    router.push(Pages.explore.path({ q: newValue || undefined }));
  }

  function handleClear() {
    setValue('');
    router.push(Pages.explore.path());
  }

  return (
    <Input
      type="text"
      placeholder="何を聴きたいですか？"
      value={value}
      leftIcon={<MagnifyingGlassIcon />}
      clearable
      className="w-90 rounded-full"
      onFocus={handleFocus}
      onChange={handleChange}
      onClear={handleClear}
    />
  );
}
