/** @format */

'use strict';
/** @format */
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var path_1 = __importDefault(require('path'));
var static_1 = __importDefault(require('solid-ssr/static'));
var pages = ['index', 'home', 'auth', 'error'];
var entry = path_1['default'].resolve(
  __dirname,
  '../dist/public/js/ssg/server.main.js'
);
var file = path_1['default'].resolve(__dirname, '../dist/public');
(0, static_1['default'])(
  pages.map(function (p) {
    return {
      entry: entry,
      output: path_1['default'].join(file, ''.concat(p, '.html')),
      url: p === 'index' ? '/' : '/'.concat(p),
    };
  })
);
