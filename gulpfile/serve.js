import connect from 'gulp-connect';
import gulp from 'gulp';
import settings from './settings.js';

gulp.task('serve:project', () => {
  connect.server({
    root: settings.destinationFolder,
    port: 8000,
    index: 'index.html',
    livereload: true
  });
});

gulp.task('serve', ['serve:project']);
