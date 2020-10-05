const {
    src,
    dest,
    task
} = require('gulp');
const eslint = require('gulp-eslint');
const gulpif = require('gulp-if');

function isFixed(file) {
    // Has ESLint fixed the file contents?
    return file.eslint != null && file.eslint.fixed;
}

function eslintFunction(cb) {
    return src(['./src/js/**/*.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({ fix: true }))
        .pipe(eslint.result(result => {
            // Called for each ESLint result.
            console.log(`ESLint result: ${result.filePath}`);
            console.log(`# Messages: ${result.messages.length}`);
            console.log(`# Warnings: ${result.warningCount}`);
            console.log(`# Errors: ${result.errorCount}`);
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // if fixed, write the file to dest
        .pipe(gulpif(isFixed, dest('./src/js/')))
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
};

exports.eslint = task(eslintFunction);
exports.default = eslintFunction;