var gulp    = require('gulp');
var $       = require('gulp-load-plugins')();
// Combine JavaScript into one file
// In production, the file is minified
module.exports = function(config) {

    gulp.task('javascript', function () {
        var uglify = $.if(config.isProduction, $.uglify()
            .on('error', function (e) {
                console.log(e);
            }));

        return gulp.src(config.SOURCE.javascript)
            .pipe($.sourcemaps.init())
            .pipe($.concat('app.js'))
            .pipe(uglify)
            .pipe($.if(!config.isProduction, $.sourcemaps.write()))
            .pipe(gulp.dest(config.TARGET.assets + '/js'))
    });

};
