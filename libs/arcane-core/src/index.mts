/** @format */
import type { AstroIntegration } from 'astro';
import { readFileSync } from 'fs';

export default (): AstroIntegration => {
  return {
    name: '@arcane-web/arcane',
    hooks: {
      'astro:config:setup': async ({ injectScript }) => {
        injectScript(
          'head-inline',
          readFileSync(new URL('@arcane-core/arcane-core/service'), {
            encoding: 'utf-8',
          })
        );
      },
    },
  };
};
