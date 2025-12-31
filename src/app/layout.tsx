import type { Metadata } from 'next';
import { HeaderContainer } from '@/features/app/components/HeaderContainer';
import { Providers } from '@/features/app/providers/Providers';
import '@/styles/globals.css';

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
    <html lang="ja">
      <body className="flex min-h-screen flex-col">
        <Providers>
          <HeaderContainer />
          <div className="flex flex-1 flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
