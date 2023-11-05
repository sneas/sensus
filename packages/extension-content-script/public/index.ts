import { registerContentScript } from '../src';

registerContentScript({
  analyze: async (comment: string) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 5) + 1);
    }, 3000);
  }),
}).then();
