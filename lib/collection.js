'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description manage collections of items
 */
var Collection = exports.Collection = function () {
  function Collection() {
    _classCallCheck(this, Collection);

    this.data = {};
  }

  /**
   * @param {string} key
   * @param {any} value
   */


  _createClass(Collection, [{
    key: 'set',
    value: function set(key, value) {
      this.data[key] = value;
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */

  }, {
    key: 'has',
    value: function has(key) {
      return this.data.hasOwnProperty(key);
    }

    /**
     * @description get typeof item
     * @param {string} key
     * @returns {string}
     */

  }, {
    key: 'typeof',
    value: function _typeof(key) {
      var elem = this.get(key);
      return Array.isArray(elem) ? 'array' : typeof elem === 'undefined' ? 'undefined' : _typeof2(elem);
    }

    /**
     * @param {string} key
     * @param {any} or
     * @returns {any}
     */

  }, {
    key: 'get',
    value: function get(key) {
      var or = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      return this.has(key) ? this.data[key] : or;
    }
  }]);

  return Collection;
}();