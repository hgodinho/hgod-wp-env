"use strict";

const {
    task
} = require('gulp');

const del = require('del');

function cleanCssTmpFunction(cb) {
    return del([
        './tmp/*.css'
    ]);
    cb();
}
exports.cleanCssTmp = task(cleanCssTmpFunction);
exports.default = cleanCssTmpFunction;
