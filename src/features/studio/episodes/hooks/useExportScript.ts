import { useState } from 'react';

import { downloadFile } from '@/libs/api/downloadFile';
import { getGetChannelsChannelIdEpisodesEpisodeIdScriptExportUrl } from '@/libs/api/generated/script/script';

/**
 * 台本をテキストファイルとしてエクスポートする
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @param episodeName - エピソード名（ファイル名に使用）
 * @returns エクスポート関数、ローディング状態、エラー
 */
export function useExportScript(
  channelId: string,
  episodeId: string,
  episodeName: string,
) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  /**
   * 台本をテキストファイルとしてダウンロードする
   */
  async function exportScript() {
    setIsExporting(true);
    setError(undefined);

    try {
      const url = getGetChannelsChannelIdEpisodesEpisodeIdScriptExportUrl(
        channelId,
        episodeId,
      );
      await downloadFile(url, `${episodeName}.txt`);
    } catch {
      setError('台本のエクスポートに失敗しました');
    } finally {
      setIsExporting(false);
    }
  }

  return {
    isExporting,
    error,

    exportScript,
  };
}
