var gulp    = require('gulp');
var $       = require('gulp-load-plugins')();
// Copy images to the "dist" folder
// In production, the images are compressed
module.exports = function(config) {

    gulp.task('images', function () {
        var imagemin = $.if(config.isProduction, $.imagemin({
            progressive: true
        }));

        return gulp.src(config.SOURCE.assets + '/img/**/*')
            .pipe(imagemin)
            .pipe(gulp.dest(config.TARGET.assets + '/img'))
    });

};
