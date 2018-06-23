import connect from 'gulp-connect';
import gulp from 'gulp';
import settings from './settings.js';

gulp.task('build:html', () => {
  gulp
    .src([`${settings.sourceFolder}/index.html`])
    .pipe(gulp.dest(settings.destinationFolder))
    .pipe(connect.reload());
});

gulp.task('watch:html', () => {
  gulp.watch([`${settings.sourceFolder}/index.html`], ['build:html']);
});
