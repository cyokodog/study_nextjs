import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'blog-sample-nextjs',
  apiKey: process.env.API_KEY as string,
});
