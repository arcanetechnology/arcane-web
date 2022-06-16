/** @format */
import type { AstroIntegration } from 'astro';

export default (): AstroIntegration => {
  return {
    name: '@arcane-web/arcane',
    hooks: {
      'astro:config:setup': async ({ injectScript }) => {
        injectScript('head-inline', `console.log("hello world")`);
      },
    },
  };
};
