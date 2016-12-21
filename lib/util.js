'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.annotate = annotate;
/**
 * returns a list with names of function parameters
 * @param {Function} fn
 * @returns {Array}
 */
function annotate(fn) {
  var fnText = fn.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
  return (fnText.match(/^([^\(]+?)=>/) || fnText.match(/^[^\(]*\(\s*([^\)]*)\)/m))[1].replace(/ /g, '').split(/,/).filter(Boolean);
}