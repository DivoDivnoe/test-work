const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const gulpWebpack = require('gulp-webpack');
const webpackConfig = require('./webpack.config');
const del = require('del');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

const path = {
  root: 'build',
  pug: {
    src: 'src/pug/pages/*.pug'
  },
  scss: {
    src: 'src/scss/style.scss',
    dest: 'build/css'
  },
  js: {
    src: 'src/js/main.js',
    dest: 'build/js'
  },
  img: {
    src: 'src/img/*.{png, jpg, jpeg, svg}',
    dest: 'build/img'
  },
  json: {
    src: 'events.json',
    dest: 'build'
  }
};

gulp.task('clean', () => del(path.root));

gulp.task('copy-img', () => {
  return gulp.src(path.img.src).pipe(gulp.dest(path.img.dest));
});

gulp.task('copy-json', () => {
  return gulp.src(path.json.src).pipe(gulp.dest(path.json.dest));
});

gulp.task('pug', () => {
  return gulp
    .src(path.pug.src)
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest(path.root));
});

gulp.task('scss', () => {
  return gulp
    .src(path.scss.src)
    .pipe(
      plumber({
        errorHandler: notify.onError(error => ({
          title: 'Style compiling error',
          message: error.message
        }))
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: require('node-normalize-scss').includePaths
      })
    )
    .pipe(sourcemaps.write())
    .pipe(
      postcss([
        autoprefixer({
          browsers: ['last 2 versions']
        })
      ])
    )
    .pipe(gulp.dest(path.scss.dest))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.scss.dest));
});

gulp.task('js', () => {
  return gulp
    .src(path.js.src)
    .pipe(
      plumber({
        errorHandler: notify.onError(error => ({
          title: 'Script compiling error',
          message: error.message
        }))
      })
    )
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(path.js.dest));
});

gulp.task('serve', () => {
  browserSync.init({
    server: path.root
  });
  browserSync.watch(`${path.root}/**/*.*`, browserSync.reload);
});

gulp.task('watch', () => {
  gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('src/img/**/*.{jpg, jpeg, png, svg}', gulp.series('copy-img'));
  gulp.watch('src/events.json', gulp.series('copy-json'));
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
});

gulp.task(
  'default',
  gulp.series([
    'clean',
    gulp.parallel(['pug', 'scss', 'js', 'copy-img', 'copy-json']),
    gulp.parallel('watch', 'serve')
  ])
);
