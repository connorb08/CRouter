import { build } from "esbuild";
import glob from "tiny-glob";
import pkg from 'npm-dts';
const { Generator } = pkg;

new Generator({
  entry: 'src/CTypes.ts',
  output: 'dist/index.d.ts',
}).generate();

const entryPoints = (await glob("./src/*.ts")).filter(e => !e.includes('CTypes.ts'));
// entryPoints = entryPoints
const config = {
  entryPoints,
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
  outdir: "dist",
  platform: 'neutral', // for ESM
  format: "esm"
});