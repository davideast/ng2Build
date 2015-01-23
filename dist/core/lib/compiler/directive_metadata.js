System.register("core/compiler/directive_metadata", ["facade/lang", "../annotations/annotations", "facade/collection", "./shadow_dom"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/directive_metadata";
  var Type,
      FIELD,
      Directive,
      List,
      ShadowDomStrategy,
      DirectiveMetadata;
  return {
    setters: [function(m) {
      Type = m.Type;
      FIELD = m.FIELD;
    }, function(m) {
      Directive = m.Directive;
    }, function(m) {
      List = m.List;
    }, function(m) {
      ShadowDomStrategy = m.ShadowDomStrategy;
    }],
    execute: function() {
      DirectiveMetadata = $__export("DirectiveMetadata", (function() {
        var DirectiveMetadata = function DirectiveMetadata(type, annotation, shadowDomStrategy, componentDirectives) {
          this.annotation = annotation;
          this.type = type;
          this.shadowDomStrategy = shadowDomStrategy;
          this.componentDirectives = componentDirectives;
        };
        return ($traceurRuntime.createClass)(DirectiveMetadata, {}, {});
      }()));
      Object.defineProperty(DirectiveMetadata, "parameters", {get: function() {
          return [[Type], [Directive], [ShadowDomStrategy], [List]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/directive_metadata.map

//# sourceMappingURL=./directive_metadata.map