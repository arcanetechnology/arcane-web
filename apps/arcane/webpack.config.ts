/** @format */

import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'development',
  target: 'node',
  entry: {
    server: './server.ts',
    prerender: './prerender.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: [
      'web.ts',
      'ts',
      'web.tsx',
      'tsx',
      'json',
      'web.jsx',
      'js',
      'jsx',
      'web.js',
      'web.jsx',
    ],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: 'arcane',
      library: { type: 'commonjs-module' },
      filename: 'arcane.js',
    }),
  ],
};

export default config;
