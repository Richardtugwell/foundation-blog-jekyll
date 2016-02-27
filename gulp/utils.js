var wrench    = require('wrench');

var files =  function(root, tasks, config) {
    wrench.readdirSyncRecursive(root).filter(function(file) {
      return (/\.(js|coffee)$/i).test(file);
    }).map(function(file) {
      require(tasks + '/' + file)(config);
    });
};

module.exports = {
    files: files
};
