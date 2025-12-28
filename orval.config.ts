import { defineConfig } from 'orval';

export default defineConfig({
  anycast: {
    input: './openapi.json',
    output: {
      mode: 'tags-split',
      target: './src/libs/api/generated',
      schemas: './src/libs/api/generated/schemas',
      client: 'react-query',
      httpClient: 'fetch',
      override: {
        mutator: {
          path: './src/libs/api/fetcher.ts',
          name: 'customFetcher',
        },
        query: {
          useQuery: true,
          useMutation: true,
          useSuspenseQuery: true,
        },
      },
    },
  },
});
