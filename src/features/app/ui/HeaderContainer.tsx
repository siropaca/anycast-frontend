import { Header } from '@/features/app/ui/Header';
import { auth } from '@/libs/auth/auth';

/**
 * Header の Server Component ラッパー
 *
 * 認証状態を取得して Header に渡す
 */
export async function HeaderContainer() {
  const { isLoggedIn } = await auth();

  return <Header isLoggedIn={isLoggedIn} />;
}
