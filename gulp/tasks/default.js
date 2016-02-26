var gulp = require('gulp');

// Build the site, run the server, and watch for file changes
module.exports = function(config) {
    gulp.task('default', ['server'], function () {
    gulp.watch(config.SOURCE.assets, ['copy']);
    gulp.watch(['src/assets/scss/**/{*.scss, *.sass}'], ['sass']);
    gulp.watch(['src/assets/js/**/*.js'], ['javascript']);
    gulp.watch(['src/assets/img/**/*'], ['images']);
    gulp.watch(['src/_*/*'], ['jekyll']);
})};
