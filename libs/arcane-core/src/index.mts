/** @format */
import type { AstroIntegration } from 'astro';
import { readFileSync } from 'node:fs';

export default (): AstroIntegration => {
  return {
    name: '@arcane-web/arcane',
    hooks: {
      'astro:config:setup': async ({ injectScript }) => {
        injectScript(
          'head-inline',
          readFileSync(
            new URL('./service/service-worker.mjs', import.meta.url),
            {
              encoding: 'utf-8',
            }
          )
        );
      },
    },
  };
};
