/* eslint sort-imports: off */
import gulp from 'gulp';
import './gulpfile/scripts.js';
import './gulpfile/html.js';
import './gulpfile/styles.js';
import './gulpfile/images.js';
import './gulpfile/serve.js';
import './gulpfile/test.js';

gulp.task('build', [
  'build:scripts',
  'build:scripts-externals',
  // 'build:scripts-lint',
  'build:html',
  'build:styles',
  // 'build:images',
  // 'build:test'
]);

gulp.task('watch', [
  'watch:scripts',
  // 'watch:scripts-lint',
  'watch:html',
  'watch:styles',
  // 'watch:images',
  // 'watch:test'
]);

gulp.task('default', ['build', 'serve', 'watch']);
