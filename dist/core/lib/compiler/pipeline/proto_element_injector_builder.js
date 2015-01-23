System.register("core/compiler/pipeline/proto_element_injector_builder", ["facade/lang", "facade/collection", "di/di", "../element_injector", "./compile_step", "./compile_element", "./compile_control"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/pipeline/proto_element_injector_builder";
  var isPresent,
      isBlank,
      ListWrapper,
      Key,
      ProtoElementInjector,
      ComponentKeyMetaData,
      CompileStep,
      CompileElement,
      CompileControl,
      ProtoElementInjectorBuilder;
  return {
    setters: [function(m) {
      isPresent = m.isPresent;
      isBlank = m.isBlank;
    }, function(m) {
      ListWrapper = m.ListWrapper;
    }, function(m) {
      Key = m.Key;
    }, function(m) {
      ProtoElementInjector = m.ProtoElementInjector;
      ComponentKeyMetaData = m.ComponentKeyMetaData;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileControl = m.CompileControl;
    }],
    execute: function() {
      ProtoElementInjectorBuilder = $__export("ProtoElementInjectorBuilder", (function($__super) {
        var ProtoElementInjectorBuilder = function ProtoElementInjectorBuilder() {
          $traceurRuntime.superConstructor(ProtoElementInjectorBuilder).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(ProtoElementInjectorBuilder, {
          internalCreateProtoElementInjector: function(parent, index, directives, firstBindingIsComponent, distance) {
            return new ProtoElementInjector(parent, index, directives, firstBindingIsComponent, distance);
          },
          process: function(parent, current, control) {
            var distanceToParentInjector = this._getDistanceToParentInjector(parent, current);
            var parentProtoElementInjector = this._getParentProtoElementInjector(parent, current);
            var injectorBindings = this._collectDirectiveBindings(current);
            if (injectorBindings.length > 0) {
              var protoView = current.inheritedProtoView;
              var hasComponent = isPresent(current.componentDirective);
              current.inheritedProtoElementInjector = this.internalCreateProtoElementInjector(parentProtoElementInjector, protoView.elementBinders.length, injectorBindings, hasComponent, distanceToParentInjector);
              current.distanceToParentInjector = 0;
            } else {
              current.inheritedProtoElementInjector = parentProtoElementInjector;
              current.distanceToParentInjector = distanceToParentInjector;
            }
          },
          _getDistanceToParentInjector: function(parent, current) {
            return isPresent(parent) ? parent.distanceToParentInjector + 1 : 0;
          },
          _getParentProtoElementInjector: function(parent, current) {
            if (isPresent(parent) && !current.isViewRoot) {
              return parent.inheritedProtoElementInjector;
            }
            return null;
          },
          _collectDirectiveBindings: function(pipelineElement) {
            var directiveTypes = [];
            if (isPresent(pipelineElement.componentDirective)) {
              ListWrapper.push(directiveTypes, pipelineElement.componentDirective.type);
            }
            if (isPresent(pipelineElement.templateDirective)) {
              ListWrapper.push(directiveTypes, pipelineElement.templateDirective.type);
            }
            if (isPresent(pipelineElement.decoratorDirectives)) {
              for (var i = 0; i < pipelineElement.decoratorDirectives.length; i++) {
                ListWrapper.push(directiveTypes, pipelineElement.decoratorDirectives[i].type);
              }
            }
            return directiveTypes;
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(ProtoElementInjectorBuilder.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/pipeline/proto_element_injector_builder.map

//# sourceMappingURL=./proto_element_injector_builder.map