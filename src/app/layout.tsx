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
      <body className="h-screen overflow-hidden">
        <Providers>
          <HeaderContainer />

          <div className="flex h-[calc(100vh-var(--spacing-header))]">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
