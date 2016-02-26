var wrench  = require('wrench');
var $           = require('gulp-load-plugins')();
var argv        = require('yargs').argv;
var gulp        = require('gulp');
var exec        = require('child_process').exec;
var del         = require('del');
var sequence    = require('run-sequence');

// Check for --production flag
var isProduction = !!(argv.production);

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// File paths to various assets are defined here.
var PATHS = {
    assets: [
        'src/assets/**/*',
        '!src/assets/{img,js,scss}/**/*'
    ],
    sass: [
        'bower_components/foundation-sites/scss',
        'bower_components/motion-ui/src/'
    ],
    javascript: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/what-input/what-input.js',
        'bower_components/foundation-sites/js/foundation.core.js',
        'bower_components/foundation-sites/js/foundation.util.*.js',
        // Paths to individual JS components defined below
        'bower_components/foundation-sites/js/foundation.abide.js',
        'bower_components/foundation-sites/js/foundation.accordion.js',
        'bower_components/foundation-sites/js/foundation.accordionMenu.js',
        'bower_components/foundation-sites/js/foundation.drilldown.js',
        'bower_components/foundation-sites/js/foundation.dropdown.js',
        'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
        'bower_components/foundation-sites/js/foundation.equalizer.js',
        'bower_components/foundation-sites/js/foundation.interchange.js',
        'bower_components/foundation-sites/js/foundation.magellan.js',
        'bower_components/foundation-sites/js/foundation.offcanvas.js',
        'bower_components/foundation-sites/js/foundation.orbit.js',
        'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
        'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
        'bower_components/foundation-sites/js/foundation.reveal.js',
        'bower_components/foundation-sites/js/foundation.slider.js',
        'bower_components/foundation-sites/js/foundation.sticky.js',
        'bower_components/foundation-sites/js/foundation.tabs.js',
        'bower_components/foundation-sites/js/foundation.toggler.js',
        'bower_components/foundation-sites/js/foundation.tooltip.js',
        'src/assets/js/**/!(app).js',
        'src/assets/js/app.js'
    ]
};

var config = {
    PATHS: PATHS
};

wrench.readdirSyncRecursive('./gulp/tasks').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/tasks/' + file)(config);
});

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function (done) {
    return del(
        PATHS.assets
    );
});

// Run Jekyll build
gulp.task('jekyll', function (done) {
    exec('jekyll build', function () {
        done();
    })
});

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
gulp.task('copy', function () {
    return gulp.src(PATHS.assets)
        .pipe(gulp.dest('dist/assets'));
});

// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function () {
    var uncss = $.if(isProduction, $.uncss({
        html: ['src/**/*.html'],
        ignore: [
            new RegExp('.foundation-mq'),
            new RegExp('^\.is-.*')
        ]
    }));

    var minifycss = $.if(isProduction, $.minifyCss());

    return gulp.src('src/assets/scss/app.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
                includePaths: PATHS.sass
            })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: COMPATIBILITY
        }))
        .pipe(uncss)
        .pipe(minifycss)
        .pipe($.if(!isProduction, $.sourcemaps.write()))
        .pipe(gulp.dest('dist/assets/css'))
});

// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function () {
    var uglify = $.if(isProduction, $.uglify()
        .on('error', function (e) {
            console.log(e);
        }));

    return gulp.src(PATHS.javascript)
        .pipe($.sourcemaps.init())
        .pipe($.concat('app.js'))
        .pipe(uglify)
        .pipe($.if(!isProduction, $.sourcemaps.write()))
        .pipe(gulp.dest('dist/assets/js'))
});

// Copy images to the "dist" folder
// In production, the images are compressed
gulp.task('images', function () {
    var imagemin = $.if(isProduction, $.imagemin({
        progressive: true
    }));

    return gulp.src('src/assets/img/**/*')
        .pipe(imagemin)
        .pipe(gulp.dest('dist/assets/img'))
});

// Build the "dist" folder by running all of the above tasks
gulp.task('build', function (done) {
    sequence('clean', ['sass', 'javascript', 'images', 'copy', 'jekyll'], done);
});

// Starts a test server, which you can view at http://localhost:8079
gulp.task('server', ['build'], function() {
  gulp.src('./dist')
    .pipe($.webserver({
      port: 8079,
      host: 'localhost',
      fallback: 'index.html',
      livereload: true,
      open: true
    }))
  ;
});
