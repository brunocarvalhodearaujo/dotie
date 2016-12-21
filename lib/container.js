'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collection = require('./collection');

var _util = require('./util');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = exports.Container = function () {
  function Container() {
    _classCallCheck(this, Container);

    this.dependencies = new _collection.Collection();
  }

  /**
   * @description add an dependence to injector
   * @param {string} name
   * @param {Array|Function}
   */


  _createClass(Container, [{
    key: 'register',
    value: function register(name, constructor) {
      if (typeof constructor === 'function') {
        constructor = [].concat(_toConsumableArray((0, _util.annotate)(constructor)), [constructor]);
      }
      this.dependencies.set(name, constructor);
    }

    /**
     * @description retrieve an dependence with injections
     * @param {string} name
     * @returns {any}
     */

  }, {
    key: 'resolve',
    value: function resolve(name) {
      var _this = this;

      if (!this.dependencies.has(name)) {
        throw new Error('Can\'t resolve ' + name);
      }
      if (this.dependencies.typeof(name) !== 'array') {
        return this.dependencies.get(name);
      }
      var dependence = this.dependencies.get(name);
      return dependence[dependence.length - 1].apply(undefined, dependence.slice(0, -1).map(function (annotation) {
        return _this.resolve(annotation);
      }));
    }
  }]);

  return Container;
}();