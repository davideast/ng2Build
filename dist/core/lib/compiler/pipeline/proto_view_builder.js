System.register("core/compiler/pipeline/proto_view_builder", ["facade/lang", "facade/collection", "../view", "change_detection/change_detection", "./compile_step", "./compile_element", "./compile_control"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/pipeline/proto_view_builder";
  var isPresent,
      BaseException,
      ListWrapper,
      MapWrapper,
      ProtoView,
      ProtoRecordRange,
      CompileStep,
      CompileElement,
      CompileControl,
      ProtoViewBuilder;
  return {
    setters: [function(m) {
      isPresent = m.isPresent;
      BaseException = m.BaseException;
    }, function(m) {
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
    }, function(m) {
      ProtoView = m.ProtoView;
    }, function(m) {
      ProtoRecordRange = m.ProtoRecordRange;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileControl = m.CompileControl;
    }],
    execute: function() {
      ProtoViewBuilder = $__export("ProtoViewBuilder", (function($__super) {
        var ProtoViewBuilder = function ProtoViewBuilder() {
          $traceurRuntime.superConstructor(ProtoViewBuilder).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(ProtoViewBuilder, {process: function(parent, current, control) {
            var inheritedProtoView = null;
            if (current.isViewRoot) {
              inheritedProtoView = new ProtoView(current.element, new ProtoRecordRange());
              if (isPresent(parent)) {
                if (isPresent(parent.inheritedElementBinder.nestedProtoView)) {
                  throw new BaseException('Only one nested view per element is allowed');
                }
                parent.inheritedElementBinder.nestedProtoView = inheritedProtoView;
                if (isPresent(parent.variableBindings)) {
                  MapWrapper.forEach(parent.variableBindings, (function(mappedName, varName) {
                    inheritedProtoView.bindVariable(varName, mappedName);
                  }));
                }
              }
            } else if (isPresent(parent)) {
              inheritedProtoView = parent.inheritedProtoView;
            }
            current.inheritedProtoView = inheritedProtoView;
          }}, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(ProtoViewBuilder.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/pipeline/proto_view_builder.map

//# sourceMappingURL=./proto_view_builder.map