import { build } from "esbuild";
import pkg from 'npm-dts';
const { Generator } = pkg;

new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
}).generate();

const config = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true
};

build({
  ...config,
  outfile: 'dist/index.js',
  platform: 'neutral', // for ESM
  format: "esm"
});