/**
 * Gulp
 */
const {
    series,
    parallel,
} = require('gulp');
const gulpif = require('gulp-if');

/**
 * Módulos
 */
const php = require('./modules/php.babel.js');
const cleanTmp = require('./modules/clean.tmp.babel.js');
const cleanJsTmp = require('./modules/clean.js.tmp.babel.js');
const cleanCssTmp = require('./modules/clean.css.tmp.babel.js');
const clean = require('./modules/clean.babel.js');
const assets = require('./modules/assets.babel.js');
const css = require('./modules/css.babel.js');
const js = require('./modules/js.babel.js');
const eslint = require('./modules/eslint.babel.js');

const defaultTask = series(
    clean.default,
    parallel(php.default, assets.default),
    parallel(css.default, js.default),
    cleanTmp.default
);
exports.default = defaultTask;
