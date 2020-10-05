"use strict";

/**
 * Gulp
 */
const newer = require('gulp-newer');
const {
    src,
    dest,
    task
} = require('gulp');

const phpConfig = {
    src: './src/php/**/*.php',
    build: './dist'
};

function phpCopy(cb) {
    return src(phpConfig.src)
        .pipe(newer(phpConfig.build))
        .pipe(dest(phpConfig.build))
    cb();
}

exports.php = task(phpCopy);
exports.default = phpCopy;