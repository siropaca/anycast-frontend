import { Header } from '@/components/navigation/Header';
import { auth } from '@/libs/auth/auth';

export async function HeaderContainer() {
  const { isLoggedIn } = await auth();

  return <Header isLoggedIn={isLoggedIn} />;
}
