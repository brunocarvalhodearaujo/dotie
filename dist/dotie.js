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
        exports.Injector = undefined;
        var _injector = require("./injector");
        var _injector2 = _interopRequireDefault(_injector);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        if (typeof window !== "undefined") {
            window.dotie = _injector2.default;
        }
        exports.Injector = _injector.Injector;
        exports.default = _injector2.default;
    }, {
        "./injector": 3
    } ],
    3: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.Injector = undefined;
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
        var Injector = exports.Injector = function() {
            function Injector() {
                _classCallCheck(this, Injector);
                this.providers = new _collection.Collection();
            }
            _createClass(Injector, [ {
                key: "register",
                value: function register(name, provider) {
                    if (this.modules.hasOwnProperty(name)) {
                        throw new Error(name + " always exist");
                    }
                    this.providers.set(name, provider);
                    return this;
                }
            }, {
                key: "resolve",
                value: function resolve(name) {
                    var _this = this;
                    if (!this.providers.has(name)) {
                        throw new Error("Unknown dependence: " + name);
                    }
                    var provider = this.providers.get(name);
                    if (this.providers.typeof(name) === "function") {
                        provider = [].concat(_toConsumableArray(provider.hasOwnProperty("$inject") ? provider.$inject : (0, 
                        _util.annotate)(provider)), [ provider ]);
                    }
                    if (Array.isArray(provider)) {
                        provider = provider[provider.length - 1].apply(this, provider.slice(0, -1).map(function(annotation) {
                            return _this.resolve(annotation);
                        }));
                    }
                    return provider;
                }
            } ]);
            return Injector;
        }();
        exports.default = new Proxy(new Injector(), {
            get: function get(target, name) {
                if (!(name in target) && !target.providers.has(name)) {
                    throw new ReferenceError("Unknown property: " + name);
                }
                return name in target ? target[name] : target.resolve(name);
            },
            set: function set(target, prop, value) {
                target.register(prop, value);
                return true;
            }
        });
    }, {
        "./collection": 1,
        "./util": 4
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
}, {}, [ 2 ]);