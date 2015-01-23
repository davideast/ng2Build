System.register("core/compiler/template_loader", ["facade/async"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/template_loader";
  var Promise,
      TemplateLoader;
  return {
    setters: [function(m) {
      Promise = m.Promise;
    }],
    execute: function() {
      TemplateLoader = $__export("TemplateLoader", (function() {
        var TemplateLoader = function TemplateLoader() {};
        return ($traceurRuntime.createClass)(TemplateLoader, {load: function(url) {
            return null;
          }}, {});
      }()));
      Object.defineProperty(TemplateLoader.prototype.load, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/template_loader.map

//# sourceMappingURL=./template_loader.map