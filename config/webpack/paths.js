'use strict';

const path = require('path');

const rootPath = process.cwd();
const resolveApp = path.resolve.bind(path, rootPath);

module.exports = {
  // Source files
  src: resolveApp('src'),
  // Production build files
  build: resolveApp('dist'),
  // Static files that get copied to build folder
  public: resolveApp('public'),
  root: path.join(__dirname, '../../'),
  appHtml: resolveApp('public/index.html')
}
