import 'zx/globals';
import { packagesDir, rootDir } from './helpers/dirs.mjs';

const zipFileName = `latest.zip`;
const zipPath = `${rootDir}/${zipFileName}`;

cd(`${packagesDir}/extension/dist`);
await $`zip -9 -y -r -q "${zipPath}" .`;
