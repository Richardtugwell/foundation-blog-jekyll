var wrench  = require('wrench');
var $           = require('gulp-load-plugins')();
var argv        = require('yargs').argv;
var gulp        = require('gulp');
var sequence    = require('run-sequence');

// Check for --production flag
var isProduction = !!(argv.production);

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// File paths to various assets are defined here.
var SOURCE = {
    assets: [
        'src/assets/**/*',
        '!src/assets/{img,js,scss}/**/*'
    ],
    scssApp: 'src/assets/scss/app.scss',
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

// File paths to WATCH.
var WATCH = {
    sass: [
        'src/assets/scss/**/{*.scss, *.sass}'
    ],
    javascript: [
        'src/assets/js/**/*.js'
    ],
    images: [
        'src/assets/img/**/*'
    ],
    jekyll: [
        'src/_*/*'
    ]
}

// File paths to various targets.
var TARGET = {
    assets: 'dist/assets',
}

// Config - gets passed to all tasks.
var config = {
    isProduction: isProduction,
    COMPATIBILITY: COMPATIBILITY,
    WATCH: WATCH,
    SOURCE: SOURCE,
    TARGET: TARGET
};

wrench.readdirSyncRecursive('./gulp/tasks').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/tasks/' + file)(config);
});

// Build the "dist" folder by running all of the above tasks
gulp.task('build', ['sass', 'javascript', 'images', 'copy', 'jekyll'] );

gulp.task('default',  function () {
    sequence('clean', 'build', 'server');
    gulp.watch(config.SOURCE.assets, ['copy']);
    gulp.watch(config.WATCH.sass, ['sass']);
    gulp.watch(config.WATCH.javascript, ['javascript']);
    gulp.watch(config.WATCH.images, ['images']);
    gulp.watch(config.WATCH.jekyll, ['jekyll']);
})
