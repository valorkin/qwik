import { BuildConfig, copyFile, emptyDir, mkdir, stat } from './util';
import { banner, fileSize, readdir, watcher } from './util';
import { build } from 'esbuild';
import { join } from 'path';

export async function buildCli(config: BuildConfig) {
  const distCliDir = join(config.distDir, 'cli');
  const outFile = join(distCliDir, 'index.js');
  emptyDir(distCliDir);

  await build({
    entryPoints: [join(config.srcDir, 'cli', 'index.ts')],
    outfile: outFile,
    bundle: true,
    sourcemap: false,
    target: 'node10',
    platform: 'node',
    minify: !config.dev,
    banner,
    watch: watcher(config),
  });

  const distStartersDir = join(distCliDir, 'starters');
  await copyDir(config.startersDir, distStartersDir);

  const srcCliDir = join(config.srcDir, 'cli');
  await copyFile(join(srcCliDir, 'package.json'), join(distCliDir, 'package.json'));
  await copyFile(join(srcCliDir, 'README.md'), join(distCliDir, 'README.md'));

  console.log('🐠 cli', await fileSize(outFile));
}

async function copyDir(srcDir: string, destDir: string) {
  await mkdir(destDir);
  const items = await readdir(srcDir);
  await Promise.all(
    items.map(async (itemName) => {
      if (!IGNORE[itemName]) {
        const srcPath = join(srcDir, itemName);
        const destPath = join(destDir, itemName);
        const itemStat = await stat(srcPath);
        if (itemStat.isDirectory()) {
          await copyDir(srcPath, destPath);
        } else if (itemStat.isFile()) {
          await copyFile(srcPath, destPath);
        }
      }
    })
  );
}

const IGNORE: { [path: string]: boolean } = {
  '.rollup.cache': true,
  build: true,
  node_modules: true,
  'package-lock.json': true,
  'tsconfig.tsbuildinfo': true,
};
