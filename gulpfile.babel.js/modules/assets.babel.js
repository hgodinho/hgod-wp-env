"use strict";

const newer = require('gulp-newer');

const imagemin = require('gulp-imagemin');

const {
    src,
    dest,
    task
} = require('gulp');

/**
 * Assets settings
 */
const assets = {
    src: './src/assets/**/*',
    build: './dist/assets/'
};

function assetsFunction(cb) {
    return src(assets.src)
        .pipe(newer(assets.build))
        .pipe(imagemin())
        .pipe(dest(assets.build));
    cb();
}

exports.assets = task(assetsFunction);
exports.default = assetsFunction;

