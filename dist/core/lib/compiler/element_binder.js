System.register("core/compiler/element_binder", ["./element_injector", "facade/lang", "facade/collection", "./directive_metadata", "./view"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/element_binder";
  var ProtoElementInjector,
      FIELD,
      MapWrapper,
      DirectiveMetadata,
      List,
      Map,
      ProtoView,
      ElementBinder;
  return {
    setters: [function(m) {
      ProtoElementInjector = m.ProtoElementInjector;
    }, function(m) {
      FIELD = m.FIELD;
    }, function(m) {
      MapWrapper = m.MapWrapper;
      List = m.List;
      Map = m.Map;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }, function(m) {
      ProtoView = m.ProtoView;
    }],
    execute: function() {
      ElementBinder = $__export("ElementBinder", (function() {
        var ElementBinder = function ElementBinder(protoElementInjector, componentDirective, templateDirective) {
          this.protoElementInjector = protoElementInjector;
          this.componentDirective = componentDirective;
          this.templateDirective = templateDirective;
          this.events = null;
          this.textNodeIndices = null;
          this.hasElementPropertyBindings = false;
          this.nestedProtoView = null;
        };
        return ($traceurRuntime.createClass)(ElementBinder, {}, {});
      }()));
      Object.defineProperty(ElementBinder, "parameters", {get: function() {
          return [[ProtoElementInjector], [DirectiveMetadata], [DirectiveMetadata]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/element_binder.map

//# sourceMappingURL=./element_binder.map