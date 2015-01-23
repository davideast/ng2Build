System.register("core/test/compiler/pipeline/element_binding_marker_spec", ["test_lib/test_lib", "facade/lang", "facade/dom", "facade/collection", "core/compiler/pipeline/element_binding_marker", "core/compiler/pipeline/compile_pipeline", "core/compiler/pipeline/compile_element", "core/compiler/pipeline/compile_step", "core/compiler/pipeline/compile_control", "core/compiler/directive_metadata_reader", "core/annotations/annotations"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/pipeline/element_binding_marker_spec";
  var describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      isPresent,
      DOM,
      MapWrapper,
      ElementBindingMarker,
      CompilePipeline,
      CompileElement,
      CompileStep,
      CompileControl,
      DirectiveMetadataReader,
      Template,
      Decorator,
      Component,
      MockStep,
      SomeTemplateDirective,
      SomeComponentDirective,
      SomeDecoratorDirective;
  function main() {
    describe('ElementBindingMarker', (function() {
      function createPipeline() {
        var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
            textNodeBindings = $__1.textNodeBindings,
            propertyBindings = $__1.propertyBindings,
            variableBindings = $__1.variableBindings,
            eventBindings = $__1.eventBindings,
            directives = $__1.directives;
        var reader = new DirectiveMetadataReader();
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          if (isPresent(textNodeBindings)) {
            current.textNodeBindings = textNodeBindings;
          }
          if (isPresent(propertyBindings)) {
            current.propertyBindings = propertyBindings;
          }
          if (isPresent(variableBindings)) {
            current.variableBindings = variableBindings;
          }
          if (isPresent(eventBindings)) {
            current.eventBindings = eventBindings;
          }
          if (isPresent(directives)) {
            for (var i = 0; i < directives.length; i++) {
              current.addDirective(reader.read(directives[i]));
            }
          }
        })), new ElementBindingMarker()]);
      }
      it('should not mark empty elements', (function() {
        var results = createPipeline().process(el('<div></div>'));
        assertBinding(results[0], false);
      }));
      it('should mark elements with text node bindings', (function() {
        var textNodeBindings = MapWrapper.create();
        MapWrapper.set(textNodeBindings, 0, 'expr');
        var results = createPipeline({textNodeBindings: textNodeBindings}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
      it('should mark elements with property bindings', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'a': 'expr'});
        var results = createPipeline({propertyBindings: propertyBindings}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
      it('should mark elements with variable bindings', (function() {
        var variableBindings = MapWrapper.createFromStringMap({'a': 'expr'});
        var results = createPipeline({variableBindings: variableBindings}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
      it('should mark elements with event bindings', (function() {
        var eventBindings = MapWrapper.createFromStringMap({'click': 'expr'});
        var results = createPipeline({eventBindings: eventBindings}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
      it('should mark elements with decorator directives', (function() {
        var results = createPipeline({directives: [SomeDecoratorDirective]}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
      it('should mark elements with template directives', (function() {
        var results = createPipeline({directives: [SomeTemplateDirective]}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
      it('should mark elements with component directives', (function() {
        var results = createPipeline({directives: [SomeComponentDirective]}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
    }));
  }
  function assertBinding(pipelineElement, shouldBePresent) {
    expect(pipelineElement.hasBindings).toBe(shouldBePresent);
    expect(DOM.hasClass(pipelineElement.element, 'ng-binding')).toBe(shouldBePresent);
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      describe = m.describe;
      beforeEach = m.beforeEach;
      it = m.it;
      expect = m.expect;
      iit = m.iit;
      ddescribe = m.ddescribe;
      el = m.el;
    }, function(m) {
      isPresent = m.isPresent;
    }, function(m) {
      DOM = m.DOM;
    }, function(m) {
      MapWrapper = m.MapWrapper;
    }, function(m) {
      ElementBindingMarker = m.ElementBindingMarker;
    }, function(m) {
      CompilePipeline = m.CompilePipeline;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      CompileControl = m.CompileControl;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      Template = m.Template;
      Decorator = m.Decorator;
      Component = m.Component;
    }],
    execute: function() {
      MockStep = (function($__super) {
        var MockStep = function MockStep(process) {
          this.processClosure = process;
        };
        return ($traceurRuntime.createClass)(MockStep, {process: function(parent, current, control) {
            this.processClosure(parent, current, control);
          }}, {}, $__super);
      }(CompileStep));
      Object.defineProperty(MockStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      SomeTemplateDirective = (function() {
        var SomeTemplateDirective = function SomeTemplateDirective() {};
        return ($traceurRuntime.createClass)(SomeTemplateDirective, {}, {});
      }());
      Object.defineProperty(SomeTemplateDirective, "annotations", {get: function() {
          return [new Template()];
        }});
      SomeComponentDirective = (function() {
        var SomeComponentDirective = function SomeComponentDirective() {};
        return ($traceurRuntime.createClass)(SomeComponentDirective, {}, {});
      }());
      Object.defineProperty(SomeComponentDirective, "annotations", {get: function() {
          return [new Component()];
        }});
      SomeDecoratorDirective = (function() {
        var SomeDecoratorDirective = function SomeDecoratorDirective() {};
        return ($traceurRuntime.createClass)(SomeDecoratorDirective, {}, {});
      }());
      Object.defineProperty(SomeDecoratorDirective, "annotations", {get: function() {
          return [new Decorator()];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/pipeline/element_binding_marker_spec.map

//# sourceMappingURL=./element_binding_marker_spec.map