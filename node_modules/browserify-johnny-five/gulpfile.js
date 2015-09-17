'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('default', function() {
  gulp.start('build');
});

gulp.task('build', function() {
  gulp.src('browserify-johnny-five.js')
    .pipe(browserify({
      ignore: ['board-io', 'debug']
    }))
    .pipe(gulp.dest('./build'));
});
