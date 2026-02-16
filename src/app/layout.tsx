import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Providers } from '@/features/app/providers/Providers';
import '@/styles/globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const viewport: Viewport = {
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Anycast',
    template: '%s | Anycast',
  },
  description: 'AI 音声生成ポッドキャストプラットフォーム',
  openGraph: {
    title: 'Anycast',
    description: 'AI 音声生成ポッドキャストプラットフォーム',
    siteName: 'Anycast',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anycast',
    description: 'AI 音声生成ポッドキャストプラットフォーム',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="h-screen overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
