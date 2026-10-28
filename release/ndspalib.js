"use strict";
var nd_core = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/json5@2.2.3/node_modules/json5/dist/index.js
  var require_dist = __commonJS({
    "node_modules/.pnpm/json5@2.2.3/node_modules/json5/dist/index.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.JSON5 = factory();
      })(exports, function() {
        "use strict";
        function createCommonjsModule(fn, module2) {
          return module2 = { exports: {} }, fn(module2, module2.exports), module2.exports;
        }
        var _global = createCommonjsModule(function(module2) {
          var global = module2.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
          if (typeof __g == "number") {
            __g = global;
          }
        });
        var _core = createCommonjsModule(function(module2) {
          var core = module2.exports = { version: "2.6.5" };
          if (typeof __e == "number") {
            __e = core;
          }
        });
        var _core_1 = _core.version;
        var _isObject = function(it) {
          return typeof it === "object" ? it !== null : typeof it === "function";
        };
        var _anObject = function(it) {
          if (!_isObject(it)) {
            throw TypeError(it + " is not an object!");
          }
          return it;
        };
        var _fails = function(exec) {
          try {
            return !!exec();
          } catch (e) {
            return true;
          }
        };
        var _descriptors = !_fails(function() {
          return Object.defineProperty({}, "a", { get: function() {
            return 7;
          } }).a != 7;
        });
        var document2 = _global.document;
        var is = _isObject(document2) && _isObject(document2.createElement);
        var _domCreate = function(it) {
          return is ? document2.createElement(it) : {};
        };
        var _ie8DomDefine = !_descriptors && !_fails(function() {
          return Object.defineProperty(_domCreate("div"), "a", { get: function() {
            return 7;
          } }).a != 7;
        });
        var _toPrimitive = function(it, S) {
          if (!_isObject(it)) {
            return it;
          }
          var fn, val;
          if (S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
            return val;
          }
          if (typeof (fn = it.valueOf) == "function" && !_isObject(val = fn.call(it))) {
            return val;
          }
          if (!S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
            return val;
          }
          throw TypeError("Can't convert object to primitive value");
        };
        var dP = Object.defineProperty;
        var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
          _anObject(O);
          P = _toPrimitive(P, true);
          _anObject(Attributes);
          if (_ie8DomDefine) {
            try {
              return dP(O, P, Attributes);
            } catch (e) {
            }
          }
          if ("get" in Attributes || "set" in Attributes) {
            throw TypeError("Accessors not supported!");
          }
          if ("value" in Attributes) {
            O[P] = Attributes.value;
          }
          return O;
        };
        var _objectDp = {
          f
        };
        var _propertyDesc = function(bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value
          };
        };
        var _hide = _descriptors ? function(object, key2, value) {
          return _objectDp.f(object, key2, _propertyDesc(1, value));
        } : function(object, key2, value) {
          object[key2] = value;
          return object;
        };
        var hasOwnProperty = {}.hasOwnProperty;
        var _has = function(it, key2) {
          return hasOwnProperty.call(it, key2);
        };
        var id = 0;
        var px = Math.random();
        var _uid = function(key2) {
          return "Symbol(".concat(key2 === void 0 ? "" : key2, ")_", (++id + px).toString(36));
        };
        var _library = false;
        var _shared = createCommonjsModule(function(module2) {
          var SHARED = "__core-js_shared__";
          var store = _global[SHARED] || (_global[SHARED] = {});
          (module2.exports = function(key2, value) {
            return store[key2] || (store[key2] = value !== void 0 ? value : {});
          })("versions", []).push({
            version: _core.version,
            mode: _library ? "pure" : "global",
            copyright: "\xA9 2019 Denis Pushkarev (zloirock.ru)"
          });
        });
        var _functionToString = _shared("native-function-to-string", Function.toString);
        var _redefine = createCommonjsModule(function(module2) {
          var SRC = _uid("src");
          var TO_STRING = "toString";
          var TPL = ("" + _functionToString).split(TO_STRING);
          _core.inspectSource = function(it) {
            return _functionToString.call(it);
          };
          (module2.exports = function(O, key2, val, safe) {
            var isFunction = typeof val == "function";
            if (isFunction) {
              _has(val, "name") || _hide(val, "name", key2);
            }
            if (O[key2] === val) {
              return;
            }
            if (isFunction) {
              _has(val, SRC) || _hide(val, SRC, O[key2] ? "" + O[key2] : TPL.join(String(key2)));
            }
            if (O === _global) {
              O[key2] = val;
            } else if (!safe) {
              delete O[key2];
              _hide(O, key2, val);
            } else if (O[key2]) {
              O[key2] = val;
            } else {
              _hide(O, key2, val);
            }
          })(Function.prototype, TO_STRING, function toString() {
            return typeof this == "function" && this[SRC] || _functionToString.call(this);
          });
        });
        var _aFunction = function(it) {
          if (typeof it != "function") {
            throw TypeError(it + " is not a function!");
          }
          return it;
        };
        var _ctx = function(fn, that, length) {
          _aFunction(fn);
          if (that === void 0) {
            return fn;
          }
          switch (length) {
            case 1:
              return function(a) {
                return fn.call(that, a);
              };
            case 2:
              return function(a, b) {
                return fn.call(that, a, b);
              };
            case 3:
              return function(a, b, c2) {
                return fn.call(that, a, b, c2);
              };
          }
          return function() {
            return fn.apply(that, arguments);
          };
        };
        var PROTOTYPE = "prototype";
        var $export = function(type, name, source2) {
          var IS_FORCED = type & $export.F;
          var IS_GLOBAL = type & $export.G;
          var IS_STATIC = type & $export.S;
          var IS_PROTO = type & $export.P;
          var IS_BIND = type & $export.B;
          var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
          var exports2 = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
          var expProto = exports2[PROTOTYPE] || (exports2[PROTOTYPE] = {});
          var key2, own, out, exp;
          if (IS_GLOBAL) {
            source2 = name;
          }
          for (key2 in source2) {
            own = !IS_FORCED && target && target[key2] !== void 0;
            out = (own ? target : source2)[key2];
            exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == "function" ? _ctx(Function.call, out) : out;
            if (target) {
              _redefine(target, key2, out, type & $export.U);
            }
            if (exports2[key2] != out) {
              _hide(exports2, key2, exp);
            }
            if (IS_PROTO && expProto[key2] != out) {
              expProto[key2] = out;
            }
          }
        };
        _global.core = _core;
        $export.F = 1;
        $export.G = 2;
        $export.S = 4;
        $export.P = 8;
        $export.B = 16;
        $export.W = 32;
        $export.U = 64;
        $export.R = 128;
        var _export = $export;
        var ceil = Math.ceil;
        var floor = Math.floor;
        var _toInteger = function(it) {
          return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
        };
        var _defined = function(it) {
          if (it == void 0) {
            throw TypeError("Can't call method on  " + it);
          }
          return it;
        };
        var _stringAt = function(TO_STRING) {
          return function(that, pos2) {
            var s = String(_defined(that));
            var i = _toInteger(pos2);
            var l = s.length;
            var a, b;
            if (i < 0 || i >= l) {
              return TO_STRING ? "" : void 0;
            }
            a = s.charCodeAt(i);
            return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
          };
        };
        var $at = _stringAt(false);
        _export(_export.P, "String", {
          // 21.1.3.3 String.prototype.codePointAt(pos)
          codePointAt: function codePointAt2(pos2) {
            return $at(this, pos2);
          }
        });
        var codePointAt = _core.String.codePointAt;
        var max = Math.max;
        var min = Math.min;
        var _toAbsoluteIndex = function(index, length) {
          index = _toInteger(index);
          return index < 0 ? max(index + length, 0) : min(index, length);
        };
        var fromCharCode = String.fromCharCode;
        var $fromCodePoint = String.fromCodePoint;
        _export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), "String", {
          // 21.1.2.2 String.fromCodePoint(...codePoints)
          fromCodePoint: function fromCodePoint2(x) {
            var arguments$1 = arguments;
            var res = [];
            var aLen = arguments.length;
            var i = 0;
            var code;
            while (aLen > i) {
              code = +arguments$1[i++];
              if (_toAbsoluteIndex(code, 1114111) !== code) {
                throw RangeError(code + " is not a valid code point");
              }
              res.push(
                code < 65536 ? fromCharCode(code) : fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320)
              );
            }
            return res.join("");
          }
        });
        var fromCodePoint = _core.String.fromCodePoint;
        var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
        var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
        var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
        var unicode = {
          Space_Separator,
          ID_Start,
          ID_Continue
        };
        var util = {
          isSpaceSeparator: function isSpaceSeparator(c2) {
            return typeof c2 === "string" && unicode.Space_Separator.test(c2);
          },
          isIdStartChar: function isIdStartChar(c2) {
            return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
          },
          isIdContinueChar: function isIdContinueChar(c2) {
            return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "\u200C" || c2 === "\u200D" || unicode.ID_Continue.test(c2));
          },
          isDigit: function isDigit(c2) {
            return typeof c2 === "string" && /[0-9]/.test(c2);
          },
          isHexDigit: function isHexDigit(c2) {
            return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
          }
        };
        var source;
        var parseState;
        var stack;
        var pos;
        var line;
        var column;
        var token;
        var key;
        var root;
        var parse = function parse2(text, reviver) {
          source = String(text);
          parseState = "start";
          stack = [];
          pos = 0;
          line = 1;
          column = 0;
          token = void 0;
          key = void 0;
          root = void 0;
          do {
            token = lex();
            parseStates[parseState]();
          } while (token.type !== "eof");
          if (typeof reviver === "function") {
            return internalize({ "": root }, "", reviver);
          }
          return root;
        };
        function internalize(holder, name, reviver) {
          var value = holder[name];
          if (value != null && typeof value === "object") {
            if (Array.isArray(value)) {
              for (var i = 0; i < value.length; i++) {
                var key2 = String(i);
                var replacement = internalize(value, key2, reviver);
                if (replacement === void 0) {
                  delete value[key2];
                } else {
                  Object.defineProperty(value, key2, {
                    value: replacement,
                    writable: true,
                    enumerable: true,
                    configurable: true
                  });
                }
              }
            } else {
              for (var key$1 in value) {
                var replacement$1 = internalize(value, key$1, reviver);
                if (replacement$1 === void 0) {
                  delete value[key$1];
                } else {
                  Object.defineProperty(value, key$1, {
                    value: replacement$1,
                    writable: true,
                    enumerable: true,
                    configurable: true
                  });
                }
              }
            }
          }
          return reviver.call(holder, name, value);
        }
        var lexState;
        var buffer;
        var doubleQuote;
        var sign;
        var c;
        function lex() {
          lexState = "default";
          buffer = "";
          doubleQuote = false;
          sign = 1;
          for (; ; ) {
            c = peek();
            var token2 = lexStates[lexState]();
            if (token2) {
              return token2;
            }
          }
        }
        function peek() {
          if (source[pos]) {
            return String.fromCodePoint(source.codePointAt(pos));
          }
        }
        function read() {
          var c2 = peek();
          if (c2 === "\n") {
            line++;
            column = 0;
          } else if (c2) {
            column += c2.length;
          } else {
            column++;
          }
          if (c2) {
            pos += c2.length;
          }
          return c2;
        }
        var lexStates = {
          default: function default$1() {
            switch (c) {
              case "	":
              case "\v":
              case "\f":
              case " ":
              case "\xA0":
              case "\uFEFF":
              case "\n":
              case "\r":
              case "\u2028":
              case "\u2029":
                read();
                return;
              case "/":
                read();
                lexState = "comment";
                return;
              case void 0:
                read();
                return newToken("eof");
            }
            if (util.isSpaceSeparator(c)) {
              read();
              return;
            }
            return lexStates[parseState]();
          },
          comment: function comment() {
            switch (c) {
              case "*":
                read();
                lexState = "multiLineComment";
                return;
              case "/":
                read();
                lexState = "singleLineComment";
                return;
            }
            throw invalidChar(read());
          },
          multiLineComment: function multiLineComment() {
            switch (c) {
              case "*":
                read();
                lexState = "multiLineCommentAsterisk";
                return;
              case void 0:
                throw invalidChar(read());
            }
            read();
          },
          multiLineCommentAsterisk: function multiLineCommentAsterisk() {
            switch (c) {
              case "*":
                read();
                return;
              case "/":
                read();
                lexState = "default";
                return;
              case void 0:
                throw invalidChar(read());
            }
            read();
            lexState = "multiLineComment";
          },
          singleLineComment: function singleLineComment() {
            switch (c) {
              case "\n":
              case "\r":
              case "\u2028":
              case "\u2029":
                read();
                lexState = "default";
                return;
              case void 0:
                read();
                return newToken("eof");
            }
            read();
          },
          value: function value() {
            switch (c) {
              case "{":
              case "[":
                return newToken("punctuator", read());
              case "n":
                read();
                literal("ull");
                return newToken("null", null);
              case "t":
                read();
                literal("rue");
                return newToken("boolean", true);
              case "f":
                read();
                literal("alse");
                return newToken("boolean", false);
              case "-":
              case "+":
                if (read() === "-") {
                  sign = -1;
                }
                lexState = "sign";
                return;
              case ".":
                buffer = read();
                lexState = "decimalPointLeading";
                return;
              case "0":
                buffer = read();
                lexState = "zero";
                return;
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
                buffer = read();
                lexState = "decimalInteger";
                return;
              case "I":
                read();
                literal("nfinity");
                return newToken("numeric", Infinity);
              case "N":
                read();
                literal("aN");
                return newToken("numeric", NaN);
              case '"':
              case "'":
                doubleQuote = read() === '"';
                buffer = "";
                lexState = "string";
                return;
            }
            throw invalidChar(read());
          },
          identifierNameStartEscape: function identifierNameStartEscape() {
            if (c !== "u") {
              throw invalidChar(read());
            }
            read();
            var u = unicodeEscape();
            switch (u) {
              case "$":
              case "_":
                break;
              default:
                if (!util.isIdStartChar(u)) {
                  throw invalidIdentifier();
                }
                break;
            }
            buffer += u;
            lexState = "identifierName";
          },
          identifierName: function identifierName() {
            switch (c) {
              case "$":
              case "_":
              case "\u200C":
              case "\u200D":
                buffer += read();
                return;
              case "\\":
                read();
                lexState = "identifierNameEscape";
                return;
            }
            if (util.isIdContinueChar(c)) {
              buffer += read();
              return;
            }
            return newToken("identifier", buffer);
          },
          identifierNameEscape: function identifierNameEscape() {
            if (c !== "u") {
              throw invalidChar(read());
            }
            read();
            var u = unicodeEscape();
            switch (u) {
              case "$":
              case "_":
              case "\u200C":
              case "\u200D":
                break;
              default:
                if (!util.isIdContinueChar(u)) {
                  throw invalidIdentifier();
                }
                break;
            }
            buffer += u;
            lexState = "identifierName";
          },
          sign: function sign$1() {
            switch (c) {
              case ".":
                buffer = read();
                lexState = "decimalPointLeading";
                return;
              case "0":
                buffer = read();
                lexState = "zero";
                return;
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
                buffer = read();
                lexState = "decimalInteger";
                return;
              case "I":
                read();
                literal("nfinity");
                return newToken("numeric", sign * Infinity);
              case "N":
                read();
                literal("aN");
                return newToken("numeric", NaN);
            }
            throw invalidChar(read());
          },
          zero: function zero() {
            switch (c) {
              case ".":
                buffer += read();
                lexState = "decimalPoint";
                return;
              case "e":
              case "E":
                buffer += read();
                lexState = "decimalExponent";
                return;
              case "x":
              case "X":
                buffer += read();
                lexState = "hexadecimal";
                return;
            }
            return newToken("numeric", sign * 0);
          },
          decimalInteger: function decimalInteger() {
            switch (c) {
              case ".":
                buffer += read();
                lexState = "decimalPoint";
                return;
              case "e":
              case "E":
                buffer += read();
                lexState = "decimalExponent";
                return;
            }
            if (util.isDigit(c)) {
              buffer += read();
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          decimalPointLeading: function decimalPointLeading() {
            if (util.isDigit(c)) {
              buffer += read();
              lexState = "decimalFraction";
              return;
            }
            throw invalidChar(read());
          },
          decimalPoint: function decimalPoint() {
            switch (c) {
              case "e":
              case "E":
                buffer += read();
                lexState = "decimalExponent";
                return;
            }
            if (util.isDigit(c)) {
              buffer += read();
              lexState = "decimalFraction";
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          decimalFraction: function decimalFraction() {
            switch (c) {
              case "e":
              case "E":
                buffer += read();
                lexState = "decimalExponent";
                return;
            }
            if (util.isDigit(c)) {
              buffer += read();
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          decimalExponent: function decimalExponent() {
            switch (c) {
              case "+":
              case "-":
                buffer += read();
                lexState = "decimalExponentSign";
                return;
            }
            if (util.isDigit(c)) {
              buffer += read();
              lexState = "decimalExponentInteger";
              return;
            }
            throw invalidChar(read());
          },
          decimalExponentSign: function decimalExponentSign() {
            if (util.isDigit(c)) {
              buffer += read();
              lexState = "decimalExponentInteger";
              return;
            }
            throw invalidChar(read());
          },
          decimalExponentInteger: function decimalExponentInteger() {
            if (util.isDigit(c)) {
              buffer += read();
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          hexadecimal: function hexadecimal() {
            if (util.isHexDigit(c)) {
              buffer += read();
              lexState = "hexadecimalInteger";
              return;
            }
            throw invalidChar(read());
          },
          hexadecimalInteger: function hexadecimalInteger() {
            if (util.isHexDigit(c)) {
              buffer += read();
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          string: function string() {
            switch (c) {
              case "\\":
                read();
                buffer += escape();
                return;
              case '"':
                if (doubleQuote) {
                  read();
                  return newToken("string", buffer);
                }
                buffer += read();
                return;
              case "'":
                if (!doubleQuote) {
                  read();
                  return newToken("string", buffer);
                }
                buffer += read();
                return;
              case "\n":
              case "\r":
                throw invalidChar(read());
              case "\u2028":
              case "\u2029":
                separatorChar(c);
                break;
              case void 0:
                throw invalidChar(read());
            }
            buffer += read();
          },
          start: function start() {
            switch (c) {
              case "{":
              case "[":
                return newToken("punctuator", read());
            }
            lexState = "value";
          },
          beforePropertyName: function beforePropertyName() {
            switch (c) {
              case "$":
              case "_":
                buffer = read();
                lexState = "identifierName";
                return;
              case "\\":
                read();
                lexState = "identifierNameStartEscape";
                return;
              case "}":
                return newToken("punctuator", read());
              case '"':
              case "'":
                doubleQuote = read() === '"';
                lexState = "string";
                return;
            }
            if (util.isIdStartChar(c)) {
              buffer += read();
              lexState = "identifierName";
              return;
            }
            throw invalidChar(read());
          },
          afterPropertyName: function afterPropertyName() {
            if (c === ":") {
              return newToken("punctuator", read());
            }
            throw invalidChar(read());
          },
          beforePropertyValue: function beforePropertyValue() {
            lexState = "value";
          },
          afterPropertyValue: function afterPropertyValue() {
            switch (c) {
              case ",":
              case "}":
                return newToken("punctuator", read());
            }
            throw invalidChar(read());
          },
          beforeArrayValue: function beforeArrayValue() {
            if (c === "]") {
              return newToken("punctuator", read());
            }
            lexState = "value";
          },
          afterArrayValue: function afterArrayValue() {
            switch (c) {
              case ",":
              case "]":
                return newToken("punctuator", read());
            }
            throw invalidChar(read());
          },
          end: function end() {
            throw invalidChar(read());
          }
        };
        function newToken(type, value) {
          return {
            type,
            value,
            line,
            column
          };
        }
        function literal(s) {
          for (var i = 0, list = s; i < list.length; i += 1) {
            var c2 = list[i];
            var p = peek();
            if (p !== c2) {
              throw invalidChar(read());
            }
            read();
          }
        }
        function escape() {
          var c2 = peek();
          switch (c2) {
            case "b":
              read();
              return "\b";
            case "f":
              read();
              return "\f";
            case "n":
              read();
              return "\n";
            case "r":
              read();
              return "\r";
            case "t":
              read();
              return "	";
            case "v":
              read();
              return "\v";
            case "0":
              read();
              if (util.isDigit(peek())) {
                throw invalidChar(read());
              }
              return "\0";
            case "x":
              read();
              return hexEscape();
            case "u":
              read();
              return unicodeEscape();
            case "\n":
            case "\u2028":
            case "\u2029":
              read();
              return "";
            case "\r":
              read();
              if (peek() === "\n") {
                read();
              }
              return "";
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              throw invalidChar(read());
            case void 0:
              throw invalidChar(read());
          }
          return read();
        }
        function hexEscape() {
          var buffer2 = "";
          var c2 = peek();
          if (!util.isHexDigit(c2)) {
            throw invalidChar(read());
          }
          buffer2 += read();
          c2 = peek();
          if (!util.isHexDigit(c2)) {
            throw invalidChar(read());
          }
          buffer2 += read();
          return String.fromCodePoint(parseInt(buffer2, 16));
        }
        function unicodeEscape() {
          var buffer2 = "";
          var count = 4;
          while (count-- > 0) {
            var c2 = peek();
            if (!util.isHexDigit(c2)) {
              throw invalidChar(read());
            }
            buffer2 += read();
          }
          return String.fromCodePoint(parseInt(buffer2, 16));
        }
        var parseStates = {
          start: function start() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            push();
          },
          beforePropertyName: function beforePropertyName() {
            switch (token.type) {
              case "identifier":
              case "string":
                key = token.value;
                parseState = "afterPropertyName";
                return;
              case "punctuator":
                pop();
                return;
              case "eof":
                throw invalidEOF();
            }
          },
          afterPropertyName: function afterPropertyName() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            parseState = "beforePropertyValue";
          },
          beforePropertyValue: function beforePropertyValue() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            push();
          },
          beforeArrayValue: function beforeArrayValue() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            if (token.type === "punctuator" && token.value === "]") {
              pop();
              return;
            }
            push();
          },
          afterPropertyValue: function afterPropertyValue() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            switch (token.value) {
              case ",":
                parseState = "beforePropertyName";
                return;
              case "}":
                pop();
            }
          },
          afterArrayValue: function afterArrayValue() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            switch (token.value) {
              case ",":
                parseState = "beforeArrayValue";
                return;
              case "]":
                pop();
            }
          },
          end: function end() {
          }
        };
        function push() {
          var value;
          switch (token.type) {
            case "punctuator":
              switch (token.value) {
                case "{":
                  value = {};
                  break;
                case "[":
                  value = [];
                  break;
              }
              break;
            case "null":
            case "boolean":
            case "numeric":
            case "string":
              value = token.value;
              break;
          }
          if (root === void 0) {
            root = value;
          } else {
            var parent = stack[stack.length - 1];
            if (Array.isArray(parent)) {
              parent.push(value);
            } else {
              Object.defineProperty(parent, key, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
          if (value !== null && typeof value === "object") {
            stack.push(value);
            if (Array.isArray(value)) {
              parseState = "beforeArrayValue";
            } else {
              parseState = "beforePropertyName";
            }
          } else {
            var current = stack[stack.length - 1];
            if (current == null) {
              parseState = "end";
            } else if (Array.isArray(current)) {
              parseState = "afterArrayValue";
            } else {
              parseState = "afterPropertyValue";
            }
          }
        }
        function pop() {
          stack.pop();
          var current = stack[stack.length - 1];
          if (current == null) {
            parseState = "end";
          } else if (Array.isArray(current)) {
            parseState = "afterArrayValue";
          } else {
            parseState = "afterPropertyValue";
          }
        }
        function invalidChar(c2) {
          if (c2 === void 0) {
            return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
          }
          return syntaxError("JSON5: invalid character '" + formatChar(c2) + "' at " + line + ":" + column);
        }
        function invalidEOF() {
          return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
        }
        function invalidIdentifier() {
          column -= 5;
          return syntaxError("JSON5: invalid identifier character at " + line + ":" + column);
        }
        function separatorChar(c2) {
          console.warn("JSON5: '" + formatChar(c2) + "' in strings is not valid ECMAScript; consider escaping");
        }
        function formatChar(c2) {
          var replacements = {
            "'": "\\'",
            '"': '\\"',
            "\\": "\\\\",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "	": "\\t",
            "\v": "\\v",
            "\0": "\\0",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
          };
          if (replacements[c2]) {
            return replacements[c2];
          }
          if (c2 < " ") {
            var hexString = c2.charCodeAt(0).toString(16);
            return "\\x" + ("00" + hexString).substring(hexString.length);
          }
          return c2;
        }
        function syntaxError(message) {
          var err = new SyntaxError(message);
          err.lineNumber = line;
          err.columnNumber = column;
          return err;
        }
        var stringify = function stringify2(value, replacer, space) {
          var stack2 = [];
          var indent = "";
          var propertyList;
          var replacerFunc;
          var gap = "";
          var quote;
          if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
            space = replacer.space;
            quote = replacer.quote;
            replacer = replacer.replacer;
          }
          if (typeof replacer === "function") {
            replacerFunc = replacer;
          } else if (Array.isArray(replacer)) {
            propertyList = [];
            for (var i = 0, list = replacer; i < list.length; i += 1) {
              var v = list[i];
              var item = void 0;
              if (typeof v === "string") {
                item = v;
              } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
                item = String(v);
              }
              if (item !== void 0 && propertyList.indexOf(item) < 0) {
                propertyList.push(item);
              }
            }
          }
          if (space instanceof Number) {
            space = Number(space);
          } else if (space instanceof String) {
            space = String(space);
          }
          if (typeof space === "number") {
            if (space > 0) {
              space = Math.min(10, Math.floor(space));
              gap = "          ".substr(0, space);
            }
          } else if (typeof space === "string") {
            gap = space.substr(0, 10);
          }
          return serializeProperty("", { "": value });
          function serializeProperty(key2, holder) {
            var value2 = holder[key2];
            if (value2 != null) {
              if (typeof value2.toJSON5 === "function") {
                value2 = value2.toJSON5(key2);
              } else if (typeof value2.toJSON === "function") {
                value2 = value2.toJSON(key2);
              }
            }
            if (replacerFunc) {
              value2 = replacerFunc.call(holder, key2, value2);
            }
            if (value2 instanceof Number) {
              value2 = Number(value2);
            } else if (value2 instanceof String) {
              value2 = String(value2);
            } else if (value2 instanceof Boolean) {
              value2 = value2.valueOf();
            }
            switch (value2) {
              case null:
                return "null";
              case true:
                return "true";
              case false:
                return "false";
            }
            if (typeof value2 === "string") {
              return quoteString(value2, false);
            }
            if (typeof value2 === "number") {
              return String(value2);
            }
            if (typeof value2 === "object") {
              return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
            }
            return void 0;
          }
          function quoteString(value2) {
            var quotes = {
              "'": 0.1,
              '"': 0.2
            };
            var replacements = {
              "'": "\\'",
              '"': '\\"',
              "\\": "\\\\",
              "\b": "\\b",
              "\f": "\\f",
              "\n": "\\n",
              "\r": "\\r",
              "	": "\\t",
              "\v": "\\v",
              "\0": "\\0",
              "\u2028": "\\u2028",
              "\u2029": "\\u2029"
            };
            var product = "";
            for (var i2 = 0; i2 < value2.length; i2++) {
              var c2 = value2[i2];
              switch (c2) {
                case "'":
                case '"':
                  quotes[c2]++;
                  product += c2;
                  continue;
                case "\0":
                  if (util.isDigit(value2[i2 + 1])) {
                    product += "\\x00";
                    continue;
                  }
              }
              if (replacements[c2]) {
                product += replacements[c2];
                continue;
              }
              if (c2 < " ") {
                var hexString = c2.charCodeAt(0).toString(16);
                product += "\\x" + ("00" + hexString).substring(hexString.length);
                continue;
              }
              product += c2;
            }
            var quoteChar = quote || Object.keys(quotes).reduce(function(a, b) {
              return quotes[a] < quotes[b] ? a : b;
            });
            product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
            return quoteChar + product + quoteChar;
          }
          function serializeObject(value2) {
            if (stack2.indexOf(value2) >= 0) {
              throw TypeError("Converting circular structure to JSON5");
            }
            stack2.push(value2);
            var stepback = indent;
            indent = indent + gap;
            var keys = propertyList || Object.keys(value2);
            var partial = [];
            for (var i2 = 0, list2 = keys; i2 < list2.length; i2 += 1) {
              var key2 = list2[i2];
              var propertyString = serializeProperty(key2, value2);
              if (propertyString !== void 0) {
                var member = serializeKey(key2) + ":";
                if (gap !== "") {
                  member += " ";
                }
                member += propertyString;
                partial.push(member);
              }
            }
            var final;
            if (partial.length === 0) {
              final = "{}";
            } else {
              var properties;
              if (gap === "") {
                properties = partial.join(",");
                final = "{" + properties + "}";
              } else {
                var separator = ",\n" + indent;
                properties = partial.join(separator);
                final = "{\n" + indent + properties + ",\n" + stepback + "}";
              }
            }
            stack2.pop();
            indent = stepback;
            return final;
          }
          function serializeKey(key2) {
            if (key2.length === 0) {
              return quoteString(key2, true);
            }
            var firstChar = String.fromCodePoint(key2.codePointAt(0));
            if (!util.isIdStartChar(firstChar)) {
              return quoteString(key2, true);
            }
            for (var i2 = firstChar.length; i2 < key2.length; i2++) {
              if (!util.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i2)))) {
                return quoteString(key2, true);
              }
            }
            return key2;
          }
          function serializeArray(value2) {
            if (stack2.indexOf(value2) >= 0) {
              throw TypeError("Converting circular structure to JSON5");
            }
            stack2.push(value2);
            var stepback = indent;
            indent = indent + gap;
            var partial = [];
            for (var i2 = 0; i2 < value2.length; i2++) {
              var propertyString = serializeProperty(String(i2), value2);
              partial.push(propertyString !== void 0 ? propertyString : "null");
            }
            var final;
            if (partial.length === 0) {
              final = "[]";
            } else {
              if (gap === "") {
                var properties = partial.join(",");
                final = "[" + properties + "]";
              } else {
                var separator = ",\n" + indent;
                var properties$1 = partial.join(separator);
                final = "[\n" + indent + properties$1 + ",\n" + stepback + "]";
              }
            }
            stack2.pop();
            indent = stepback;
            return final;
          }
        };
        var JSON55 = {
          parse,
          stringify
        };
        var lib = JSON55;
        var es5 = lib;
        return es5;
      });
    }
  });

  // src/main/constants.ts
  var _INFOS = {
    PROGNAME: "NDS SPA utilities",
    VERSION: "1.0.17-dev",
    AUTHOR: "Martin Mohnhaupt <martin.mohnhaupt@etik.com>",
    LICENCE: "MIT License, https://mit-license.org/",
    INSPIREDBY: {
      HTMX: "HTMX : https://htmx.org/",
      UNPOLY: "UNPOLY : https://unpoly.com/"
    }
  };
  var INFOS = _INFOS;
  var PROGNAME = `${INFOS.PROGNAME} ${INFOS.VERSION}`;
  var VERSION = _INFOS.VERSION;
  var ND_EVENTS = {
    // Core events
    POLL_START: "nd:poll:start",
    POLL_END: "nd:poll:end",
    FRAGMENT_BEFORE_INSERT: "nd:fragment:before_insert",
    FRAGMENT_AFTER_INSERT: "nd:fragment:after_insert",
    FETCH_BEFORE: "nd:fetch:before",
    FETCH_AFTER: "nd:fetch:after",
    FETCH_ERROR: "nd:fetch:error",
    REFRESH_AFTER: "nd:refresh:after",
    NAVIGATION: "nd:navigation",
    // Notifications
    ALERT: "nd:dialog:alert",
    TOAST: "nd:dialog:toast",
    INFO: "nd:dialog:info",
    DECISION: "nd:dialog:decision",
    SECURE: "nd:dialog:secure",
    CUSTOM: "nd:dialog:custom",
    DOWNLOAD: "nd:download",
    // Others
    REDIRECT: "nd:redirect",
    CONTEXT: "nd:context",
    ENVIRONMENT: "nd:environ",
    TITLE: "nd:title",
    CHANGE: "nd:change",
    FORM_RESET: "nd:form:reset",
    RESET: "nd:reset",
    UPDATE: "nd:update",
    ZONE: "nd:zone",
    ITEM: "nd:item",
    SORT: "nd:sort"
  };
  var CONTAINERS = {
    DIALOGS: "nd-dialog-container",
    NOTIFICATIONS: "nd-notification-container",
    BUSY: "nd-busy-container"
  };
  var TOAST_DELAY_MS = 3e3;
  var POLL_DEFAULT_INTERVAL_MS = 1e4;
  var ND_STYLES = `
    :root {
        --nd-border-radius: 5px;
        --nd-border-color: lightgray solid 1px;
    }

    [nd-notification-container] {
        position: absolute;
        left: 50%;
        top: 0;
        width: 100%;
        height: 0;
        transform: translate(-50%, 0%);
        margin-top: 0px;
        z-index: 9000;
    }

    [nd-busy-container] {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        /* background: rgba(0, 0, 0, 0.1); */
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: progress;
    }  

    [nd-spinner] {
        display: block;
        position: absolute;
        z-index: 1000;
        top: 50%;
        left: 50%;
        height: 100px;
        width: 100px;
        margin: -25px 0 0 -25px;
        border: 10px rgba(52, 101, 164, 0.25) solid;
        border-top: 10px #3465a4 solid;
        border-radius: 50%;
        -webkit-animation: spin2 1s infinite linear;
        animation: spin2 1s infinite linear;
    }

    @-webkit-keyframes spin2 {
        from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
    }

    @keyframes spin2 {
        from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
    }

    .nd-modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        /*
        border-radius: var(--nd-border-radius);
        border-color: var(--nd-border-color);
        */
        z-index: 8000;
        cursor: not-allowed;
        /* display: block; */
        border: none;
    }

    .nd-modal-content {
        position: relative;
        left: 50%;
        width: 30%;
        transform: translate(-50%, 0%);

        height: fit-content;
        margin-top: 10px;
        padding: 15px;

        background-color: white;
        border: var(--nd-border-color);
        border-radius: var(--nd-border-radius);
        cursor: auto;
        box-shadow: 8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25);
    }

    .nd-notification {
        position: relative;
        margin-bottom: 5px;
        left: 50%;
        width: 60%;
        transform: translate(-50%, 0%);

       margin-top: 5px;

        border: transparent solid 1px;
        border-radius: var(--nd-border-radius);
        padding-right: 10px;
        background-color: white;
        z-index: 10000;

        display: block; 
        width: 40%;

        box-shadow: 8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25);
    }

    .nd-close {
        position: relative;
        left: 100%;
        top: -30;
        font-size: x-large;
        display: inline-block;
        line-height: 1;
        cursor: pointer;
    }

    .nd-content {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 10px;
    }

    .nd-header {
        padding-bottom: 3px;
        margin-bottom: 5px;
        border-bottom: var(--nd-border-color);
    }

    .nd-footer {
        padding-top: 10px;
        border-top: var(--nd-border-color);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nd-toast {
        position: relative;
        margin-bottom: 5px;
        left: 50%;
        width: 30%;
        transform: translate(-50%, 0%);

        margin-top: 5px;

        border: var(--nd-border-color);
        border-radius: var(--nd-border-radius);
        padding-right: 10px;
        background-color: white;
        z-index: 10000;
        display: block;
        box-shadow: 8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25);
    }

    .nd-toast-header {
        display: inline-block;
    }

    .nd-toast-content {
        margin-left: 20px;
        padding-top: 10px;
        border-top: var(--nd-border-color);
`.trim().replace(/\s+/g, " ").split(" ").join(" ");

  // src/modules/debug.ts
  var Debug = class _Debug {
    static _instance;
    classname = "Debug";
    debug = false;
    filter_items = [];
    filter_override = [];
    warnings = true;
    constructor() {
      if (!!_Debug._instance) {
        return _Debug._instance;
      }
      _Debug._instance = this;
    }
    enable() {
      this.debug = true;
      console.info(`INFO | ${this.classname} | Debugging is enabled.`);
    }
    disable() {
      this.debug = false;
      console.info(`INFO | ${this.classname} | Debugging is disabled.`);
    }
    hide_warnings = () => {
      this.warnings = false;
      console.info(`INFO | ${this.classname} | Warnings are hidden.`);
    };
    show_warnings = () => {
      this.warnings = true;
      console.info(`INFO | ${this.classname} | Warnings are shown.`);
    };
    is_active() {
      return this.debug;
    }
    ignore = (items) => {
      if (!Array.isArray(items)) {
        console.error(`ERROR | ${this.classname} | Function debug.ignore() requires a list of strings as an argument.`);
        return;
      }
      this.filter_items = items;
      this.filter_items.includes("*") ? this.filter_items = ["*"] : {};
      if (this.debug)
        console.log(`INFO | Debug | ${this.classname} ignored source(s) :`, this.filter_items.join(", "));
    };
    force = (items) => {
      if (!Array.isArray(items)) {
        console.error(`ERROR | ${this.classname} | Function debug.force() requires a list of strings as an argument.`);
        return;
      }
      this.filter_override = items;
      if (this.debug)
        console.log(`INFO | Debug | ${this.classname} forced source(s) :`, this.filter_override.join(", "));
    };
    is_filtered(source) {
      if (this.filter_override.length && this.filter_override.includes(source))
        return false;
      let result = true;
      this.filter_items.includes("*") ? result = true : result = this.filter_items.includes(source);
      return result;
    }
  };

  // src/modules/logger.ts
  var Logger = class {
    source;
    debug;
    constructor(source, silent = false) {
      const name = "Logger";
      this.source = source;
      this.debug = new Debug();
      if (!this.debug.is_active())
        return;
      if (this.debug.is_filtered(name))
        return;
      if (!silent)
        console.info(`INFO | ${name} | Creating a logger for ${this.source}`);
    }
    info(...args) {
      if (!this.debug.is_active())
        return;
      if (this.debug.is_filtered(this.source))
        return;
      console.info(`INFO | ${this.source} |`, ...args);
    }
    error(...args) {
      console.error(`ERROR | ${this.source} |`, ...args);
    }
    warn(...args) {
      if (!this.debug.warnings)
        return;
      console.warn(`WARNING | ${this.source} |`, ...args);
    }
  };

  // src/processors/environment_processor.ts
  var import_json5 = __toESM(require_dist());

  // src/processors/abstract_processor.ts
  var AbstractProcessor = class _AbstractProcessor {
    // Stockage des instances par classe concrète
    static instances = /* @__PURE__ */ new Map();
    logger;
    constructor() {
      this.logger = new Logger(this.constructor.name.replace("_", ""), false);
    }
    static getInstance() {
      if (!_AbstractProcessor.instances.has(this)) {
        _AbstractProcessor.instances.set(this, new this());
      }
      return _AbstractProcessor.instances.get(this);
    }
  };

  // src/processors/environment_processor.ts
  var EnvironmentProcessor = class extends AbstractProcessor {
    envs = [];
    // The current environments list of {key, value}
    constructor() {
      super();
      this.logger.info(`Adding a listener to handle '${ND_EVENTS.ENVIRONMENT}' events.`);
      document.addEventListener(ND_EVENTS.ENVIRONMENT, this.event_handler);
      Object.preventExtensions(this);
    }
    get_environment = () => {
      return this.envs;
    };
    update_document = () => {
      this.logger.info(`Updating document. Environment: ${import_json5.default.stringify(this.envs)}.`);
      document.querySelectorAll("[nd-env]").forEach((e) => {
        const key = e.getAttribute("nd-env");
        if (!key) {
          this.logger.error(`No key specified in element`, e);
          return;
        }
        let result = "";
        if (key === "*" && this.envs.length > 0) {
          const env_list = [];
          this.envs.forEach((e2) => {
            env_list.push(`${e2.key}=${e2.value}`);
          });
          result = env_list.join(", ");
        } else {
          const item = this.envs.find((env) => env.key === key);
          result = item ? item.value : "";
        }
        result ? e.innerHTML = result : {};
      });
    };
    process = (fragment) => {
    };
    postprocess = () => {
      this.update_document();
    };
    event_handler = (event) => {
      this.logger.info(`Event: ${event.type}. Data: '${import_json5.default.stringify(event.detail)}'.`);
      const data = event.detail;
      switch (data.action) {
        case "set":
          const result = this.envs.find((env) => env.key === data.key);
          result ? result.value = data.value : this.envs.push({ key: data.key, value: data.value });
          break;
        case "unset":
          const index = this.envs.findIndex((env) => env.key === data.key);
          index >= 0 ? this.envs.splice(index, 1) : {};
          break;
        case "clear":
          this.envs = [];
          break;
      }
      this.update_document();
    };
  };

  // src/modules/fetcher.ts
  var import_json52 = __toESM(require_dist());
  var Fetcher = class _Fetcher {
    static ALLOW_ORIGIN = "http://localhost:8000";
    static ALLOW_METHODS = "GET,POST,PUT,DELETE";
    static METHODS = ["get", "post", "delete", "nav"];
    static _instance;
    logger = new Logger("Fetcher", true);
    events = [];
    busy_indicator = document.querySelector(`[${CONTAINERS.BUSY}]`);
    environment_processor = EnvironmentProcessor.getInstance();
    // Singleton constructor !
    constructor() {
      if (!!_Fetcher._instance) {
        return _Fetcher._instance;
      }
      _Fetcher._instance = this;
    }
    static get = () => {
      return new _Fetcher();
    };
    set_busy = () => {
      this.busy_indicator ? {} : this.busy_indicator = document.querySelector(`[${CONTAINERS.BUSY}]`);
      this.busy_indicator ? this.busy_indicator.style.display = "block" : {};
    };
    set_idle = () => {
      this.busy_indicator ? this.busy_indicator.style.display = "none" : {};
    };
    _process_headers = (headers) => {
      let headers_dump = [];
      headers.forEach((v, k) => {
        headers_dump.push(`'${k}'->'${v}'`);
        const sse = k.toLowerCase();
        switch (sse) {
          case "x-nd-environment":
            const data = import_json52.default.parse(v);
            this.logger.info(`Received server environment '${sse}'. Content: '${v}'.`);
            document.dispatchEvent(new CustomEvent(ND_EVENTS.ENVIRONMENT, { detail: data }));
            break;
          case "x-nd-event":
            this.events = import_json52.default.parse(v);
            this.logger.info(`Received server messages '${sse}'. Content: '${v}'.`);
            break;
          case "x-nd-url":
            break;
        }
      });
      this.logger.info(`Headers : 
${headers_dump.join("\n")}`);
    };
    // Dispatch received events !
    _process_events = (payload) => {
      this.logger.info(`Processing events...`);
      this.events.forEach((event) => {
        this.logger.info(`Event: `, event);
        const type = event.type;
        let target = document;
        switch (type) {
          case ND_EVENTS.DOWNLOAD:
            event.detail.data = payload;
            break;
          case ND_EVENTS.FORM_RESET:
            const form_id = event.detail.form_id;
            target = document.querySelector(`[data-ndtrack="${form_id}"]`);
            !target ? target = document.getElementById(`${form_id}`) : {};
            break;
        }
        const detail = import_json52.default.stringify(event.detail);
        if (target) {
          this.logger.info(`Dispatching event '${type}'. Detail: '${detail}'.`);
          target.dispatchEvent(new CustomEvent(type, { detail: event.detail }));
        } else {
          this.logger.warn(`No target found for event '${type}'. Detail: '${detail}'.`);
        }
      });
      return payload;
    };
    async execute_fetch(request) {
      const url = request.url;
      this.events = [];
      let status = null;
      let data = null;
      request.headers.append("X-Nd-Version", `"${VERSION}"`);
      request.headers.append("X-Nd-Url", `"${request.url}"`);
      request.headers.append("X-Nd-Environment", `${JSON.stringify(this.environment_processor.get_environment())}`);
      document.dispatchEvent(new CustomEvent(ND_EVENTS.FETCH_BEFORE, { detail: { url, data: null, status } }));
      try {
        this.set_busy();
        const response = await fetch(request);
        this.logger.info(`Response status: ${response.status}`);
        if (!response.ok) {
          document.dispatchEvent(new CustomEvent(ND_EVENTS.FETCH_ERROR, { detail: { url, data: null, status: response.status } }));
          this.logger.error(`Response status: ${response.status}`);
          this.set_idle();
          return null;
        }
        this._process_headers(response.headers);
        const payload = await response.blob();
        this.logger.info(`Result is of type '${payload.type}'.`);
        const data2 = await this._process_events(payload).text();
        document.dispatchEvent(new CustomEvent(ND_EVENTS.FETCH_AFTER, { detail: { url, data: data2, status } }));
        this.set_idle();
        return data2;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        document.dispatchEvent(new CustomEvent(ND_EVENTS.FETCH_ERROR, { detail: { url, data: message, status } }));
        this.logger.error(`Error on url '${url}':  ${message}`);
      }
      this.set_idle();
      return null;
    }
    async send_form(form, operation = "accept") {
      const formdata = new FormData(form);
      formdata.append("nd-form_id", form.dataset.ndtrack ?? "");
      formdata.append("nd-form_operation", operation);
      const request = new Request(form.action, {
        method: form.method,
        body: formdata
      });
      return await this.execute_fetch(request);
    }
    async post_form_data(formdata, url) {
      const request = new Request(url, {
        method: "post",
        body: formdata
      });
      return await this.execute_fetch(request);
    }
    _redirect_to = async (url) => {
      if (!url.startsWith("/")) {
        this.logger.error(`Cannot navigate to '${url}'. Only relative URLs are allowed !`);
        return;
      }
      if (url === "/") {
        this.logger.error(`Navigation to '/' is not allowed !`);
        return;
      }
      const request = new Request(url);
      this.logger.info(`Fetching '${url}' in a 'get' request.`);
      const data = await this.execute_fetch(request);
      if (data) {
      }
      document.dispatchEvent(new CustomEvent(ND_EVENTS.NAVIGATION, { detail: { url, data } }));
    };
    /**
     * fetch_data - fetch data from server as text
     */
    async fetch_data(url, payload = {}) {
      let [_method, _url] = ["get", url];
      if (url.includes("::")) {
        const [method, target] = url.split("::");
        _method = method ?? "";
        _url = target ?? "";
        if (!_Fetcher.METHODS.includes(_method)) {
          this.logger.error(`Only ${_Fetcher.METHODS.join(" or ")} URL modifiers are allowed. Supplied method was '${_method}:'.`);
          return;
        }
      }
      if (_method === "nav") {
        await this._redirect_to(_url);
        return;
      }
      let request = null;
      if (_method == "get")
        request = new Request(_url, { method: _method });
      else
        request = new Request(_url, { method: _method, body: import_json52.default.stringify(payload) });
      this.logger.info(`Fetching '${_url}' in a '${_method}' request.`);
      return await this.execute_fetch(request);
    }
    redirect = async (url) => {
      if (!url)
        return;
      url.startsWith("nav::") ? {} : url = "nav::" + url;
      return await this.fetch_data(url);
    };
  };

  // src/syntax/syntax.ts
  var NONE = [];
  var Parameter = class {
    constructor(name) {
      this.name = name;
    }
  };
  var Attribute = class {
    constructor(name, unique, parameters, mandatory, requires_one_of) {
      this.name = name;
      this.unique = unique;
      this.parameters = parameters;
      this.mandatory = mandatory;
      this.requires_one_of = requires_one_of;
    }
  };
  var PARAMETER = class {
    static URL = new Parameter("nd-url");
    static TARGET = new Parameter("nd-target");
    static KEY = new Parameter("nd-key");
    static INTERVAL = new Parameter("nd-interval");
    static ACTION = new Parameter("nd-action");
    static PARAMS = new Parameter("nd-params");
    static DIALOG = new Parameter("nd-dialog");
    static enum = [this.URL, this.TARGET, this.KEY, this.INTERVAL, this.ACTION, this.PARAMS, this.DIALOG];
  };
  var ATTRIBUTE = class _ATTRIBUTE {
    static MAIN = new Attribute("nd-main", true, [PARAMETER.URL, PARAMETER.TARGET], [PARAMETER.URL], NONE);
    static SOURCE = new Attribute("nd-source", false, [PARAMETER.URL, PARAMETER.TARGET], [PARAMETER.URL], NONE);
    static ENV = new Attribute("nd-env", false, [PARAMETER.KEY], [PARAMETER.KEY], NONE);
    static VERSION = new Attribute("nd-version", false, NONE, NONE, NONE);
    static POLL = new Attribute("nd-poll", false, [PARAMETER.URL, PARAMETER.TARGET, PARAMETER.INTERVAL, PARAMETER.ACTION], NONE, [PARAMETER.URL, PARAMETER.ACTION]);
    static NAV = new Attribute("nd-nav", false, [PARAMETER.URL, PARAMETER.TARGET, PARAMETER.DIALOG, PARAMETER.PARAMS], [PARAMETER.URL, PARAMETER.TARGET], NONE);
    static TEST = new Attribute("nd-test", false, [PARAMETER.PARAMS], [PARAMETER.PARAMS], NONE);
    static enum = [this.MAIN, this.SOURCE, this.ENV, this.VERSION, this.POLL, this.NAV, this.TEST];
    static attribute_list = `[${_ATTRIBUTE.enum.map((e) => {
      return e.name;
    }).join("|")}]`;
  };
  var logger = new Logger("FragmentCheck");
  var FragmentCheckResult = class {
    errors = [];
    warnings = [];
    has_errors = () => {
      return this.errors.length > 0;
    };
    has_warnings = () => {
      return this.warnings.length > 0;
    };
    log_all = () => {
      this.errors.forEach((e) => {
        logger.error(e);
      });
      this.warnings.forEach((e) => {
        logger.warn(e);
      });
    };
  };
  var check_fragment = (fragment) => {
    const result = new FragmentCheckResult();
    const check_attribute_unicity = (element) => {
      const has_attr = [];
      ATTRIBUTE.enum.forEach((attr) => {
        has_attr.push(element.hasAttribute(attr.name));
      });
      if (has_attr.filter((v) => v).length > 1) {
        result.errors.push(`Multiple attributes are present on element '${Util.compress(element.outerHTML)}' ! Use one and only one of ${ATTRIBUTE.attribute_list} !`);
      }
    };
    ATTRIBUTE.enum.forEach((attribute) => {
      const elements = fragment.querySelectorAll(`[${attribute.name}]`);
      if (attribute.unique && elements.length > 1) {
        result.errors.push(`There can only be one '${attribute.name}' on the page !`);
      }
      elements.forEach((element) => {
        const html = Util.compress(element.outerHTML);
        const parameters = [];
        logger.info(`Checking attribute '${attribute.name}' on element '${html}'.`);
        check_attribute_unicity(element);
        attribute.parameters.forEach((parameter) => {
          const mandatory = attribute.mandatory.includes(parameter);
          const qualifier = mandatory ? "mandatory" : "optional";
          logger.info(`Checking ${qualifier} parameter '${parameter.name}' of attribute '${attribute.name}'.`);
          if (mandatory && !element.hasAttribute(parameter.name)) {
            result.errors.push(`Mandatory attribute '${parameter.name}' not found on element '${html}' !`);
          }
          if (element.hasAttribute(parameter.name)) {
            parameters.push(parameter);
            const value = element.getAttribute(parameter.name);
            if (!value) {
              result.errors.push(`Attribute '${parameter.name}' on element '${html}' has no value !`);
            }
          }
        });
        if (attribute.requires_one_of.length && !attribute.requires_one_of.some((r) => parameters.includes(r))) {
          result.errors.push(`At least one of [${attribute.requires_one_of.join("|")}] is required on element '${html}'!`);
        }
      });
    });
    result.log_all();
    return result.has_errors() ? "FAILURE" /* FAILURE */ : "SUCCESS" /* SUCCESS */;
  };

  // node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/stringify.js
  var byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }

  // node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/rng.js
  var rnds8 = new Uint8Array(16);
  function rng() {
    return crypto.getRandomValues(rnds8);
  }

  // node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/v4.js
  function v4(options, buf, offset) {
    if (!buf && !options && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return _v4(options, buf, offset);
  }
  function _v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? rng();
    if (rnds.length < 16) {
      throw new Error("Random bytes length must be >= 16");
    }
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      if (offset < 0 || offset + 16 > buf.length) {
        throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
      }
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // src/modules/util.ts
  var import_json53 = __toESM(require_dist());
  var logger2 = new Logger("Util", true);
  var Util = class _Util {
    static randomUUID = () => {
      return v4_default();
    };
    static to_json = (data) => {
      let result = {};
      try {
        result = import_json53.default.parse(data);
      } catch (error) {
        logger2.error(`Error: no valid json data supplied: '${data}'. Please see https://json5.org/.`);
      } finally {
        return result;
      }
    };
    static is_internal_url = (href) => {
      if (!href || href.startsWith("#") || /^(javascript|mailto|tel):/i.test(href)) {
        return true;
      }
      try {
        const targetUrl = new URL(href, window.location.origin);
        return targetUrl.origin === window.location.origin;
      } catch (error) {
        return false;
      }
    };
    static is_root_url = (url) => {
      const _url = url.trim();
      return _url === "/";
    };
    // Source - https://stackoverflow.com/questions/42406520/populate-an-html-form-from-a-formdata-object
    // Source - https://stackoverflow.com/questions/42406520/populate-an-html-form-from-a-formdata-object/79932100#79932100
    static serialize_form(form) {
      const result = [];
      form.querySelectorAll("[name]").forEach((e) => {
        switch (e.type) {
          case "checkbox":
            if (e instanceof HTMLInputElement) {
              result.push(`${e.name}=${e.checked}`);
            }
            break;
          default:
            result.push(`${e.name}=${e.value}`);
            break;
        }
      });
      return result.join("&");
    }
    static deserialize_form = (form, serialized_form_data) => {
      const entries = new URLSearchParams(serialized_form_data).entries();
      for (const [key, val] of entries) {
        const input = form.elements.namedItem(key);
        if (!input)
          continue;
        if (input instanceof RadioNodeList) {
          input.value = val;
        } else if (input instanceof HTMLInputElement) {
          if (input.type === "checkbox") {
            input.checked = !val;
          } else {
            input.value = val;
          }
        } else if (input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement) {
          input.value = val;
        }
      }
    };
    static truncate(input, len = 50) {
      if (typeof input !== "string")
        return input;
      const text = input.trim().replace(/\s+/g, " ").split(" ").join(" ").trim();
      return text.length > len ? `${text.substring(0, len)}...` : text;
    }
    static as_text(element) {
      if (element !== null) {
        return element.outerHTML.replace("<", "&lt").replace(">", "&gt");
      }
      return "???";
    }
    /**
     *  get_targets - get all elements by a selector, eventually return the element (ifempty) if querySelectorAll returns nothing.
     *
     *  @selector: a string with the selector to query (e.g. '#my-id', '.my-class', 'div > p', etc.). If the string is empty or not a string, an empty array is returned.
     *  @ifempty: an element to return if the querySelectorAll returns nothing. If the selector is empty or not a string, this element is returned (if specified).
     *
     *  @return: an array of elements matching the selector, or an array with the element (ifempty) if querySelectorAll returns nothing.
     */
    static get_targets = (selector, ifempty = null) => {
      if (typeof selector !== "string")
        return ifempty ? [ifempty] : [];
      selector = selector.trim().replace(/\s+/g, " ").split(" ").join(",");
      return selector ? Array.from(document.querySelectorAll(selector)) : ifempty ? [ifempty] : [];
    };
    /**
     *  clear_node - delete a specific node.
     *
     *  @param {*} node - the node to clear.
     *  @return: nothing, the function modifies the node in place.
     */
    static clear_node = (node) => {
      logger2.info(`clear_node | node name: '${node.nodeName.toLowerCase()}'`);
      const range = document.createRange();
      range.selectNodeContents(node);
      range.deleteContents();
    };
    /**
     * create_fragment - create a document fragment from HTML code.
     */
    static create_fragment(html) {
      logger2.info(`create_fragment | Content: '${html ? _Util.truncate(html) : ""}'`);
      return document.createRange().createContextualFragment(html);
    }
    static refresh(fragment) {
      for (const [_, handler] of Object.entries(nd_core.handlers)) {
        logger2.info(`Process by ${handler.constructor.name}`);
        handler.process(fragment);
      }
      check_fragment(fragment);
      for (const [_, handler] of Object.entries(nd_core.handlers)) {
        logger2.info(`Postprocess by ${handler.constructor.name}`);
        handler.postprocess();
      }
      const form = fragment.querySelector("form");
      if (form) {
        const first_field = form.querySelector("[autofocus]");
        if (first_field) {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          first_field.focus();
        }
      }
      document.dispatchEvent(new CustomEvent(ND_EVENTS.REFRESH_AFTER, { detail: { fragment } }));
    }
    /**
     * insert_fragment - replace or append a fragment in a specific target.
     *
     * @param {*} target - the target element where the fragment will be inserted.
     * @param {*} fragment - the fragment to insert (must be a DocumentFragment).
     * @param {*} append - if true, the fragment will be appended to the target. If false, the target will be cleared before inserting the fragment. Default is false.
     * @param {*} refresh - if true, the 'refresh' method will be called on the target after inserting the fragment. Default is false.
     * @param {*} new_layer - if true, no global refresh will be triggered after inserting the fragment. Default is false.
     *
     * @return: nothing, the function modifies the DOM in place.
     */
    static insert_fragment = (target, fragment, append = false, refresh = false, new_layer = false) => {
      logger2.info(`insert_fragment | Target: '${target.tagName.toLowerCase()}'. Mode: ${append ? "append" : "replace"}. Refresh: ${refresh ? "yes" : "no"}.`);
      document.dispatchEvent(new CustomEvent(ND_EVENTS.FRAGMENT_BEFORE_INSERT, { detail: { target, fragment, append } }));
      append ? {} : _Util.clear_node(target);
      target.appendChild(fragment);
      const result = target.lastChild;
      if (new_layer)
        return result;
      refresh ? _Util.refresh(target) : {};
      document.dispatchEvent(new CustomEvent(ND_EVENTS.FRAGMENT_AFTER_INSERT, { detail: { target, data: fragment, append } }));
      return result;
    };
    /**
     * sleep_ms - sleep during a specific period (ms).
     */
    static async sleep_ms(ms) {
      logger2.info(`sleep_ms | Timeout: ${ms}ms.`);
      await new Promise((resolve) => setTimeout(resolve, ms));
    }
    /**
     * compress - Compress a string (remove duplicate whitechars).
     */
    static compress(str) {
      if (typeof str !== "string")
        return str;
      logger2.info(`compress | String: '${_Util.truncate(str)}'.`);
      return str.replace(/\n+/g, " ").replace(/\r+/g, " ").replace(/  +/g, " ");
    }
    static navigate_to = async (new_url) => {
      let [method, url] = ["navigate", ""];
      if (new_url.includes("::")) {
        const [parsed_method, parsed_url] = new_url.split("::");
        method = parsed_method ?? "";
        url = parsed_url ?? "";
        if (!["get", "post"].includes(method)) {
          logger2.error(`Only 'get::' or 'post::' url modifiers are allowed. Supplied method was '${method}:'.`);
          return;
        }
      } else {
        url = new_url;
      }
      if (["get", "post"].includes(method)) {
        logger2.info(`Fetching url '${url} with a '${method}' request.`);
        const request = new Request(url, { method: method.toUpperCase() });
        await nd_core.fetcher.execute_fetch(request);
        return;
      }
      let result = false;
      document.querySelectorAll("[nd-link]").forEach((link) => {
        const nd_url = link.getAttribute("nd-url");
        const href = link.getAttribute("href");
        if (href === new_url || nd_url === new_url) {
          link.click();
          result = true;
          return;
        }
      });
      logger2.warn(`navigate_to | Url: '${new_url}'. Link: ${result ? "found" : "not found"}.`);
      return result;
    };
    static open_layer = (html, mode) => {
      let container = null;
      const fragment = _Util.create_fragment(html);
      switch (mode) {
        case 1 /* MODAL */:
          container = document.querySelector(`[${CONTAINERS.DIALOGS}]`);
          break;
        case 2 /* TRANSIENT */:
          container = document.querySelector(`[${CONTAINERS.NOTIFICATIONS}]`);
          break;
        default:
          logger2.error(`Unknown layer mode : '${mode}'.`);
          return null;
      }
      if (!container)
        return null;
      const new_element = _Util.insert_fragment(container, fragment, true, true, true);
      if (new_element instanceof HTMLElement)
        _Util.refresh(new_element);
      return new_element;
    };
    static action_detail_dict = (arr) => {
      let result = {};
      if (!(arr instanceof Array))
        return result;
      let index = 0;
      arr.forEach((arg) => {
        if (arg instanceof Object && arg.length > 0) {
          result["detail"] = arg[0];
        } else {
          result[`arg${index++}`] = arg;
        }
      });
      return result;
    };
  };

  // src/components/notifications/abstract_notification.ts
  var logger3 = new Logger("Notification");
  var AbstractNotification = class {
    uuid = Util.randomUUID();
    html;
    dialog_instance;
    close_btn;
    on_close_handler = () => {
      this.close_btn?.removeEventListener("click", this.on_close_handler);
      this.dialog_instance.remove();
    };
    render = () => {
      this.dialog_instance = Util.open_layer(this.html, 2 /* TRANSIENT */);
      this.close_btn = this.dialog_instance.querySelector("[nd-close]");
      this.close_btn?.addEventListener("click", this.on_close_handler);
      setTimeout(() => {
        this.on_close_handler();
      }, TOAST_DELAY_MS);
    };
  };

  // src/components/notifications/alert.ts
  var HTML_TEMPLATE = `
<div nd-notification id="$id" class="nd-notification bg-$severity-subtle">
    <div class="nd-content">
        <span nd-close class="nd-close">&times;</span>
        $message
    </div>
</div>`;
  var Alert = class extends AbstractNotification {
    constructor(severity, message) {
      super();
      this.severity = severity;
      this.message = message;
      this.html = HTML_TEMPLATE.replace("$id", this.uuid).replace("$severity", this.severity).replace("$message", this.message);
    }
  };

  // src/components/notifications/toast.ts
  var HTML_TEMPLATE2 = `
<div nd-notification id="$id" class="nd-toast" role="alert">
    <div class="nd-content">
        <span nd-close class="nd-close">&times;</span>
        <h5 class="nd-toast-header">$title</h5>
        <div class="nd-toast-content">$message</div>
    </div>
</div>`;
  var Toast = class extends AbstractNotification {
    constructor(title, message) {
      super();
      this.title = title;
      this.message = message;
      this.html = HTML_TEMPLATE2.replace("$id", this.uuid).replace("$title", this.title).replace("$message", this.message);
    }
  };

  // src/main/core.ts
  var Core = class _Core {
    static _instance;
    logger = new Logger("Core", true);
    version = `${INFOS.PROGNAME} ${INFOS.VERSION}`;
    fetcher = new Fetcher();
    debug = new Debug();
    util = Util;
    handlers = [];
    trackers = [];
    main_container;
    alert = (severity, message) => {
      new Alert(severity, message).render();
    };
    toast = (title, message) => {
      new Toast(title, message).render();
    };
    constructor() {
      if (!!_Core._instance) {
        return _Core._instance;
      }
      _Core._instance = this;
      Object.preventExtensions(this);
    }
    set_main_container = () => {
      const nd_main = document.querySelector("[nd-main]");
      nd_main ? this.main_container = nd_main : this.logger.warn(`No 'nd-main' element found in the document !`);
    };
    static init = () => {
      return new Promise((resolve) => {
        resolve(new _Core());
      });
    };
  };

  // src/trackers/handler_tracker.ts
  var TrackedItem = class {
    weakref;
    trackid;
    event;
    handler;
    use_capture;
    constructor(weakref, trackid, event, handler, use_capture) {
      this.weakref = weakref;
      this.trackid = trackid;
      this.event = event;
      this.handler = handler;
      this.use_capture = use_capture;
    }
  };
  var HandlerTracker = class extends AbstractProcessor {
    tracked_handlers = [];
    // A list of TrackedItems
    constructor() {
      super();
    }
    process = (fragment) => {
    };
    /**
     * Postprocess method to be called after each DOM update to remove event listeners from elements that are no longer in the DOM.
     * It checks each tracked handler and if the element is no longer in the DOM, it removes the event listener and removes the handler from the tracked list.
     * It also logs the number of handlers removed and kept after the postprocessing.
     */
    postprocess = () => {
      const tracker_count = this.tracked_handlers.length;
      this.logger.info(`Postprocessing : ${tracker_count} handler(s) to check.`);
      if (this.tracked_handlers.length === 0)
        return;
      let deleted_count = 0;
      this.tracked_handlers.slice().forEach((item) => {
        const uuid = item.trackid;
        const selector = `[data-ndtrack="${uuid}"]`;
        if (document.querySelector(selector))
          return;
        const element = item.weakref.deref();
        if (element) {
          element.removeEventListener(item.event, item.handler, item.use_capture);
          this.logger.info(`Removed '${item.event}' handler on '${element.tagName.toLowerCase()}' (${uuid}).`);
        } else {
          this.logger.info(`Element '${uuid}' already went to garbage (GC).`);
        }
        const index = this.tracked_handlers.findIndex(({ trackid }) => trackid === uuid);
        this.tracked_handlers.splice(index, 1);
        deleted_count++;
      });
      this.logger.info(`Postprocessing : ${deleted_count} handler(s) removed.`);
      this.logger.info(`Handler(s) remaining : ${this.tracked_handlers.length}.`);
    };
    /**
     * Adds an event listener to an element and tracks it. It uses the _register_listener method to register the event listener and track it.
     * If the element doesn't have a 'data-ndtrack' attribute, it will be generated automatically.
     *
     * @param {*} element
     * @param {*} event
     * @param {*} handler
     * @param {*} use_capture
     */
    add_listener = (element, event, handler, use_capture = false) => {
      const trackid = element.dataset.ndtrack ?? Util.randomUUID();
      element.dataset.ndtrack = trackid;
      const weakref = new WeakRef(element);
      weakref.deref()?.addEventListener(event, handler, use_capture);
      const tracked_item = new TrackedItem(weakref, trackid, event, handler, use_capture);
      this.tracked_handlers.push(tracked_item);
      this.logger.info(`Tracking '${event}' handler on element '${element.tagName.toLowerCase()}' (${trackid}).`);
      this.logger.info(`Total handler(s): ${this.tracked_handlers.length}.`);
    };
  };

  // src/modules/source.ts
  var Source = class {
    constructor(element, type) {
      this.element = element;
      this.type = type;
      check_fragment(element);
      this.logger = new Logger(`Source (${type.name})`, true);
      this.url = element.getAttribute(PARAMETER.URL.name)?.trim() ?? "";
      this.target = element.getAttribute(PARAMETER.TARGET.name)?.trim() ?? "";
      this.targets = this.target ? Array.from(document.querySelectorAll(this.target)) : [this.element];
      if (!this.url) {
        this.logger.error(`No valid URL defined in '${this.type.name}' on element`, element);
        element.innerHTML = `<span style="color: red">Error: no valid url defined in '${this.type.name}' on element &lt;${element.tagName.toLowerCase()}... /"&gt;</span>`;
        return;
      }
      if (this.url === "/") {
        this.logger.error(`The URL in '${this.type.name}' cannot be the root url (/) !`, this.element);
        return;
      }
      if (type === ATTRIBUTE.SOURCE) {
        new HandlerTracker().add_listener(this.element, ND_EVENTS.RESET, this.refresh);
      }
      this.refresh();
      if (this.type === ATTRIBUTE.MAIN) {
        this.element.removeAttribute(ATTRIBUTE.MAIN.name);
        this.element.removeAttribute(PARAMETER.URL.name);
        this.element.removeAttribute(PARAMETER.TARGET.name);
      }
    }
    logger;
    url = "";
    target = "";
    targets = [];
    refresh = () => {
      this.logger.info(`Fetching data from '${this.url}'...`);
      new Fetcher().fetch_data(this.url).then((data) => {
        if (data) {
          this.targets.forEach((element) => {
            const fragment = Util.create_fragment(data);
            Util.insert_fragment(element, fragment, false, true);
          });
        } else {
          this.logger.warn(`Url '${this.url}' returned no data !`);
          this.element.innerHTML = `<span style="color: red">Error: url '${this.url}' returned no data for element ${Util.as_text(this.element)}</span>`;
        }
      });
    };
  };

  // src/processors/source_processor.ts
  var SourceProcessor = class extends AbstractProcessor {
    constructor() {
      super();
    }
    process = (fragment) => {
      fragment.querySelectorAll(`[${ATTRIBUTE.MAIN.name}]`).forEach((element) => {
        new Source(element, ATTRIBUTE.MAIN);
      });
      fragment.querySelectorAll(`[${ATTRIBUTE.SOURCE.name}]`).forEach((element) => {
        new Source(element, ATTRIBUTE.SOURCE);
      });
    };
    postprocess = () => {
    };
  };

  // src/modules/action.ts
  var import_json54 = __toESM(require_dist());
  var ACTION_MODIFIERS = ["before", "after"];
  var LOGGER = new Logger("Action", true);
  var noop = () => {
  };
  var ActionDetail = class {
    when = null;
    url = null;
    source = null;
    targets = [];
    str_data = "";
    json_data = {};
  };
  var Action = class {
    logger;
    code;
    when;
    action;
    details;
    constructor(element) {
      this.logger = LOGGER;
      this.code = null;
      this.when = null;
      this.action = noop;
      this.details = new ActionDetail();
      const action = element.getAttribute("nd-action");
      if (!action)
        return;
      this.details.source = element;
      const href = element.getAttribute("href");
      const nd_url = element.getAttribute("nd-url");
      this.details.url = href ? href : nd_url ? nd_url : null;
      const selector = element.getAttribute("nd-target");
      this.details.targets = selector ? Util.get_targets(selector) : [];
      if (action.includes("::")) {
        [this.when, this.code] = action.split("::");
        if (!ACTION_MODIFIERS.includes(this.when)) {
          this.logger.error(`Only ${ACTION_MODIFIERS.join(", ")} action modifiers are allowed. Element :`, element);
          return;
        }
      } else {
        this.code = action;
        this.when = "before";
      }
      this.details.when = this.when;
      this.details.url ? {} : this.when = "before";
      this.action = new Function(this.code);
    }
    // Method to set target elements after the action has been created, allowing for dynamic updates to the targets.
    set_targets = (targets) => {
      this.details.targets = targets;
    };
    // Method to execute the action function with the provided data and log the execution.
    excecute = (data = "") => {
      this.logger.info(`Executing '${this.code}', ${this.when} fetch.`);
      this.details.str_data = data;
      try {
        this.details.json_data = import_json54.default.parse(data);
      } catch (e) {
      }
      this.action.call(null, this.details);
    };
  };

  // src/modules/poll.ts
  var LOGGER2 = new Logger("Poll", true);
  var Poll = class {
    logger;
    element;
    uuid;
    url;
    interval_ms;
    targets_selector;
    action;
    can_poll;
    constructor(element) {
      this.logger = LOGGER2;
      this.element = element;
      this.uuid = "";
      this.url = "";
      this.interval_ms = 0;
      this.targets_selector = "";
      this.action = null;
      this.can_poll = false;
      const has_url = element.hasAttribute("href") || element.hasAttribute("nd-url");
      const has_action = element.hasAttribute("nd-action");
      if (!(has_url || has_action)) {
        this.logger.error(`No 'nd-url' or 'nd-action' is defined on element`, element);
        return;
      }
      const href = element.getAttribute("href");
      this.url = href ? href : element.getAttribute("nd-url") || "";
      const interval = element.getAttribute("nd-interval");
      let interval_ms;
      if (!interval || isNaN(Number(interval))) {
        interval_ms = POLL_DEFAULT_INTERVAL_MS;
      } else {
        interval_ms = Number(interval);
        interval_ms = interval_ms < 1e3 ? 1e3 : interval_ms;
      }
      this.interval_ms = interval_ms;
      this.targets_selector = element.getAttribute("nd-target") || "";
      this.action = has_action ? new Action(element) : null;
      this.can_poll = true;
    }
    poll = () => {
      if (!this.can_poll) {
        this.logger.info("Element not fully initialized. Poll skipped.");
        return;
      }
      if (document.hidden) {
        this.logger.info("The document is hidden. Poll skipped.");
        return;
      }
      const targets = Util.get_targets(this.targets_selector, this.element);
      this.action ? this.action.set_targets(targets) : {};
      if (this.action && this.action.when == "before") {
        this.logger.info(`Executing action 'before::${this.action.code}'`);
        this.action.excecute();
      }
      if (this.url) {
        this.logger.info(`Fetching url '${this.url}'...`);
        new Fetcher().fetch_data(this.url).then((data) => {
          targets.forEach((t) => {
            if (data) {
              const fragment = Util.create_fragment(data);
              Util.insert_fragment(t, fragment, false, true);
            } else {
              this.logger.warn(`Fetching url '${this.url}' returned no data.`, this);
            }
            if (this.action && this.action.when == "after")
              this.action.excecute(data ?? void 0);
          });
        });
      }
    };
  };

  // src/trackers/timer_tracker.ts
  var TrackedTimer = class {
    timer_id;
    timeout_ms;
    uuid;
    constructor(element, timer_id, timeout_ms) {
      this.uuid = element.dataset.ndtimer ?? Util.randomUUID();
      element.dataset.ndtimer = this.uuid;
      this.timer_id = timer_id;
      this.timeout_ms = timeout_ms;
    }
  };
  var TimerTracker = class extends AbstractProcessor {
    timers = [];
    constructor() {
      super();
    }
    process = (fragment) => {
    };
    /**
     * Postprocess method to clean up timers associated with elements that are no longer in the DOM.
     * It iterates through the list of tracked timers and removes any timers associated with elements that are not present in the document.
     */
    postprocess = () => {
      this.logger.info(`Postprocessing : ${this.timers.length} timer(s) to check.`);
      if (this.timers.length === 0)
        return;
      this.timers.slice().forEach((timer, index) => {
        if (!document.querySelector(`[data-ndtimer="${timer.uuid}"]`)) {
          this.remove_timer(timer.uuid);
        }
      });
      this.logger.info(`Postprocessing : ${this.timers.length} timer(s) remaining.`);
    };
    /**
     * Register a timer associated with an element in the DOM.
     *
     * @param {Element} element - The DOM element associated with the timer.
     * @param {number} timer_id - The ID of the timer returned by setTimeout or setInterval.
     * @param {number} timeout_ms - The timeout duration in milliseconds (optional).
     * @returns {void}
     */
    register_timer = (element, timer_id, timeout_ms) => {
      const _element = element;
      const tracked_item = new TrackedTimer(_element, timer_id, timeout_ms);
      this.timers.push(tracked_item);
      this.logger.info(`Now tracking timer '${timer_id}' (${timeout_ms}ms) on element '${_element.tagName.toLowerCase()}' (${_element.dataset.ndtimer}).`);
      this.logger.info(`Total timer(s): ${this.timers.length}.`);
    };
    /**
     * Remove a timer associated with an element in the DOM.
     * The timer is cleared and removed from the list of tracked timers.
     *
     * @param {string} uuid - The UUID of the element associated with the timer to be removed.
     * @returns {void}
     */
    remove_timer = (uuid) => {
      const tracked_item = this.timers.find((t) => t.uuid === uuid);
      if (tracked_item) {
        clearTimeout(tracked_item.timer_id);
        const index = this.timers.indexOf(tracked_item);
        this.timers.splice(index, 1);
        this.logger.info(`Cleared and removed timer #${tracked_item.timer_id} (${tracked_item.timeout_ms}ms) on element ${tracked_item.uuid}.`);
        this.logger.info(`Timer(s) remaining: ${this.timers.length}.`);
      } else {
        this.logger.warn(`Timer with nduuid=${uuid} not found.`);
      }
    };
  };

  // src/processors/poll_processor.ts
  var PollProcessor = class extends AbstractProcessor {
    constructor() {
      super();
    }
    /**
     * Process a given fragment.
     */
    process = (fragment) => {
      fragment.querySelectorAll(`[nd-poll]`).forEach((element) => {
        const poller = new Poll(element);
        this.start(poller);
      });
    };
    postprocess = () => {
    };
    /**
     * Start a timer to poll the given poller.
     * The timer is registered in the TimerTracker to be cleared if the element is removed from the DOM.
     * The timer is cleared and removed from the TimerTracker when the poller is executed.
     * The timer is restarted after the poller is executed.
     *
     * @param {Poll} poller - The Poll instance to be polled.
     * @returns {void}
     */
    start = (poller) => {
      const timeout_id = setTimeout(() => {
        this.run_poller(poller);
      }, poller.interval_ms);
      TimerTracker.getInstance().register_timer(poller.element, timeout_id, poller.interval_ms);
    };
    /**
     * Run the poller and restart the timer.
     * The timer is cleared and removed from the TimerTracker when the poller is executed.
     * The timer is restarted after the poller is executed.
     *
     * @param {*} poller - The Poll instance to be polled.
     * @returns {void}
     */
    run_poller = (poller) => {
      this.logger.info(`Polling ${poller.url} for element ${poller.element.dataset.ndtimer}...`);
      const timerId = poller.element.dataset.ndtimer;
      timerId !== void 0 ? TimerTracker.getInstance().remove_timer(timerId) : {};
      poller.poll();
      this.start(poller);
    };
  };

  // src/processors/version_handler.ts
  var VersionHandler = class extends AbstractProcessor {
    constructor() {
      super();
    }
    /**
     * Process a given fragment.
     */
    process = (fragment) => {
      if (document.querySelectorAll("[nd-version]").length == 0)
        return;
      fragment.querySelectorAll(`[nd-version]`).forEach((element) => {
        this.logger.info(`Processing element`, element);
        element.textContent = nd_core.version;
      });
    };
    /**
     * Clean the DOM
     */
    postprocess = () => {
    };
  };

  // src/modules/parameter.ts
  var logger4 = new Logger("Parameters");
  var Parameter2 = class {
    constructor(element) {
      this.element = element;
      const data = (element.getAttribute(PARAMETER.PARAMS.name) || "").trim();
      this.data = data ? Util.to_json(data) : {};
    }
    data = {};
    get = (key, deflt = null) => {
      return this.data[key] || deflt;
    };
    set = (key, value, replace = false) => {
      this.data[key] = key in this.data && !replace ? this.data[key] : value;
      return this.data[key];
    };
    all = () => {
      return this.data;
    };
    dump = () => {
      for (const key in this.data) {
        logger4.info(`'${key}' -> '${this.data[key]}'`);
      }
    };
  };

  // src/components/dialogs/abstract_dialog.ts
  var logger5 = new Logger("Dialog");
  var AbstractDialog = class {
    constructor(element, dialog_template) {
      this.dialog_template = dialog_template;
      const template_id = (element.getAttribute(PARAMETER.DIALOG.name) || "").trim();
      this.template = document.getElementById(template_id);
      this.params = new Parameter2(element);
      if (this.template) {
        for (var p in this.template.dataset) {
          this.params.set(p, this.template.dataset[p]);
        }
      } else {
        logger5.error(`Template '${template_id}' not found, using default values.`);
      }
    }
    uuid = Util.randomUUID();
    template;
    params;
    dialog_instance;
    return_value = "" /* NONE */;
    render = () => {
      let html = this.dialog_template;
      html = html.replace("$id", this.uuid);
      for (const key in this.params.all()) {
        html = html.replace("$" + key, this.params.get(key));
      }
      this.dialog_instance = Util.open_layer(html, 1 /* MODAL */);
      this.attach_event_handlers();
      this.dialog_instance?.setAttribute("open", "");
    };
    execute = () => {
      return new Promise(async (resolve) => {
        logger5.info(`Executing dialog '${this.uuid}'...`);
        this.render();
        logger5.info("Awaiting an action...");
        while (this.return_value === "" /* NONE */) {
          await new Promise((res) => setTimeout(res, 100));
        }
        logger5.info(`Resolving promise (${this.uuid}) . Result: '${this.return_value}'.`);
        resolve(this.return_value);
      });
    };
  };

  // src/components/dialogs/confirm_dialog.ts
  var HTML_TEMPLATE3 = `
<dialog id="$id" class="nd-modal" role="document">
    <div class="nd-modal-content">
        <h5 class="nd-header">$title</h5>
        <div class="mb-1">$message</div>
        <div class="nd-footer">
            <button nd-accept class="btn btn-danger me-2" style="width: 7rem">$accept_label</button>
            <button nd-dismiss class="btn btn-primary" style="width: 7rem">$dismiss_label</button>
        </div>
    </div>
</dialog>`;
  var DEFAULTS = {
    title: "Confirm dialog title (unset)",
    message: "Confirm message (unset)",
    accept_label: "?Confirm",
    dismiss_label: "?Dismiss"
  };
  var DlgConfirm = class extends AbstractDialog {
    constructor(element) {
      super(element, HTML_TEMPLATE3);
      this.element = element;
      for (let key in DEFAULTS) {
        this.params.set(key, DEFAULTS[key]);
      }
    }
    accept_btn;
    dismiss_btn;
    accept_handler = (e) => {
      this.return_value = "ACCEPT" /* ACCEPT */;
      this.close();
    };
    dismiss_handler = (e) => {
      this.return_value = "DISMISS" /* DISMISS */;
      this.close();
    };
    attach_event_handlers = () => {
      this.accept_btn = this.dialog_instance?.querySelector("[nd-accept]");
      this.dismiss_btn = this.dialog_instance?.querySelector("[nd-dismiss]");
      this.accept_btn?.addEventListener("click", this.accept_handler);
      this.dismiss_btn?.addEventListener("click", this.dismiss_handler);
    };
    close = () => {
      this.accept_btn?.removeEventListener("click", this.accept_handler);
      this.dismiss_btn?.removeEventListener("click", this.dismiss_handler);
      this.dialog_instance?.remove();
    };
  };

  // src/components/dialogs/info_dialog.ts
  var HTML_TEMPLATE4 = `
<dialog id="$id" class="nd-modal" role="document">
    <div class="nd-modal-content">
        <h5 class="nd-header">$title</h5>
        <div class="mb-1">$message</div>
        <div class="nd-footer">
            <button nd-accept class="btn btn-danger me-2" style="width: 7rem">$accept_label</button>
        </div>
    </div>
</dialog>`;
  var DEFAULTS2 = {
    title: "Info dialog title (unset)",
    message: "Info message (unset)",
    accept_label: "?Confirm"
  };
  var DlgInfo = class extends AbstractDialog {
    constructor(element) {
      super(element, HTML_TEMPLATE4);
      this.element = element;
      for (let key in DEFAULTS2) {
        this.params.set(key, DEFAULTS2[key]);
      }
    }
    accept_btn;
    accept_handler = () => {
      this.return_value = "ACCEPT" /* ACCEPT */;
      this.close();
    };
    close = () => {
      this.accept_btn?.removeEventListener("click", this.accept_handler);
      this.dialog_instance?.remove();
    };
    attach_event_handlers = () => {
      this.accept_btn = this.dialog_instance?.querySelector("[nd-accept]");
      this.accept_btn?.addEventListener("click", this.accept_handler);
    };
  };

  // src/components/dialogs/secure_confirm_dialog.ts
  var HTML_TEMPLATE5 = `
<dialog id="$id" class="nd-modal" role="document">
    <div class="nd-modal-content">
        <h5 class="nd-header">$title</h5>
        <div class="mb-1">$message</div>
        <div class="nd-footer">
            <div class="col-6">
                <input nd-confirm type="checkbox"><label><i class="bi bi-arrow-left ms-2 me-1"></i>$confirm_label</label>
            </div>
            <div class="col-6 text-end">
                <button nd-accept class="btn btn-danger me-2" style="width: 7rem" disabled>$accept_label</button>
                <button nd-dismiss class="btn btn-primary" style="width: 7rem">$dismiss_label</button>
            <div>
        </div>
    </div>
</dialog>`;
  var DEFAULTS3 = {
    title: "Confirm dialog title (unset)",
    message: "Confirm message (unset)",
    confirm_label: "Please confirm !",
    accept_label: "?Confirm",
    dismiss_label: "?Dismiss"
  };
  var DlgSecureConfirm = class extends AbstractDialog {
    constructor(element) {
      super(element, HTML_TEMPLATE5);
      this.element = element;
      for (let key in DEFAULTS3) {
        this.params.set(key, DEFAULTS3[key]);
      }
    }
    accept_btn;
    dismiss_btn;
    confirm_cb;
    accept_handler = () => {
      this.return_value = "ACCEPT" /* ACCEPT */;
      this.close();
    };
    dismiss_handler = () => {
      this.return_value = "DISMISS" /* DISMISS */;
      this.close();
    };
    // Confirmation checkbox event handler
    confirm_cb_handler = () => {
      if (this.confirm_cb?.checked) {
        this.accept_btn ? this.accept_btn.disabled = false : {};
      } else {
        this.accept_btn ? this.accept_btn.disabled = true : {};
      }
    };
    attach_event_handlers = () => {
      this.accept_btn = this.dialog_instance?.querySelector("[nd-accept]");
      this.dismiss_btn = this.dialog_instance?.querySelector("[nd-dismiss]");
      this.confirm_cb = this.dialog_instance?.querySelector("[nd-confirm]");
      this.accept_btn?.addEventListener("click", this.accept_handler);
      this.dismiss_btn?.addEventListener("click", this.dismiss_handler);
      this.confirm_cb.addEventListener("click", this.confirm_cb_handler);
    };
    close = () => {
      this.accept_btn?.removeEventListener("click", this.accept_handler);
      this.dismiss_btn?.removeEventListener("click", this.dismiss_handler);
      this.dismiss_btn?.removeEventListener("click", this.confirm_cb_handler);
      this.dialog_instance?.remove();
    };
  };

  // src/components/dialogs/dialog_factory.ts
  var logger6 = new Logger("DialogFactory");
  var dialog_types = ["info", "confirm", "validate"];
  var DialogFactory = class {
    static create = (element) => {
      if (!element.hasAttribute(PARAMETER.DIALOG.name))
        return null;
      const template_id = element.getAttribute(PARAMETER.DIALOG.name)?.trim();
      if (!template_id) {
        logger6.error(`The dialog template must have a valid 'id'.`);
        return null;
      }
      const template = document.getElementById(template_id);
      if (!template) {
        logger6.error(`No template with id='${template_id}' found on page.`);
        return null;
      }
      const dialog_type = template.dataset["type"];
      if (!dialog_type) {
        logger6.error(`Template '${template_id}' has no 'data-type' attribute.`);
        return null;
      }
      if (!dialog_types.includes(dialog_type)) {
        logger6.error(`Template '${template_id}', the dialog type must be one of '${dialog_types.join(", ")}'.`);
        return null;
      }
      switch (dialog_type) {
        case "info":
          return new DlgInfo(element);
        case "confirm":
          return new DlgConfirm(element);
        case "validate":
          return new DlgSecureConfirm(element);
        default:
          return null;
      }
    };
  };

  // src/modules/nav.ts
  var logger7 = new Logger("Nav");
  var handler_tracker = HandlerTracker.getInstance();
  var Nav = class {
    // private confirm_dialog: DlgConfirm | null = null;
    constructor(element) {
      this.element = element;
      const url = (element.getAttribute(PARAMETER.URL.name) || "").trim();
      const target = (element.getAttribute(PARAMETER.TARGET.name) || "").trim();
      if (!Util.is_internal_url(url)) {
        logger7.error(`Invalid URL '${url}' on element '${element.outerHTML}'.`);
        return;
      }
      this.url = url;
      this.targets = Util.get_targets(target);
      element instanceof HTMLAnchorElement ? element.setAttribute("href", url) : {};
      this.element.style.cursor = "pointer";
      handler_tracker.add_listener(element, "click", this.click_handler);
    }
    url = "";
    targets = [];
    click_handler = async (event) => {
      event.preventDefault();
      const dialog = DialogFactory.create(this.element);
      const do_proceed = dialog ? await dialog.execute() === "ACCEPT" /* ACCEPT */ : true;
      if (!do_proceed)
        return;
      const payload = {};
      Fetcher.get().fetch_data(this.url, payload).then((data) => {
        if (data) {
          this.targets.forEach((target) => {
            switch (target.tagName) {
              case "INPUT":
                target.value = data;
                break;
              default:
                const fragment = Util.create_fragment(data);
                Util.insert_fragment(target, fragment, false, true);
            }
          });
        }
      });
    };
  };

  // src/processors/nav_processor.ts
  var NavProcessor = class _NavProcessor extends AbstractProcessor {
    static definition = ATTRIBUTE.NAV;
    constructor() {
      super();
    }
    process(fragment) {
      const elements = fragment.querySelectorAll(`[${_NavProcessor.definition.name}]`);
      elements.forEach((element) => {
        this.logger.info(`Processing '${_NavProcessor.definition.name}' on element`, element);
        if (check_fragment(element) == "SUCCESS" /* SUCCESS */) {
          new Nav(element);
        }
      });
    }
    postprocess() {
    }
  };

  // src/processors/test_processor.ts
  var logger8 = new Logger("Test");
  var TestProcessor = class _TestProcessor extends AbstractProcessor {
    static definition = ATTRIBUTE.TEST;
    constructor() {
      super();
    }
    process(fragment) {
      const elements = fragment.querySelectorAll(`[${_TestProcessor.definition.name}]`);
      elements.forEach((element) => {
        this.logger.info(`Processing '${_TestProcessor.definition.name}' on element`, element);
        if (check_fragment(element) == "SUCCESS" /* SUCCESS */) {
          new Parameter2(element);
        }
      });
    }
    postprocess() {
    }
  };

  // src/main/main.ts
  var initialize_document = () => {
    const styles = `<style id="nd-style">${ND_STYLES}</style>`;
    const containers = `<!-- Notification, dialog and busy containers --><div ${CONTAINERS.NOTIFICATIONS}></div><div ${CONTAINERS.DIALOGS}></div><div ${CONTAINERS.BUSY}><div nd-spinner></div></div>`;
    let fragment = Util.create_fragment(styles);
    document.querySelector("head")?.lastElementChild?.after(fragment);
    fragment = Util.create_fragment(containers);
    document.querySelector("body")?.firstElementChild?.before(fragment);
  };
  console.info(`INFO | Core | ${PROGNAME} : initializing...`);
  Core.init().then((core) => {
    nd_core = core;
  });
  var on_dom_loaded = () => {
    removeEventListener("DOMContentLoaded", on_dom_loaded);
    initialize_document();
    nd_core.set_main_container();
    console.info(`INFO | Core | ${PROGNAME} : ready !`);
    check_fragment(document.body);
    nd_core.handlers = [
      SourceProcessor.getInstance(),
      PollProcessor.getInstance(),
      TimerTracker.getInstance(),
      HandlerTracker.getInstance(),
      VersionHandler.getInstance(),
      NavProcessor.getInstance(),
      TestProcessor.getInstance()
    ];
    Util.refresh(document.body);
  };
  addEventListener("DOMContentLoaded", on_dom_loaded);
})();
