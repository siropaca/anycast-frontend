import { type NextRequest, NextResponse } from 'next/server';

/**
 * 外部 URL のファイルをプロキシしてダウンロードさせる Route Handler
 *
 * クロスオリジンの署名付き URL は `<a download>` が効かないため、
 * サーバーサイドで fetch してレスポンスをそのまま返す。
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'url is required' }, { status: 400 });
  }

  const response = await fetch(url);

  if (!response.ok) {
    return NextResponse.json(
      { error: `Upstream error: ${response.status}` },
      { status: response.status },
    );
  }

  const contentType = response.headers.get('Content-Type') ?? 'audio/mpeg';
  const filename =
    request.nextUrl.searchParams.get('filename') ?? 'download.mp3';

  return new NextResponse(response.body, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
    },
  });
}
