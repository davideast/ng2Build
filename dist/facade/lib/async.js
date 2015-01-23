System.register("facade/async", ["facade/lang", "facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "facade/async";
  var int,
      List,
      Promise,
      PromiseWrapper;
  return {
    setters: [function(m) {
      int = m.int;
    }, function(m) {
      List = m.List;
    }],
    execute: function() {
      Promise = $__export("Promise", window.Promise);
      PromiseWrapper = $__export("PromiseWrapper", (function() {
        var PromiseWrapper = function PromiseWrapper() {};
        return ($traceurRuntime.createClass)(PromiseWrapper, {}, {
          resolve: function(obj) {
            return Promise.resolve(obj);
          },
          reject: function(obj) {
            return Promise.reject(obj);
          },
          all: function(promises) {
            if (promises.length == 0)
              return Promise.resolve([]);
            return Promise.all(promises);
          },
          then: function(promise, success, rejection) {
            return promise.then(success, rejection);
          },
          completer: function() {
            var resolve;
            var reject;
            var p = new Promise(function(res, rej) {
              resolve = res;
              reject = rej;
            });
            return {
              promise: p,
              complete: resolve,
              reject: reject
            };
          },
          setTimeout: function(fn, millis) {
            window.setTimeout(fn, millis);
          }
        });
      }()));
      Object.defineProperty(PromiseWrapper.all, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(PromiseWrapper.then, "parameters", {get: function() {
          return [[Promise], [Function], [Function]];
        }});
      Object.defineProperty(PromiseWrapper.setTimeout, "parameters", {get: function() {
          return [[Function], [int]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/facade/src/async.map

//# sourceMappingURL=./async.map