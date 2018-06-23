/* global __dirname */
/* eslint sort-imports: off */
import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import util from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import connect from 'gulp-connect';
import eslint from 'gulp-eslint';
import notifier from 'node-notifier';
import stringify from 'stringify';
import handleError from './handle-error.js';
import settings from './settings.js';
import uglify from 'gulp-uglify';
import envify from 'envify/custom';
import gulpIf from 'gulp-if';

const externals = {
  vendor: []
};

const browserifyOpts = {
  basedir: '.',
  cache: {},
  packageCache: {},
  debug: true
};

var externalFiles = Array.prototype.concat.apply(
  [],
  Object.keys(externals).map(key => externals[key].filter(x => typeof x === 'string'))
);

let bundler = browserify(browserifyOpts)
  .external(externalFiles)
  .transform(stringify, {
    appliesTo: { includeExtensions: ['.html', '.htm'] }
  })
  .transform(babelify, {
    global: true,
    ignore: /\/node_modules\/(?!svg-to-pdfkit|pdfkit\/)/,
    presets: [
      [
        'env',
        {
          targets: {
            browsers: ['Chrome 66']
          }
        }
      ]
    ],
    plugins: ['lodash']
  })
  .transform(
    envify({
      _: 'purge', // 'purge' will clean out all undefined env variables.
      NODE_ENV: settings.env
    })
  )
  .add(`${settings.sourceFolder}/index.js`);
bundler.on('file', x => {
  console.log('file event:', x, arguments.length);
});
bundler.on('log', util.log);

function bundle(file) {
  util.log('Re Bundle.');
  if (file) {
    util.log(
      `${new Date().toString()}: Recompiling ${file[0].replace(`${__dirname}/src/`, '')}`
    );
  }
  return bundler
    .bundle()
    .on('error', handleError)
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpIf(settings.uglify, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.destinationFolder))
    .pipe(connect.reload());
}

gulp.task('build:scripts', () => bundle());

gulp.task('build:scripts-externals', () =>
  Object.keys(externals).map(bundleName => {
    const externalBundler = browserify({ debug: true })
      .require(externals[bundleName])
      .transform(babelify, {
        global: true,
        ignore: /\/node_modules\/(?!svg-to-pdfkit|pdfkit\/)/,
        presets: [
          [
            'env',
            {
              targets: {
                browsers: ['Chrome 66']
              }
            }
          ]
        ],
        plugins: ['lodash']
      });

    return externalBundler
      .bundle()
      .on('error', handleError)
      .pipe(source(`${bundleName}.js`))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(settings.destinationFolder));
  })
);

gulp.task('watch:scripts', () => {
  bundler = watchify(bundler);
  bundler.on('update', bundle);
});

gulp.task('build:scripts-lint', () =>
  gulp
    .src(`${settings.sourceFolder}/**/*.js`)
    .pipe(eslint())
    .pipe(eslint.format())
);

gulp.task('watch:scripts-lint', () => {
  gulp.watch(`${settings.sourceFolder}/**/*.js`, event => {
    gulp
      .src(event.path)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(
        eslint.results(result => {
          const res = result && result[0];
          if (!res) {
            return;
          }
          const message = res.messages
            ? res.messages
                .map(msg => `[${msg.ruleId} ${msg.line}:${msg.column}] ${msg.message}`)
                .join(' ')
            : 'No message';

          notifier.notify({
            title: `ESLint ${res.errorCount ? 'error' : 'warning'}: ${res.filePath}`,
            message
          });
        })
      );
  });
});
