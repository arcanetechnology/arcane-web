/** @format */

const path = require('path');

module.exports = {
  stories: ['../src/stories/**/*.stories.js'],
  logLevel: 'debug',
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',

    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
  ],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: [/\.stories\.js$/],
      use: [require.resolve('@storybook/source-loader')],
      include: [path.resolve(__dirname, '../src')],
      enforce: 'pre',
    });
    return config;
  },
  core: {
    builder: 'webpack4',
  },
};
