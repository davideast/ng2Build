System.register("core/compiler/pipeline/element_binder_builder", ["facade/lang", "facade/dom", "facade/collection", "reflection/reflection", "change_detection/change_detection", "../../annotations/annotations", "../directive_metadata", "../view", "../element_injector", "../element_binder", "./compile_step", "./compile_element", "./compile_control"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/pipeline/element_binder_builder";
  var int,
      isPresent,
      isBlank,
      Type,
      BaseException,
      stringify,
      Element,
      DOM,
      ListWrapper,
      List,
      MapWrapper,
      StringMapWrapper,
      reflector,
      Parser,
      ProtoRecordRange,
      Component,
      Directive,
      DirectiveMetadata,
      ProtoView,
      ElementPropertyMemento,
      DirectivePropertyMemento,
      ProtoElementInjector,
      ElementBinder,
      CompileStep,
      CompileElement,
      CompileControl,
      ElementBinderBuilder;
  return {
    setters: [function(m) {
      int = m.int;
      isPresent = m.isPresent;
      isBlank = m.isBlank;
      Type = m.Type;
      BaseException = m.BaseException;
      stringify = m.stringify;
    }, function(m) {
      Element = m.Element;
      DOM = m.DOM;
    }, function(m) {
      ListWrapper = m.ListWrapper;
      List = m.List;
      MapWrapper = m.MapWrapper;
      StringMapWrapper = m.StringMapWrapper;
    }, function(m) {
      reflector = m.reflector;
    }, function(m) {
      Parser = m.Parser;
      ProtoRecordRange = m.ProtoRecordRange;
    }, function(m) {
      Component = m.Component;
      Directive = m.Directive;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }, function(m) {
      ProtoView = m.ProtoView;
      ElementPropertyMemento = m.ElementPropertyMemento;
      DirectivePropertyMemento = m.DirectivePropertyMemento;
    }, function(m) {
      ProtoElementInjector = m.ProtoElementInjector;
    }, function(m) {
      ElementBinder = m.ElementBinder;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileControl = m.CompileControl;
    }],
    execute: function() {
      ElementBinderBuilder = $__export("ElementBinderBuilder", (function($__super) {
        var ElementBinderBuilder = function ElementBinderBuilder() {
          $traceurRuntime.superConstructor(ElementBinderBuilder).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(ElementBinderBuilder, {
          process: function(parent, current, control) {
            var elementBinder = null;
            if (current.hasBindings) {
              var protoView = current.inheritedProtoView;
              elementBinder = protoView.bindElement(current.inheritedProtoElementInjector, current.componentDirective, current.templateDirective);
              if (isPresent(current.textNodeBindings)) {
                this._bindTextNodes(protoView, current);
              }
              if (isPresent(current.propertyBindings)) {
                this._bindElementProperties(protoView, current);
              }
              if (isPresent(current.eventBindings)) {
                this._bindEvents(protoView, current);
              }
              this._bindDirectiveProperties(this._collectDirectives(current), current);
            } else if (isPresent(parent)) {
              elementBinder = parent.inheritedElementBinder;
            }
            current.inheritedElementBinder = elementBinder;
          },
          _bindTextNodes: function(protoView, compileElement) {
            MapWrapper.forEach(compileElement.textNodeBindings, (function(expression, indexInParent) {
              protoView.bindTextNode(indexInParent, expression);
            }));
          },
          _bindElementProperties: function(protoView, compileElement) {
            MapWrapper.forEach(compileElement.propertyBindings, (function(expression, property) {
              if (DOM.hasProperty(compileElement.element, property)) {
                protoView.bindElementProperty(expression.ast, property, reflector.setter(property));
              }
            }));
          },
          _bindEvents: function(protoView, compileElement) {
            MapWrapper.forEach(compileElement.eventBindings, (function(expression, eventName) {
              protoView.bindEvent(eventName, expression);
            }));
          },
          _collectDirectives: function(compileElement) {
            var directives;
            if (isPresent(compileElement.decoratorDirectives)) {
              directives = ListWrapper.clone(compileElement.decoratorDirectives);
            } else {
              directives = [];
            }
            if (isPresent(compileElement.templateDirective)) {
              ListWrapper.push(directives, compileElement.templateDirective);
            }
            if (isPresent(compileElement.componentDirective)) {
              ListWrapper.push(directives, compileElement.componentDirective);
            }
            return directives;
          },
          _bindDirectiveProperties: function(typesWithAnnotations, compileElement) {
            var protoView = compileElement.inheritedProtoView;
            var directiveIndex = 0;
            ListWrapper.forEach(typesWithAnnotations, (function(typeWithAnnotation) {
              var annotation = typeWithAnnotation.annotation;
              if (isBlank(annotation.bind)) {
                return ;
              }
              StringMapWrapper.forEach(annotation.bind, (function(dirProp, elProp) {
                var expression = isPresent(compileElement.propertyBindings) ? MapWrapper.get(compileElement.propertyBindings, elProp) : null;
                if (isBlank(expression)) {
                  throw new BaseException('No element binding found for property ' + elProp + ' which is required by directive ' + stringify(typeWithAnnotation.type));
                }
                var len = dirProp.length;
                var dirBindingName = dirProp;
                var isContentWatch = dirProp[len - 2] === '[' && dirProp[len - 1] === ']';
                if (isContentWatch)
                  dirBindingName = dirProp.substring(0, len - 2);
                protoView.bindDirectiveProperty(directiveIndex, expression, dirBindingName, reflector.setter(dirBindingName), isContentWatch);
              }));
              directiveIndex++;
            }));
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(ElementBinderBuilder.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/pipeline/element_binder_builder.map

//# sourceMappingURL=./element_binder_builder.map