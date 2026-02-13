import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Pages } from '@/libs/pages';

/**
 * モバイルヘッダー検索の状態管理フック
 *
 * 検索オーバーレイの開閉と、デバウンス付き検索クエリのルーティングを行う。
 * `/explore` 以外のパスに遷移すると自動的にリセットされる。
 *
 * @returns 検索の状態と操作関数
 */
export function useMobileSearch() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!pathname.startsWith('/explore')) {
      setIsOpen(false);
      setQuery('');
      hasInteracted.current = false;
    }
  }, [pathname]);

  useEffect(() => {
    if (!hasInteracted.current) return;

    router.push(Pages.explore.path({ q: debouncedQuery || undefined }));
  }, [debouncedQuery, router]);

  /**
   * 検索オーバーレイを開き、探索ページに遷移する
   */
  function open() {
    setIsOpen(true);
    router.push(Pages.explore.path());
  }

  /**
   * 検索オーバーレイを閉じ、クエリをリセットする
   */
  function close() {
    setIsOpen(false);
    setQuery('');
    hasInteracted.current = false;
  }

  /**
   * 検索クエリを更新する
   *
   * @param value - 新しいクエリ文字列
   */
  function updateQuery(value: string) {
    hasInteracted.current = true;
    setQuery(value);
  }

  /**
   * 検索クエリをクリアし、探索ページのルートに遷移する
   */
  function clearQuery() {
    hasInteracted.current = true;
    setQuery('');
    router.push(Pages.explore.path());
  }

  return { isOpen, query, open, close, updateQuery, clearQuery };
}
