var gulp    = require('gulp');
var $       = require('gulp-load-plugins')();

// Starts a test server, which you can view at http://localhost:8079
module.exports = function(config) {
    gulp.task('server', function() {
      gulp.src(config.SERVERROOT)
        .pipe($.webserver({
          port: config.PORT,
          host: 'localhost',
          fallback: 'index.html',
          livereload: true,
          open: true
        }));
    });

};
