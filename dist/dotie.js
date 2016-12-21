(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'");
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
        }
        return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
})({
    1: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Collection = exports.Collection = function() {
            function Collection() {
                _classCallCheck(this, Collection);
                this.data = {};
            }
            _createClass(Collection, [ {
                key: "set",
                value: function set(key, value) {
                    this.data[key] = value;
                }
            }, {
                key: "has",
                value: function has(key) {
                    return this.data.hasOwnProperty(key);
                }
            }, {
                key: "typeof",
                value: function _typeof(key) {
                    var elem = this.get(key);
                    return Array.isArray(elem) ? "array" : typeof elem === "undefined" ? "undefined" : _typeof2(elem);
                }
            }, {
                key: "get",
                value: function get(key) {
                    var or = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                    return this.has(key) ? this.data[key] : or;
                }
            } ]);
            return Collection;
        }();
    }, {} ],
    2: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.Container = undefined;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _collection = require("./collection");
        var _util = require("./util");
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                    arr2[i] = arr[i];
                }
                return arr2;
            } else {
                return Array.from(arr);
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Container = exports.Container = function() {
            function Container() {
                _classCallCheck(this, Container);
                this.dependencies = new _collection.Collection();
            }
            _createClass(Container, [ {
                key: "register",
                value: function register(name, constructor) {
                    if (typeof constructor === "function") {
                        constructor = [].concat(_toConsumableArray((0, _util.annotate)(constructor)), [ constructor ]);
                    }
                    this.dependencies.set(name, constructor);
                }
            }, {
                key: "resolve",
                value: function resolve(name) {
                    var _this = this;
                    if (!this.dependencies.has(name)) {
                        throw new Error("Can't resolve " + name);
                    }
                    if (this.dependencies.typeof(name) !== "array") {
                        return this.dependencies.get(name);
                    }
                    var dependence = this.dependencies.get(name);
                    return dependence[dependence.length - 1].apply(undefined, dependence.slice(0, -1).map(function(annotation) {
                        return _this.resolve(annotation);
                    }));
                }
            } ]);
            return Container;
        }();
    }, {
        "./collection": 1,
        "./util": 4
    } ],
    3: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.Container = undefined;
        var _container = require("./container");
        if (typeof window !== "undefined") {
            window.dotie = _container.Container;
        }
        exports.Container = _container.Container;
        exports.default = _container.Container;
    }, {
        "./container": 2
    } ],
    4: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.annotate = annotate;
        function annotate(fn) {
            var fnText = fn.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, "");
            return (fnText.match(/^([^\(]+?)=>/) || fnText.match(/^[^\(]*\(\s*([^\)]*)\)/m))[1].replace(/ /g, "").split(/,/).filter(Boolean);
        }
    }, {} ]
}, {}, [ 3 ]);