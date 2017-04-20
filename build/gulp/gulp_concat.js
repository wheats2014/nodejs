'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
gulp.task('concat', function() {
  gulp.src('./**/package.json')
      .pipe(sourcemaps.init())
      .pipe(concat('all_package.js'))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./allpackage'));
});

gulp.task('default', [ 'concat' ]);
