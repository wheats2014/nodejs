var gulp = require('gulp');
var less = require('gulp-less');
var css = require('gulp-mini-css');
gulp.task('less', () => {
  gulp.src('less/test.less')
      .pipe(less())
      .pipe(css({ext : '-min.css'}))
      .pipe(gulp.dest('css/'));
});

gulp.task('default', [ 'less' ]);
