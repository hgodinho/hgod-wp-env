"use strict";

const {
    task
} = require('gulp');

const del = require('del');

function cleanFunction(cb) {
    return del([
        './dist/*'
    ]);
}
exports.clean = task(cleanFunction);
exports.default = cleanFunction;