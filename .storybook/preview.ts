import { definePreview } from '@storybook/nextjs-vite';

import '@/styles/globals.css';

export default definePreview({
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
});
