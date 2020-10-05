const {
  task,
} = require('gulp');

const del = require('del');

function cleanTmpFunction() {
  return del([
    './tmp/*',
  ]);
}
exports.cleanTmp = task(cleanTmpFunction);
exports.default = cleanTmpFunction;
