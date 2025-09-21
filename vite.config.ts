import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        dev: true
      },
      // Enables <style lang="scss"> support
      preprocess: sveltePreprocess()
    }),
    basicSsl()
  ],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  },
  server: {
    // basicSsl plugin enables HTTPS; boolean here satisfies runtime, cast to any for TS
    https: true as any,
    port: 5173
  }
});
