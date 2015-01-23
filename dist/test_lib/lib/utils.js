System.register("test_lib/utils", ["facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "test_lib/utils";
  var List,
      ListWrapper,
      Log;
  return {
    setters: [function(m) {
      List = m.List;
      ListWrapper = m.ListWrapper;
    }],
    execute: function() {
      Log = $__export("Log", (function() {
        var Log = function Log() {
          this._result = [];
        };
        return ($traceurRuntime.createClass)(Log, {
          add: function(value) {
            ListWrapper.push(this._result, value);
          },
          fn: function(value) {
            var $__0 = this;
            return (function() {
              ListWrapper.push($__0._result, value);
            });
          },
          result: function() {
            return ListWrapper.join(this._result, "; ");
          }
        }, {});
      }()));
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/test_lib/src/utils.map

//# sourceMappingURL=./utils.map