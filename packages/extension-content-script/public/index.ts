import { registerContentScript } from '../src';

registerContentScript({
  analyze: async (comment: string) => new Promise((resolve) => {
    setTimeout(() => {
      const score = Math.floor(Math.random() * 5) + 1;
      console.log('score', score);
      resolve({
        status: 'success',
        value: {
          politeness: score,
          agreeableness: score,
          usefulness: score,
          averageScore: score,
        }
      });
    }, 3000);
  }),
}).then();
