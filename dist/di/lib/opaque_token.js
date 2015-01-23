System.register("di/opaque_token", [], function($__export) {
  "use strict";
  var __moduleName = "di/opaque_token";
  var OpaqueToken;
  return {
    setters: [],
    execute: function() {
      OpaqueToken = $__export("OpaqueToken", (function() {
        var OpaqueToken = function OpaqueToken(desc) {
          this._desc = ("Token(" + desc + ")");
        };
        return ($traceurRuntime.createClass)(OpaqueToken, {toString: function() {
            return this._desc;
          }}, {});
      }()));
      Object.defineProperty(OpaqueToken, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/di/src/opaque_token.map

//# sourceMappingURL=./opaque_token.map