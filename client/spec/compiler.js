var hook = require('css-modules-require-hook');
var sass = require('node-sass');
var babel = require('babel-core/register');

function noop() {
  return null;
}

require.extensions['.png'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.css'] = noop;
