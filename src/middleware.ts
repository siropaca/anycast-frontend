import { auth } from '@/libs/auth/auth';
import { Pages } from '@/libs/pages';

export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL(Pages.login.path({ redirect: req.url }), req.url);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ['/library/:path*', '/studio/:path*', '/settings/:path*'],
};
