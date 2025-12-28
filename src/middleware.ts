import { auth } from '@/libs/auth/auth';
import { Paths } from '@/libs/paths';

export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL(Paths.login({ redirect: req.url }), req.url);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ['/studio/:path*', '/settings/:path*'],
};
