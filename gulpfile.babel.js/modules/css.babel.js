const {
  src,
  dest,
  task,
} = require('gulp');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');
const minify = require('gulp-minifier');
const rename = require('gulp-rename');
/**
 * Yargs, para mandar a flag --prod na cli
 */
const { argv } = require('yargs');

const PROD = argv.prod;

/**
 * Css Settings
 */
const cssSettings = {
  src: './src/scss/styles.scss',
  watch: './src/scss/**/*',
  build: './dist/css/',
};
const browsersync = false;
/**
 * Styles task
 */
function cssFunction(cb) {
  return src(cssSettings.src)
    .pipe(gulpif(!PROD, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(cssSettings.build))
    .pipe(gulpif(PROD, postcss([autoprefixer])))
    .pipe(gulpif(PROD, cleanCss({
      compatibility: 'ie8',
    })))
    .pipe(gulpif(!PROD, sourcemaps.write()))
    .pipe(gulpif(PROD, minify({
      minify: true,
      minifyCSS: true,
    })))
    .pipe(gulpif(PROD, rename({
      suffix: '.min',
    })))
    .pipe(dest(cssSettings.build))
    .pipe(browsersync ? browsersync.reload({
      stream: true,
    }) : gutil.noop());
  cb();
}

exports.css = task(cssFunction);
exports.default = cssFunction;
