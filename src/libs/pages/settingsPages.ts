export const settingsPages = {
  /** 設定トップ（-> アカウント） */
  index: {
    path: () => '/settings',
    title: '設定',
  },
  /** アカウント */
  account: {
    path: () => '/settings/account',
    title: 'アカウント',
  },
  /** サブスクリプション */
  subscription: {
    path: () => '/settings/subscription',
    title: 'サブスクリプション',
  },
} as const;
