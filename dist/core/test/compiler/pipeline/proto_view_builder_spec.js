System.register("core/test/compiler/pipeline/proto_view_builder_spec", ["test_lib/test_lib", "facade/lang", "core/compiler/element_binder", "core/compiler/pipeline/proto_view_builder", "core/compiler/pipeline/compile_pipeline", "core/compiler/pipeline/compile_element", "core/compiler/pipeline/compile_step", "core/compiler/pipeline/compile_control", "facade/dom", "facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/pipeline/proto_view_builder_spec";
  var describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      isPresent,
      ElementBinder,
      ProtoViewBuilder,
      CompilePipeline,
      CompileElement,
      CompileStep,
      CompileControl,
      DOM,
      MapWrapper,
      MockStep;
  function main() {
    describe('ProtoViewBuilder', (function() {
      function createPipeline() {
        var variableBindings = arguments[0] !== (void 0) ? arguments[0] : null;
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          if (isPresent(current.element.getAttribute('viewroot'))) {
            current.isViewRoot = true;
          }
          if (isPresent(current.element.getAttribute('var-binding'))) {
            current.variableBindings = MapWrapper.createFromStringMap(variableBindings);
          }
          current.inheritedElementBinder = new ElementBinder(null, null, null);
        })), new ProtoViewBuilder()]);
      }
      it('should not create a ProtoView when the isViewRoot flag is not set', (function() {
        var results = createPipeline().process(el('<div></div>'));
        expect(results[0].inheritedProtoView).toBe(null);
      }));
      it('should create a ProtoView when the isViewRoot flag is set', (function() {
        var viewRootElement = el('<div viewroot></div>');
        var results = createPipeline().process(viewRootElement);
        expect(results[0].inheritedProtoView.element).toBe(viewRootElement);
      }));
      it('should inherit the ProtoView down to children that have no isViewRoot set', (function() {
        var viewRootElement = el('<div viewroot><span></span></div>');
        var results = createPipeline().process(viewRootElement);
        expect(results[0].inheritedProtoView.element).toBe(viewRootElement);
        expect(results[1].inheritedProtoView.element).toBe(viewRootElement);
      }));
      it('should save ProtoView into the elementBinder of parent element', (function() {
        var element = el('<div viewroot><template><a viewroot></a></template></div>');
        var results = createPipeline().process(element);
        expect(results[1].inheritedElementBinder.nestedProtoView).toBe(results[2].inheritedProtoView);
      }));
      it('should bind variables to the nested ProtoView', (function() {
        var element = el('<div viewroot><template var-binding><a viewroot></a></template></div>');
        var results = createPipeline({
          'var1': 'map1',
          'var2': 'map2'
        }).process(element);
        var npv = results[1].inheritedElementBinder.nestedProtoView;
        expect(npv.variableBindings).toEqual(MapWrapper.createFromStringMap({
          'var1': 'map1',
          'var2': 'map2'
        }));
      }));
      describe('errors', (function() {
        it('should not allow multiple nested ProtoViews for the same parent element', (function() {
          var element = el('<div viewroot><template><a viewroot></a><a viewroot></a></template></div>');
          expect((function() {
            createPipeline().process(element);
          })).toThrowError('Only one nested view per element is allowed');
        }));
      }));
    }));
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
      ElementBinder = m.ElementBinder;
    }, function(m) {
      ProtoViewBuilder = m.ProtoViewBuilder;
    }, function(m) {
      CompilePipeline = m.CompilePipeline;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      CompileControl = m.CompileControl;
    }, function(m) {
      DOM = m.DOM;
    }, function(m) {
      MapWrapper = m.MapWrapper;
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
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/pipeline/proto_view_builder_spec.map

//# sourceMappingURL=./proto_view_builder_spec.map