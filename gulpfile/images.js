import connect from 'gulp-connect';
import gulp from 'gulp';
import settings from './settings.js';

gulp.task('build:images', () => {
  gulp
    .src(`${settings.sourceFolder}/images/**/*.*`)
    .pipe(gulp.dest(`${settings.destinationFolder}/images/`))
    .pipe(connect.reload());
});

gulp.task('watch:images', () => {
  gulp.watch(`${settings.sourceFolder}/images/**/*.*`, ['build:images']);
});
