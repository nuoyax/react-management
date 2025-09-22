import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.VITE_GITHUB_PAGES_URL,
    plugins: [
      react(),
      tailwindcss(),
      svgr(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        semicolons: true,
        quoteStyle: 'single',
        routeFileIgnorePattern: '.?(api|constant|component|hook|service|store|type|util)s?(.tsx?)?$',
      }),
      {
        name: 'version-generator',
        apply: 'build',
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'version.json',
            source: JSON.stringify({ version: `${Date.now()}` }),
          });
        },
      },
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 9000,
      open: true,
    },
    build: {
      minify: 'terser',
      rollupOptions: {
        output: {
          compact: true,
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks: {
            react: [
              'react',
              'react-dom',
              'react-hook-form',
              '@tanstack/react-router',
              '@tanstack/react-query',
              'jotai',
            ],
            mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
            // vendor: ["dayjs"],
            echarts: ['echarts'],
          },
        },
      },
    },
  };
});
