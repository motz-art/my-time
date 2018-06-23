import LessAutoprefix from 'less-plugin-autoprefix';
import cleanCss from 'gulp-clean-css';
import connect from 'gulp-connect';
import gulp from 'gulp';
import handleError from './handle-error.js';
import less from 'gulp-less';
import settings from './settings.js';

const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('build:styles', () => {
  gulp
    .src(`${settings.sourceFolder}/index.less`)
    .pipe(
      less({
        paths: [`${settings.sourceFolder}/index.less`],
        plugins: [autoprefix]
      })
    )
    .on('error', handleError)
    .pipe(cleanCss())
    .pipe(gulp.dest(settings.destinationFolder))
    .pipe(connect.reload());
});

gulp.task('watch:styles', () => {
  gulp.watch(
    [`${settings.sourceFolder}/**/*.less`, './bower_components/bootstrap/**/*.less'],
    ['build:styles']
  );
});
