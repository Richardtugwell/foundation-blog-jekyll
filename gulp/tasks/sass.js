var gulp    = require('gulp');
var $       = require('gulp-load-plugins')();
// Compile Sass into CSS
// In production, the CSS is compressed
module.exports = function(config) {

    gulp.task('sass', function () {
        var uncss = $.if(config.isProduction, $.uncss({
            html: ['src/**/*.html'],
            ignore: [
                new RegExp('.foundation-mq'),
                new RegExp('^\.is-.*')
            ]
        }));

        var minifycss = $.if(config.isProduction, $.minifyCss());

        return gulp.src(config.SOURCE.scssApp)
            .pipe($.sourcemaps.init())
            .pipe($.sass({
                    includePaths: config.SOURCE.sass
                })
                .on('error', $.sass.logError))
            .pipe($.autoprefixer({
                browsers: config.COMPATIBILITY
            }))
            .pipe(uncss)
            .pipe(minifycss)
            .pipe($.if(!config.isProduction, $.sourcemaps.write()))
            .pipe(gulp.dest(config.TARGET.assets + '/css'))
    });

};
