import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    browser: 'src/index.ts',
  },
  format: ['cjs', 'esm'],
  target: 'esnext',
  outDir: 'dist',
  platform: 'neutral',
  splitting: false,
  shims: true,
  external: ['node:crypto'],
});
