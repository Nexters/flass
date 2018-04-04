var fs = require('fs');

require.extensions['.png'] = function(module, filepath) {
  var src = fs.readFileSync(filepath).toString('base64');
  return module._compile(`module.exports = "data:image/png;base64,${src
  }";`);
};
