'use strict';
const gulp = require('gulp');

gulp.task('sync1', () => { console.log('我是一个同步任务'); });

gulp.task('sync2', () => { console.log('我是另一个同步任务'); });

gulp.task('sync3', () => { console.log('我是又一个同步任务'); });

gulp.task('async', (done) => {
  console.log('老大喊我去搬砖');
  setTimeout(() => {
    console.log('我是一个异步任务');
    done();
  }, 2000);
});

gulp.task('sync', [ 'async', 'sync1', 'sync2', 'sync3' ],
          () => { console.log('砖搬完了'); });
