"use strict";

const {
    task
} = require('gulp');

const del = require('del');

function cleanJsTmpFunction(cb) {
    return del([
        './tmp/*.js'
    ]);
}
exports.cleanJsTmp = task(cleanJsTmpFunction);
exports.default = cleanJsTmpFunction;