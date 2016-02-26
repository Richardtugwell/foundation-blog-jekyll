var gulp = require('gulp');
var exec = require('child_process').exec;

// Run Jekyll build
module.exports = function(config) {
    gulp.task('jekyll', function () {
        exec('jekyll build')
    })
};
