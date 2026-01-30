import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Providers } from '@/features/app/providers/Providers';
import '@/styles/globals.css';

const lineSeedJP = localFont({
  src: [
    { path: '../fonts/LINESeedJP-Thin.woff2', weight: '100' },
    { path: '../fonts/LINESeedJP-Regular.woff2', weight: '400' },
    { path: '../fonts/LINESeedJP-Bold.woff2', weight: '700' },
    { path: '../fonts/LINESeedJP-ExtraBold.woff2', weight: '800' },
  ],
  display: 'swap',
  variable: '--font-line-seed-jp',
});

export const metadata: Metadata = {
  title: {
    default: 'Anycast',
    template: '%s | Anycast',
  },
  description: 'AI 音声生成ポッドキャストプラットフォーム',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={lineSeedJP.variable}>
      <body className="h-screen overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
