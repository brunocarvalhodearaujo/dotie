'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = undefined;

var _container = require('./container');

if (typeof window !== 'undefined') {
  window.dotie = _container.Container;
}

exports.Container = _container.Container;
exports.default = _container.Container;