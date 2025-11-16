import { existsSync, rmSync } from 'fs';
import { resolve, join } from 'path';

const buildDir = resolve('build');

// Remove the _app directory
const appDir = join(buildDir, '_app');
if (existsSync(appDir)) {
  rmSync(appDir, { recursive: true, force: true });
  console.log('✓ Removed build/_app');
}

console.log('✓ Post-build complete');
