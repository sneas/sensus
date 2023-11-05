import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

type ConfigOptions = {
  buildDir: string;
};

export const buildConfig = ({ buildDir }: ConfigOptions): Config => ({
  namespace: 'extension-content-ui',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      dir: buildDir,
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [sass()],
  devServer: {
    port: 8010,
  },
});
