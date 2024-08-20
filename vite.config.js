import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      svgr(),
      createHtmlPlugin({ minify: true, inject: { data: { kakaoJSKey: env.VITE_KAKAO_JS_KEY } } }),
    ],
    server: {
      port: 3000,
    },
    test: {
      environment: 'jsdom',
    },
  };
});
