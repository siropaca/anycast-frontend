/**
 * 音源ファイルをダウンロードする
 *
 * クロスオリジンの署名付き URL はブラウザから直接ダウンロードできないため、
 * `/api/download` Route Handler を経由してプロキシダウンロードする。
 *
 * @param audioUrl - 音源の外部 URL
 * @param title - ダウンロード時のファイル名（拡張子なし）
 * @returns ダウンロード関数
 */
export function useDownloadTrack(
  audioUrl: string | undefined,
  title: string | undefined,
) {
  /**
   * 音源をダウンロードする
   */
  function downloadTrack() {
    if (!audioUrl) return;

    const filename = `${title ?? 'track'}.mp3`;
    const params = new URLSearchParams({
      url: audioUrl,
      filename,
    });

    const link = document.createElement('a');
    link.href = `/api/download?${params.toString()}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return { downloadTrack };
}
