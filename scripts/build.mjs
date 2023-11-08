import 'zx/globals';
import { rootDir } from './helpers/dirs.mjs';

cd(rootDir);

const packages = [
  'webpack',
  'backend',
  'extension-api',
  'extension-content-ui',
  'extension-content-script',
  'extension',
];

for (let packageName of packages) {
  console.log(`Building ${packageName}...`);
  await $`npm --prefix ./packages/${packageName} run build`;
}
