System.register("directives/ng_non_bindable", ["core/annotations/annotations"], function($__export) {
  "use strict";
  var __moduleName = "directives/ng_non_bindable";
  var Decorator,
      NgNonBindable;
  return {
    setters: [function(m) {
      Decorator = m.Decorator;
    }],
    execute: function() {
      NgNonBindable = $__export("NgNonBindable", (function() {
        var NgNonBindable = function NgNonBindable() {};
        return ($traceurRuntime.createClass)(NgNonBindable, {}, {});
      }()));
      Object.defineProperty(NgNonBindable, "annotations", {get: function() {
          return [new Decorator({
            selector: '[ng-non-bindable]',
            compileChildren: false
          })];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/directives/src/ng_non_bindable.map

//# sourceMappingURL=./ng_non_bindable.map