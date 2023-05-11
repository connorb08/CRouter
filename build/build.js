import { build } from "esbuild";
import pkg from 'npm-dts';
const { Generator } = pkg;

new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
}).generate();

// const entryPoints = (await glob("./src/*.ts")).filter(e => !e.includes('CTypes.ts'));
// entryPoints = entryPoints
const config = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true
};

// build({
//   ...config,
//   platform: 'node', // for CJS
//   outfile: "dist/index.js",
//   outdir
// });

build({
  ...config,
  outfile: 'dist/index.js',
  platform: 'neutral', // for ESM
  format: "esm"
});