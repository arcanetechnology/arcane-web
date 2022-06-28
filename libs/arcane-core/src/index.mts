/** @format */
import type { AstroIntegration } from 'astro';

export default (): AstroIntegration => {
  return {
    name: '@arcane-web/arcane',
    hooks: {
      'astro:config:setup': async ({ injectScript }) => {
        injectScript('head-inline', '');
      },
    },
  };
};

// TODO:
// Service worker will pop out the login page
// service worker will show the platform registration => needs to know where is the platform registration app.
// service worker will run the platform registration => needs a mechanism to run an app
// service worker will redirect to app registration => needs to know where is the app registration app.
// service worker will open the app registration. => needs a mechanism to run an app.

// Registration page should listen to messages and run
