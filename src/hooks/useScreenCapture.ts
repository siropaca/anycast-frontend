'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Screen Capture API を使ってスクリーンショットを取得するカスタムフック
 *
 * @returns スクリーンショットの状態と操作関数
 */
export function useScreenCapture() {
  const [screenshot, setScreenshot] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const previewUrlRef = useRef<string | null>(null);

  function revokePreviewUrl() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: revokePreviewUrl は ref のみ参照するため再生成不要
  useEffect(() => {
    return () => {
      revokePreviewUrl();
    };
  }, []);

  async function capture() {
    setIsCapturing(true);

    let stream: MediaStream | null = null;

    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        // @ts-expect-error -- preferCurrentTab は Chrome 94+ で対応、型定義未反映
        preferCurrentTab: true,
      });

      const blob = await captureFrame(stream);

      revokePreviewUrl();

      const url = URL.createObjectURL(blob);
      previewUrlRef.current = url;

      setScreenshot(blob);
      setPreviewUrl(url);
    } catch {
      // ユーザーがキャンセルした場合など — 何もしない
    } finally {
      if (stream) {
        for (const track of stream.getTracks()) {
          track.stop();
        }
      }
      setIsCapturing(false);
    }
  }

  function clear() {
    revokePreviewUrl();
    setScreenshot(null);
    setPreviewUrl(null);
  }

  return {
    screenshot,
    previewUrl,
    isCapturing,

    capture,
    clear,
  };
}

/**
 * MediaStream の video トラックから canvas 経由で 1 フレームを PNG Blob として取得する
 *
 * @param stream - getDisplayMedia で取得した MediaStream
 * @returns PNG 形式の Blob
 */
function captureFrame(stream: MediaStream): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas 2d context'));
        return;
      }

      ctx.drawImage(video, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob from canvas'));
        }
      }, 'image/png');
    };
  });
}
