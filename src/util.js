/**
 * returns a list with names of function parameters
 * @param {Function} fn
 * @returns {Array}
 */
export function annotate(fn) {
  const fnText = fn.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
  return (fnText.match(/^([^\(]+?)=>/) || fnText.match(/^[^\(]*\(\s*([^\)]*)\)/m))[ 1 ]
    .replace(/ /g, '').split(/,/).filter(Boolean)
}
