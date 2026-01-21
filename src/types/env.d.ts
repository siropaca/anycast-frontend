declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_GOOGLE_CLIENT_ID: string;
      AUTH_GOOGLE_CLIENT_SECRET: string;
      NEXT_PUBLIC_BACKEND_URL: string;
    }
  }
}
