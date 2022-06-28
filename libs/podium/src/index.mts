/** @format */

import type { AstroAdapter, AstroIntegration } from 'astro';

export function getAdapter(): AstroAdapter {
  return {
    name: '@arcane-web/podium',
    serverEntrypoint: '@arcane-web/podium/server.js',
    exports: ['handler'],
  };
}

export default function createIntegration(): AstroIntegration {
  return {
    name: '@arcane-web/podium',
    hooks: {
      'astro:config:done': ({ setAdapter }) => {
        setAdapter(getAdapter());
      },
    },
  };
}
