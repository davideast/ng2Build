System.register("core/compiler/pipeline/compile_element", ["facade/collection", "facade/dom", "facade/lang", "../directive_metadata", "../../annotations/annotations", "../element_binder", "../element_injector", "../view", "change_detection/change_detection"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/pipeline/compile_element";
  var List,
      Map,
      ListWrapper,
      MapWrapper,
      Element,
      DOM,
      int,
      isBlank,
      isPresent,
      DirectiveMetadata,
      Decorator,
      Component,
      Template,
      ElementBinder,
      ProtoElementInjector,
      ProtoView,
      ASTWithSource,
      CompileElement;
  return {
    setters: [function(m) {
      List = m.List;
      Map = m.Map;
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
    }, function(m) {
      Element = m.Element;
      DOM = m.DOM;
    }, function(m) {
      int = m.int;
      isBlank = m.isBlank;
      isPresent = m.isPresent;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }, function(m) {
      Decorator = m.Decorator;
      Component = m.Component;
      Template = m.Template;
    }, function(m) {
      ElementBinder = m.ElementBinder;
    }, function(m) {
      ProtoElementInjector = m.ProtoElementInjector;
    }, function(m) {
      ProtoView = m.ProtoView;
    }, function(m) {
      ASTWithSource = m.ASTWithSource;
    }],
    execute: function() {
      CompileElement = $__export("CompileElement", (function() {
        var CompileElement = function CompileElement(element) {
          this.element = element;
          this._attrs = null;
          this._classList = null;
          this.textNodeBindings = null;
          this.propertyBindings = null;
          this.eventBindings = null;
          this.variableBindings = null;
          this.decoratorDirectives = null;
          this.templateDirective = null;
          this.componentDirective = null;
          this.isViewRoot = false;
          this.hasBindings = false;
          this.inheritedProtoView = null;
          this.inheritedProtoElementInjector = null;
          this.inheritedElementBinder = null;
          this.distanceToParentInjector = 0;
          this.compileChildren = true;
        };
        return ($traceurRuntime.createClass)(CompileElement, {
          refreshAttrs: function() {
            this._attrs = null;
          },
          attrs: function() {
            if (isBlank(this._attrs)) {
              this._attrs = DOM.attributeMap(this.element);
            }
            return this._attrs;
          },
          refreshClassList: function() {
            this._classList = null;
          },
          classList: function() {
            if (isBlank(this._classList)) {
              this._classList = ListWrapper.create();
              var elClassList = DOM.classList(this.element);
              for (var i = 0; i < elClassList.length; i++) {
                ListWrapper.push(this._classList, elClassList[i]);
              }
            }
            return this._classList;
          },
          addTextNodeBinding: function(indexInParent, expression) {
            if (isBlank(this.textNodeBindings)) {
              this.textNodeBindings = MapWrapper.create();
            }
            MapWrapper.set(this.textNodeBindings, indexInParent, expression);
          },
          addPropertyBinding: function(property, expression) {
            if (isBlank(this.propertyBindings)) {
              this.propertyBindings = MapWrapper.create();
            }
            MapWrapper.set(this.propertyBindings, property, expression);
          },
          addVariableBinding: function(contextName, templateName) {
            if (isBlank(this.variableBindings)) {
              this.variableBindings = MapWrapper.create();
            }
            MapWrapper.set(this.variableBindings, contextName, templateName);
          },
          addEventBinding: function(eventName, expression) {
            if (isBlank(this.eventBindings)) {
              this.eventBindings = MapWrapper.create();
            }
            MapWrapper.set(this.eventBindings, eventName, expression);
          },
          addDirective: function(directive) {
            var annotation = directive.annotation;
            if (annotation instanceof Decorator) {
              if (isBlank(this.decoratorDirectives)) {
                this.decoratorDirectives = ListWrapper.create();
              }
              ListWrapper.push(this.decoratorDirectives, directive);
              if (!annotation.compileChildren) {
                this.compileChildren = false;
              }
            } else if (annotation instanceof Template) {
              this.templateDirective = directive;
            } else if (annotation instanceof Component) {
              this.componentDirective = directive;
            }
          }
        }, {});
      }()));
      Object.defineProperty(CompileElement, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(CompileElement.prototype.addTextNodeBinding, "parameters", {get: function() {
          return [[int], [ASTWithSource]];
        }});
      Object.defineProperty(CompileElement.prototype.addPropertyBinding, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], [ASTWithSource]];
        }});
      Object.defineProperty(CompileElement.prototype.addVariableBinding, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], [$traceurRuntime.type.string]];
        }});
      Object.defineProperty(CompileElement.prototype.addEventBinding, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], [ASTWithSource]];
        }});
      Object.defineProperty(CompileElement.prototype.addDirective, "parameters", {get: function() {
          return [[DirectiveMetadata]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/pipeline/compile_element.map

//# sourceMappingURL=./compile_element.map