System.register("core/test/compiler/pipeline/proto_element_injector_builder_spec", ["test_lib/test_lib", "facade/lang", "facade/dom", "facade/collection", "core/compiler/pipeline/proto_element_injector_builder", "core/compiler/pipeline/compile_pipeline", "core/compiler/pipeline/compile_element", "core/compiler/pipeline/compile_step", "core/compiler/pipeline/compile_control", "core/compiler/view", "core/compiler/directive_metadata_reader", "core/annotations/annotations", "core/compiler/element_injector"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/pipeline/proto_element_injector_builder_spec";
  var describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      isPresent,
      isBlank,
      DOM,
      List,
      ListWrapper,
      ProtoElementInjectorBuilder,
      CompilePipeline,
      CompileElement,
      CompileStep,
      CompileControl,
      ProtoView,
      DirectiveMetadataReader,
      Template,
      Decorator,
      Component,
      ProtoElementInjector,
      TestableProtoElementInjectorBuilder,
      MockStep,
      SomeComponentService,
      SomeTemplateDirective,
      SomeComponentDirective,
      SomeDecoratorDirective;
  function main() {
    describe('ProtoElementInjectorBuilder', (function() {
      var protoElementInjectorBuilder,
          protoView;
      beforeEach((function() {
        protoElementInjectorBuilder = new TestableProtoElementInjectorBuilder();
        protoView = new ProtoView(null, null);
      }));
      function createPipeline() {
        var directives = arguments[0] !== (void 0) ? arguments[0] : null;
        if (isBlank(directives)) {
          directives = [];
        }
        var reader = new DirectiveMetadataReader();
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          if (isPresent(current.element.getAttribute('viewroot'))) {
            current.isViewRoot = true;
          }
          if (isPresent(current.element.getAttribute('directives'))) {
            for (var i = 0; i < directives.length; i++) {
              current.addDirective(reader.read(directives[i]));
            }
          }
          current.inheritedProtoView = protoView;
        })), protoElementInjectorBuilder]);
      }
      function getCreationArgs(protoElementInjector) {
        return protoElementInjectorBuilder.findArgsFor(protoElementInjector);
      }
      it('should not create a ProtoElementInjector for elements without directives', (function() {
        var results = createPipeline().process(el('<div></div>'));
        expect(results[0].inheritedProtoElementInjector).toBe(null);
      }));
      it('should create a ProtoElementInjector for elements directives', (function() {
        var directives = [SomeComponentDirective, SomeTemplateDirective, SomeDecoratorDirective];
        var results = createPipeline(directives).process(el('<div directives></div>'));
        var creationArgs = getCreationArgs(results[0].inheritedProtoElementInjector);
        expect(creationArgs['bindings']).toEqual(directives);
      }));
      it('should mark ProtoElementInjector for elements with component directives and use the ComponentDirective as first binding', (function() {
        var directives = [SomeDecoratorDirective, SomeComponentDirective];
        var results = createPipeline(directives).process(el('<div directives></div>'));
        var creationArgs = getCreationArgs(results[0].inheritedProtoElementInjector);
        expect(creationArgs['firstBindingIsComponent']).toBe(true);
        expect(creationArgs['bindings']).toEqual([SomeComponentDirective, SomeDecoratorDirective]);
      }));
      it('should use the next ElementBinder index as index of the ProtoElementInjector', (function() {
        ListWrapper.push(protoView.elementBinders, null);
        ListWrapper.push(protoView.elementBinders, null);
        var directives = [SomeDecoratorDirective];
        var results = createPipeline(directives).process(el('<div directives></div>'));
        var creationArgs = getCreationArgs(results[0].inheritedProtoElementInjector);
        expect(creationArgs['index']).toBe(protoView.elementBinders.length);
      }));
      describe("inheritedProtoElementInjector", (function() {
        it('should inherit the ProtoElementInjector down to children without directives', (function() {
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(el('<div directives><span></span></div>'));
          expect(results[1].inheritedProtoElementInjector).toBe(results[0].inheritedProtoElementInjector);
        }));
        it('should use the ProtoElementInjector of the parent element as parent', (function() {
          var element = el('<div directives><span><a directives></a></span></div>');
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(element);
          expect(results[2].inheritedProtoElementInjector.parent).toBe(results[0].inheritedProtoElementInjector);
        }));
        it('should use a null parent for viewRoots', (function() {
          var element = el('<div directives><span viewroot directives></span></div>');
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(element);
          expect(results[1].inheritedProtoElementInjector.parent).toBe(null);
        }));
        it('should use a null parent if there is an intermediate viewRoot', (function() {
          var element = el('<div directives><span viewroot><a directives></a></span></div>');
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(element);
          expect(results[2].inheritedProtoElementInjector.parent).toBe(null);
        }));
      }));
      describe("distanceToParentInjector", (function() {
        it("should be 0 for root elements", (function() {
          var element = el('<div directives></div>');
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(element);
          expect(results[0].inheritedProtoElementInjector.distanceToParent).toBe(0);
        }));
        it("should be 1 when a parent element has an injector", (function() {
          var element = el('<div directives><span directives></span></div>');
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(element);
          expect(results[1].inheritedProtoElementInjector.distanceToParent).toBe(1);
        }));
        it("should add 1 for every element that does not have an injector", (function() {
          var element = el('<div directives><a><b><span directives></span></b></a></div>');
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(element);
          expect(results[3].inheritedProtoElementInjector.distanceToParent).toBe(3);
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
      isBlank = m.isBlank;
    }, function(m) {
      DOM = m.DOM;
    }, function(m) {
      List = m.List;
      ListWrapper = m.ListWrapper;
    }, function(m) {
      ProtoElementInjectorBuilder = m.ProtoElementInjectorBuilder;
    }, function(m) {
      CompilePipeline = m.CompilePipeline;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      CompileControl = m.CompileControl;
    }, function(m) {
      ProtoView = m.ProtoView;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      Template = m.Template;
      Decorator = m.Decorator;
      Component = m.Component;
    }, function(m) {
      ProtoElementInjector = m.ProtoElementInjector;
    }],
    execute: function() {
      TestableProtoElementInjectorBuilder = (function($__super) {
        var TestableProtoElementInjectorBuilder = function TestableProtoElementInjectorBuilder() {
          this.debugObjects = [];
        };
        return ($traceurRuntime.createClass)(TestableProtoElementInjectorBuilder, {
          findArgsFor: function(protoElementInjector) {
            for (var i = 0; i < this.debugObjects.length; i += 2) {
              if (this.debugObjects[i] === protoElementInjector) {
                return this.debugObjects[i + 1];
              }
            }
            return null;
          },
          internalCreateProtoElementInjector: function(parent, index, bindings, firstBindingIsComponent, distance) {
            var result = new ProtoElementInjector(parent, index, bindings, firstBindingIsComponent, distance);
            ListWrapper.push(this.debugObjects, result);
            ListWrapper.push(this.debugObjects, {
              'parent': parent,
              'index': index,
              'bindings': bindings,
              'firstBindingIsComponent': firstBindingIsComponent
            });
            return result;
          }
        }, {}, $__super);
      }(ProtoElementInjectorBuilder));
      Object.defineProperty(TestableProtoElementInjectorBuilder.prototype.findArgsFor, "parameters", {get: function() {
          return [[ProtoElementInjector]];
        }});
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
      SomeComponentService = (function() {
        var SomeComponentService = function SomeComponentService() {};
        return ($traceurRuntime.createClass)(SomeComponentService, {}, {});
      }());
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
          return [new Component({componentServices: [SomeComponentService]})];
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

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/pipeline/proto_element_injector_builder_spec.map

//# sourceMappingURL=./proto_element_injector_builder_spec.map