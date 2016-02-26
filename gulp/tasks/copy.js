var gulp = require('gulp');

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
module.exports = function(config) {
    gulp.task('copy', function () {
        return gulp.src(config.SOURCE.assets)
            .pipe(gulp.dest(config.TARGET.assets));
    })
};
