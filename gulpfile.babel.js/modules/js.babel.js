"use strict";

/**
 * Gulp
 */
const {
    src,
    dest,
    task,
    series,
    parallel
} = require('gulp');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const rename = require("gulp-rename");


const cleanjs = require("./clean.js.tmp.babel");

/**
 * Yargs, para mandar a flag --prod na cli
 */
const argv = require('yargs').argv;
const PROD = argv.prod;

/**
 * JS Settings
 */
const jsSettings = {
    src: './src/js/**/*',
    build: './dist/js/',
    tmp: './tmp/',
    filename: 'main.js',
    filenameMin: 'main.min.js',
    buildFilename: 'scripts.build.js',
    buildMinFilename: 'scripts.build.min.js',
    depsFilename: 'scripts.deps.js'
};
/**
 * Build os js criados para a aplicação
 */
function jsBuild(cb) {
    return src(jsSettings.src)
        .pipe(plumber())
        .pipe(concat(jsSettings.buildFilename))
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(dest(jsSettings.tmp))
        .pipe(gulpif(PROD, rename(jsSettings.buildMinFilename)))
        .pipe(gulpif(PROD, uglify()))
        .pipe(gulpif(PROD, dest(jsSettings.tmp)));
    cb();
}
/**
 * Build das dependências do projeto
 */
function jsDeps(cb) {
    const files = [
        'node_modules/axios/dist/axios.min.js',
        'node_modules/cssnano/dist/index.js',
    ]
    return src(files)
        .pipe(plumber())
        .pipe(concat(jsSettings.depsFilename))
        .pipe(dest(jsSettings.tmp));
    cb();
}
/**
 * Concatena a build com as deps em um arquivo, e minifica
 */
function jsConcat(cb) {
    const files = [
        jsSettings.tmp + jsSettings.depsFilename,
        jsSettings.tmp + jsSettings.buildFilename,
    ]
    return src(files)
        .pipe(plumber())
        .pipe(concat(jsSettings.filename))
        .pipe(dest(jsSettings.build))
    cb();
}

function jsConcatMin(cb) {
    if (PROD === true) {
        const files = [
            jsSettings.tmp + jsSettings.depsFilename,
            jsSettings.tmp + jsSettings.buildMinFilename,
        ]
        return src(files)
            .pipe(plumber())
            .pipe(gulpif(PROD, concat(jsSettings.filenameMin)))
            .pipe(gulpif(PROD, dest(jsSettings.build)))
    }
    console.log('dev mode');
    cb();
}
/**
 * JS Processing
 */
const jsFunction = series(jsDeps, jsBuild, jsConcat, jsConcatMin);


exports.jsBuild = task(jsBuild);
exports.jsDeps = task(jsDeps);
exports.jsConcat = task(jsConcat);
exports.jsConcatMin = task(jsConcatMin);
exports.js = jsFunction;
exports.default = jsFunction;