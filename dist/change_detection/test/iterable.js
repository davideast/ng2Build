System.register("change_detection/test/iterable", [], function($__export) {
  "use strict";
  var $__1;
  var __moduleName = "change_detection/test/iterable";
  var TestIterable;
  return ($__1 = {}, Object.defineProperty($__1, "setters", {
    value: [],
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__1, "execute", {
    value: function() {
      TestIterable = $__export("TestIterable", (function() {
        var $__1;
        var TestIterable = function TestIterable() {
          this.list = [];
        };
        return ($traceurRuntime.createClass)(TestIterable, ($__1 = {}, Object.defineProperty($__1, Symbol.iterator, {
          value: function() {
            return this.list[Symbol.iterator]();
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), $__1), {});
      }()));
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__1);
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/change_detection/test/iterable.map

//# sourceMappingURL=./iterable.map