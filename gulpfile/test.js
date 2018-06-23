import gulp from 'gulp';
import handleError from './handle-error.js';
import mocha from 'gulp-mocha';
import settings from './settings.js';

gulp.task('build:test', () =>
  gulp
    .src(`${settings.sourceFolder}/**/*.test.js`)
    .pipe(
      mocha({
        reporter: 'dot',
        require: 'babel-core/register'
      })
    )
    .on('error', error => handleError(error))
);

gulp.task('watch:test', () =>
  gulp.watch(`${settings.sourceFolder}/**/*.js`, ['build:test'])
);
