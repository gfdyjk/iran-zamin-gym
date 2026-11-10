import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Preview sandbox support.
 *
 * The Base44 sandbox serves the dev server through a proxy, so the request's
 * Host header is not `localhost` and the origin is the public preview host.
 * Both are environment specific, therefore they are read from the environment
 * and only applied when BASE44_PREVIEW_MODE is exactly "1". With the flag unset
 * (normal local development / production build) nothing here changes.
 */
const previewMode = process.env.BASE44_PREVIEW_MODE === '1';

const allowedHosts = previewMode
  ? [
      process.env.BASE44_PUBLIC_HOST_SUFFIX,
      process.env.BASE44_SANDBOX_HOST_DOMAIN ? `.${process.env.BASE44_SANDBOX_HOST_DOMAIN}` : undefined,
      process.env.BASE44_PUBLIC_HOST_SUFFIX ? `.${process.env.BASE44_PUBLIC_HOST_SUFFIX}` : undefined,
    ].filter((host): host is string => Boolean(host))
  : undefined;

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    ...(allowedHosts && allowedHosts.length > 0 ? { allowedHosts } : {}),
    // Bind mounts in containers frequently miss inotify events.
    watch: { usePolling: previewMode },
    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET ?? 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
  },
});
