/** @format */

import { defineConfig } from 'vite';
import solid from 'solid-start';
import solidStatic from 'solid-start-static';
import AutoImport from 'unplugin-auto-import/vite';
import { VitePWA } from 'vite-plugin-pwa';
import type { VitePWAOptions } from 'vite-plugin-pwa';
import importToCDN from 'vite-plugin-cdn-import';

const pwaOptions: Partial<VitePWAOptions> = {
  base: '/',
  includeAssets: ['favicon.ico', 'robots.txt'],
  manifest: {
    name: 'Arcane Crypto',
    short_name: 'Arcane',
    description: '',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
};

export default defineConfig({
  plugins: [
    solid({
      adapter: solidStatic(),
    }),
    AutoImport({
      imports: [
        'solid-app-router',
        'solid-js',
        {
          '@solid-primitives/i18n': ['useI18n', 'createI18nContext'],
          'solid-meta': ['Title'],
          'solid-transition-group': ['Transition', 'TransitionGroup'],
          '@solid-primitives/storage': ['createCookieStorage'],
        },
      ],
    }),
    VitePWA(pwaOptions),
  ],

  //@ts-ignore
  ssr: {
    noExternal: ['solid-app-router'],
  },
  build: {
    target: 'esnext',
    polyfillModulePreload: true,
    rollupOptions: {
      inlineDynamicImports: true,
    },
  },
});

// TODO: make Solid and Web globally available so other apps can use them as global dependency.
// TODO: segregate solid server side and client side code.
