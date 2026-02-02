import { ChatDotsIcon } from '@phosphor-icons/react';
import type { MenuSection } from '@/components/navigation/SideMenu/SideMenu';

/**
 * フィードバック送信ボタンのメニューセクションを生成する
 *
 * @param onFeedbackClick - フィードバックボタンのクリックハンドラー
 * @returns フィードバックメニューセクション
 */
export function createFeedbackSection(
  onFeedbackClick: () => void,
): MenuSection {
  return {
    items: [
      {
        label: 'フィードバックを送信',
        icon: ChatDotsIcon,
        onClick: onFeedbackClick,
      },
    ],
  };
}
