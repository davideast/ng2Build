System.register("core/annotations/template_config", ["facade/lang", "facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "core/annotations/template_config";
  var ABSTRACT,
      CONST,
      Type,
      List,
      TemplateConfig;
  return {
    setters: [function(m) {
      ABSTRACT = m.ABSTRACT;
      CONST = m.CONST;
      Type = m.Type;
    }, function(m) {
      List = m.List;
    }],
    execute: function() {
      TemplateConfig = $__export("TemplateConfig", (function() {
        var TemplateConfig = function TemplateConfig($__1) {
          var $__2 = $__1,
              url = $__2.url,
              inline = $__2.inline,
              directives = $__2.directives,
              formatters = $__2.formatters,
              source = $__2.source;
          this.url = url;
          this.inline = inline;
          this.directives = directives;
          this.formatters = formatters;
          this.source = source;
        };
        return ($traceurRuntime.createClass)(TemplateConfig, {}, {});
      }()));
      Object.defineProperty(TemplateConfig, "annotations", {get: function() {
          return [new CONST()];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/annotations/template_config.map

//# sourceMappingURL=./template_config.map