'use strict';
const gulp = require('gulp');

gulp.task('src-dist', () => { gulp.src('./**/*.md').pipe(gulp.dest('./md')); });

gulp.task('default', [ 'src-dist' ]);
