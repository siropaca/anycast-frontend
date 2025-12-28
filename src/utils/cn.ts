import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * クラス名を結合し、Tailwind CSS のクラス競合を解決する
 *
 * @param inputs - 結合するクラス名（文字列、オブジェクト、配列など）
 * @returns 結合・最適化されたクラス名文字列
 *
 * @example
 * cn('px-2', 'px-4') // => 'px-4'
 * cn('text-red-500', isActive && 'text-blue-500') // => 条件に応じたクラス
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
