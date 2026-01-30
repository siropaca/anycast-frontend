interface RefreshResult {
  accessToken: string;
  refreshToken: string;
}

/**
 * リフレッシュトークンを使って新しいトークンペアを取得する
 *
 * @param refreshToken - 現在のリフレッシュトークン
 * @returns 新しいアクセストークンとリフレッシュトークン
 * @throws リフレッシュに失敗した場合
 */
async function refreshAccessToken(
  refreshToken: string,
): Promise<RefreshResult> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    },
  );

  if (!response.ok) {
    throw new Error(`Refresh failed: ${response.status}`);
  }

  const json = (await response.json()) as {
    data: { accessToken: string; refreshToken: string };
  };

  return {
    accessToken: json.data.accessToken,
    refreshToken: json.data.refreshToken,
  };
}

/** 並行リクエストによる重複リフレッシュを防止するキャッシュ */
let pendingRefresh: Promise<RefreshResult> | null = null;

/**
 * Promise ベースの重複排除付きリフレッシュ
 *
 * @param refreshToken - 現在のリフレッシュトークン
 * @returns 新しいトークンペア
 */
export async function deduplicatedRefresh(
  refreshToken: string,
): Promise<RefreshResult> {
  if (pendingRefresh) return pendingRefresh;

  pendingRefresh = refreshAccessToken(refreshToken).finally(() => {
    pendingRefresh = null;
  });

  return pendingRefresh;
}
