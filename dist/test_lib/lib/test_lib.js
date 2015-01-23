System.register("test_lib/test_lib", ["facade/dom"], function($__export) {
  "use strict";
  var __moduleName = "test_lib/test_lib";
  var DOM,
      describe,
      xdescribe,
      ddescribe,
      it,
      xit,
      iit,
      beforeEach,
      afterEach,
      expect,
      IS_DARTIUM,
      SpyObject;
  function mapToString(m) {
    if (!m) {
      return '' + m;
    }
    var res = [];
    m.forEach((function(v, k) {
      res.push((k + ":" + v));
    }));
    return ("{ " + res.join(',') + " }");
  }
  function el(html) {
    return DOM.createTemplate(html).content.firstChild;
  }
  $__export("el", el);
  return {
    setters: [function(m) {
      DOM = m.DOM;
    }],
    execute: function() {
      describe = $__export("describe", window.describe);
      xdescribe = $__export("xdescribe", window.xdescribe);
      ddescribe = $__export("ddescribe", window.ddescribe);
      it = $__export("it", window.it);
      xit = $__export("xit", window.xit);
      iit = $__export("iit", window.iit);
      beforeEach = $__export("beforeEach", window.beforeEach);
      afterEach = $__export("afterEach", window.afterEach);
      expect = $__export("expect", window.expect);
      IS_DARTIUM = $__export("IS_DARTIUM", false);
      window.print = function(msg) {
        if (window.dump) {
          window.dump(msg);
        } else {
          window.console.log(msg);
        }
      };
      window.beforeEach(function() {
        jasmine.addMatchers({
          toEqual: function(util, customEqualityTesters) {
            return {compare: function(actual, expected) {
                var pass;
                if (actual instanceof Map) {
                  pass = actual.size === expected.size;
                  if (pass) {
                    actual.forEach((function(v, k) {
                      pass = pass && util.equals(v, expected.get(k));
                    }));
                  }
                  return {
                    pass: pass,
                    get message() {
                      return ("Expected " + mapToString(actual) + " " + (pass ? 'not' : '') + " to equal to " + mapToString(expected));
                    }
                  };
                } else {
                  return {pass: util.equals(actual, expected)};
                }
              }};
          },
          toBePromise: function() {
            return {compare: function(actual, expectedClass) {
                var pass = typeof actual === 'object' && typeof actual.then === 'function';
                return {
                  pass: pass,
                  get message() {
                    return 'Expected ' + actual + ' to be a promise';
                  }
                };
              }};
          },
          toBeAnInstanceOf: function() {
            return {compare: function(actual, expectedClass) {
                var pass = typeof actual === 'object' && actual instanceof expectedClass;
                return {
                  pass: pass,
                  get message() {
                    return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                  }
                };
              }};
          },
          toImplement: function() {
            return {compare: function(actualObject, expectedInterface) {
                var objProps = Object.keys(actualObject.constructor.prototype);
                var intProps = Object.keys(expectedInterface.prototype);
                var missedMethods = [];
                intProps.forEach((function(k) {
                  if (!actualObject.constructor.prototype[k])
                    missedMethods.push(k);
                }));
                return {
                  pass: missedMethods.length == 0,
                  get message() {
                    return 'Expected ' + actualObject + ' to have the following methods: ' + missedMethods.join(", ");
                  }
                };
              }};
          }
        });
      });
      SpyObject = $__export("SpyObject", (function() {
        var SpyObject = function SpyObject() {};
        return ($traceurRuntime.createClass)(SpyObject, {
          spy: function(name) {
            if (!this[name]) {
              this[name] = this._createGuinnessCompatibleSpy();
            }
            return this[name];
          },
          rttsAssert: function(value) {
            return true;
          },
          _createGuinnessCompatibleSpy: function() {
            var newSpy = jasmine.createSpy();
            newSpy.andCallFake = newSpy.and.callFake;
            return newSpy;
          }
        }, {});
      }()));
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/test_lib/src/test_lib.map

//# sourceMappingURL=./test_lib.map