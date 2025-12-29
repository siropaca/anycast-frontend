'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Pages } from '@/libs/pages';

// TODO: 仮コンポーネント
export function HeaderSearchInput() {
  const router = useRouter();

  const [value, setValue] = useState('');

  const handleFocus = () => {
    router.push(Pages.explore.path({ q: value || undefined }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    router.push(Pages.explore.path({ q: newValue || undefined }));
  };

  return (
    <input
      type="text"
      placeholder="検索"
      className="border"
      value={value}
      onFocus={handleFocus}
      onChange={handleChange}
    />
  );
}
