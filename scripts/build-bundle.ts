import { clean, load } from 'clean-package';
import fs from 'fs-extra';
import { resolve } from 'path';

const packagePath = resolve(__dirname, '../package.json');
const packageBundlePath = resolve(__dirname, '../dist/package.json');
const bundlePath = resolve(__dirname, '../dist');

const moveFiles = async () => {
  await fs.copy(packagePath, packageBundlePath, { overwrite: true });

  const [source, config] = load(packageBundlePath, {
    remove: ['devDependencies', 'scripts', 'prettier'],
    replace: {
      main: 'cjs/index.js',
      module: 'mjs/index.js',
      types: 'mjs/index.d.ts',
      files: ['*'],
    },
  });
  clean(source, config);
  await fs.remove(resolve(bundlePath, 'package.json.backup'));
};

moveFiles();
