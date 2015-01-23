System.register("core/test/compiler/pipeline/element_binder_builder_spec", ["test_lib/test_lib", "facade/lang", "facade/dom", "facade/collection", "core/compiler/pipeline/element_binder_builder", "core/compiler/pipeline/compile_pipeline", "core/compiler/pipeline/compile_element", "core/compiler/pipeline/compile_step", "core/compiler/pipeline/compile_control", "core/annotations/annotations", "core/compiler/view", "core/compiler/element_injector", "core/compiler/directive_metadata_reader", "change_detection/change_detection", "di/di"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/pipeline/element_binder_builder_spec";
  var describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      isPresent,
      DOM,
      ListWrapper,
      MapWrapper,
      ElementBinderBuilder,
      CompilePipeline,
      CompileElement,
      CompileStep,
      CompileControl,
      Decorator,
      Template,
      Component,
      ProtoView,
      ElementPropertyMemento,
      DirectivePropertyMemento,
      ProtoElementInjector,
      DirectiveMetadataReader,
      ChangeDetector,
      Lexer,
      Parser,
      ProtoRecordRange,
      Injector,
      SomeDecoratorDirective,
      SomeDecoratorDirectiveWithBinding,
      SomeDecoratorDirectiveWith2Bindings,
      SomeTemplateDirective,
      SomeTemplateDirectiveWithBinding,
      SomeComponentDirective,
      SomeComponentDirectiveWithBinding,
      Context,
      MockStep;
  function main() {
    describe('ElementBinderBuilder', (function() {
      var evalContext,
          view,
          changeDetector;
      function createPipeline() {
        var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
            textNodeBindings = $__1.textNodeBindings,
            propertyBindings = $__1.propertyBindings,
            eventBindings = $__1.eventBindings,
            directives = $__1.directives,
            protoElementInjector = $__1.protoElementInjector;
        var reflector = new DirectiveMetadataReader();
        var parser = new Parser(new Lexer());
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          var hasBinding = false;
          if (isPresent(current.element.getAttribute('text-binding'))) {
            MapWrapper.forEach(textNodeBindings, (function(v, k) {
              current.addTextNodeBinding(k, parser.parseBinding(v, null));
            }));
            hasBinding = true;
          }
          if (isPresent(current.element.getAttribute('prop-binding'))) {
            if (isPresent(propertyBindings)) {
              MapWrapper.forEach(propertyBindings, (function(v, k) {
                current.addPropertyBinding(k, parser.parseBinding(v, null));
              }));
            }
            hasBinding = true;
          }
          if (isPresent(current.element.getAttribute('event-binding'))) {
            MapWrapper.forEach(eventBindings, (function(v, k) {
              current.addEventBinding(k, parser.parseAction(v, null));
            }));
            hasBinding = true;
          }
          if (isPresent(protoElementInjector)) {
            current.inheritedProtoElementInjector = protoElementInjector;
          }
          if (isPresent(current.element.getAttribute('directives'))) {
            hasBinding = true;
            for (var i = 0; i < directives.length; i++) {
              current.addDirective(reflector.read(directives[i]));
            }
          }
          if (hasBinding) {
            current.hasBindings = true;
            DOM.addClass(current.element, 'ng-binding');
          }
          if (isPresent(current.element.getAttribute('viewroot'))) {
            current.isViewRoot = true;
            current.inheritedProtoView = new ProtoView(current.element, new ProtoRecordRange());
          } else if (isPresent(parent)) {
            current.inheritedProtoView = parent.inheritedProtoView;
          }
        })), new ElementBinderBuilder()]);
      }
      function instantiateView(protoView) {
        evalContext = new Context();
        view = protoView.instantiate(null);
        view.hydrate(new Injector([]), null, evalContext);
        changeDetector = new ChangeDetector(view.recordRange);
      }
      it('should not create an ElementBinder for elements that have no bindings', (function() {
        var pipeline = createPipeline();
        var results = pipeline.process(el('<div viewroot><span></span></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders.length).toBe(0);
      }));
      it('should create an ElementBinder for elements that have bindings', (function() {
        var pipeline = createPipeline();
        var results = pipeline.process(el('<div viewroot prop-binding><span prop-binding></span></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders.length).toBe(2);
        expect(pv.elementBinders[1]).not.toBe(pv.elementBinders[0]);
      }));
      it('should inherit ElementBinders to children that have no bindings', (function() {
        var pipeline = createPipeline();
        var results = pipeline.process(el('<div viewroot prop-binding><span></span></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders.length).toBe(1);
        expect(results[0].inheritedElementBinder).toBe(results[1].inheritedElementBinder);
      }));
      it('should store the current protoElementInjector', (function() {
        var directives = [SomeDecoratorDirective];
        var protoElementInjector = new ProtoElementInjector(null, 0, directives);
        var pipeline = createPipeline({
          protoElementInjector: protoElementInjector,
          directives: directives
        });
        var results = pipeline.process(el('<div viewroot directives></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].protoElementInjector).toBe(protoElementInjector);
      }));
      it('should store the component directive', (function() {
        var directives = [SomeComponentDirective];
        var pipeline = createPipeline({
          protoElementInjector: null,
          directives: directives
        });
        var results = pipeline.process(el('<div viewroot directives></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].componentDirective.type).toBe(SomeComponentDirective);
      }));
      it('should store the template directive', (function() {
        var directives = [SomeTemplateDirective];
        var pipeline = createPipeline({
          protoElementInjector: null,
          directives: directives
        });
        var results = pipeline.process(el('<div viewroot directives></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].templateDirective.type).toBe(SomeTemplateDirective);
      }));
      it('should bind text nodes', (function() {
        var textNodeBindings = MapWrapper.create();
        MapWrapper.set(textNodeBindings, 0, 'prop1');
        MapWrapper.set(textNodeBindings, 2, 'prop2');
        var pipeline = createPipeline({textNodeBindings: textNodeBindings});
        var results = pipeline.process(el('<div viewroot text-binding>{{}}<span></span>{{}}</div>'));
        var pv = results[0].inheritedProtoView;
        expect(sortArr(pv.elementBinders[0].textNodeIndices)).toEqual([0, 2]);
        instantiateView(pv);
        evalContext.prop1 = 'a';
        evalContext.prop2 = 'b';
        changeDetector.detectChanges();
        expect(view.nodes[0].childNodes[0].nodeValue).toEqual('a');
        expect(view.nodes[0].childNodes[2].nodeValue).toEqual('b');
      }));
      it('should bind element properties', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({
          'value': 'prop1',
          'hidden': 'prop2'
        });
        var pipeline = createPipeline({propertyBindings: propertyBindings});
        var results = pipeline.process(el('<input viewroot prop-binding>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].hasElementPropertyBindings).toBe(true);
        instantiateView(pv);
        evalContext.prop1 = 'a';
        evalContext.prop2 = false;
        changeDetector.detectChanges();
        expect(view.nodes[0].value).toEqual('a');
        expect(view.nodes[0].hidden).toEqual(false);
      }));
      it('should bind events', (function() {
        var eventBindings = MapWrapper.createFromStringMap({'event1': '1+1'});
        var pipeline = createPipeline({eventBindings: eventBindings});
        var results = pipeline.process(el('<div viewroot event-binding></div>'));
        var pv = results[0].inheritedProtoView;
        var ast = MapWrapper.get(pv.elementBinders[0].events, 'event1');
        expect(ast.eval(null)).toBe(2);
      }));
      it('should bind directive properties', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({
          'boundprop1': 'prop1',
          'boundprop2': 'prop2',
          'boundprop3': 'prop3'
        });
        var directives = [SomeDecoratorDirectiveWith2Bindings, SomeTemplateDirectiveWithBinding, SomeComponentDirectiveWithBinding];
        var protoElementInjector = new ProtoElementInjector(null, 0, directives, true);
        var pipeline = createPipeline({
          propertyBindings: propertyBindings,
          directives: directives,
          protoElementInjector: protoElementInjector
        });
        var results = pipeline.process(el('<div viewroot prop-binding directives></div>'));
        var pv = results[0].inheritedProtoView;
        results[0].inheritedElementBinder.nestedProtoView = new ProtoView(el('<div></div>'), new ProtoRecordRange());
        instantiateView(pv);
        evalContext.prop1 = 'a';
        evalContext.prop2 = 'b';
        evalContext.prop3 = 'c';
        changeDetector.detectChanges();
        expect(view.elementInjectors[0].get(SomeDecoratorDirectiveWith2Bindings).decorProp).toBe('a');
        expect(view.elementInjectors[0].get(SomeDecoratorDirectiveWith2Bindings).decorProp2).toBe('b');
        expect(view.elementInjectors[0].get(SomeTemplateDirectiveWithBinding).templProp).toBe('b');
        expect(view.elementInjectors[0].get(SomeComponentDirectiveWithBinding).compProp).toBe('c');
      }));
      it('should bind directive properties for sibling elements', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'boundprop1': 'prop1'});
        var directives = [SomeDecoratorDirectiveWithBinding];
        var protoElementInjector = new ProtoElementInjector(null, 0, directives);
        var pipeline = createPipeline({
          propertyBindings: propertyBindings,
          directives: directives,
          protoElementInjector: protoElementInjector
        });
        var results = pipeline.process(el('<div viewroot><div prop-binding directives>' + '</div><div prop-binding directives></div></div>'));
        var pv = results[0].inheritedProtoView;
        instantiateView(pv);
        evalContext.prop1 = 'a';
        changeDetector.detectChanges();
        expect(view.elementInjectors[1].get(SomeDecoratorDirectiveWithBinding).decorProp).toBe('a');
      }));
      describe('errors', (function() {
        it('should throw if there is no element property bindings for a directive property binding', (function() {
          var pipeline = createPipeline({
            propertyBindings: MapWrapper.create(),
            directives: [SomeDecoratorDirectiveWithBinding]
          });
          expect((function() {
            pipeline.process(el('<div viewroot prop-binding directives>'));
          })).toThrowError('No element binding found for property boundprop1 which is required by directive SomeDecoratorDirectiveWithBinding');
        }));
      }));
    }));
  }
  function sortArr(arr) {
    var arr2 = ListWrapper.clone(arr);
    arr2.sort();
    return arr2;
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
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
    }, function(m) {
      ElementBinderBuilder = m.ElementBinderBuilder;
    }, function(m) {
      CompilePipeline = m.CompilePipeline;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      CompileControl = m.CompileControl;
    }, function(m) {
      Decorator = m.Decorator;
      Template = m.Template;
      Component = m.Component;
    }, function(m) {
      ProtoView = m.ProtoView;
      ElementPropertyMemento = m.ElementPropertyMemento;
      DirectivePropertyMemento = m.DirectivePropertyMemento;
    }, function(m) {
      ProtoElementInjector = m.ProtoElementInjector;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      ChangeDetector = m.ChangeDetector;
      Lexer = m.Lexer;
      Parser = m.Parser;
      ProtoRecordRange = m.ProtoRecordRange;
    }, function(m) {
      Injector = m.Injector;
    }],
    execute: function() {
      SomeDecoratorDirective = (function() {
        var SomeDecoratorDirective = function SomeDecoratorDirective() {};
        return ($traceurRuntime.createClass)(SomeDecoratorDirective, {}, {});
      }());
      Object.defineProperty(SomeDecoratorDirective, "annotations", {get: function() {
          return [new Decorator()];
        }});
      SomeDecoratorDirectiveWithBinding = (function() {
        var SomeDecoratorDirectiveWithBinding = function SomeDecoratorDirectiveWithBinding() {
          this.decorProp = null;
          this.decorProp2 = null;
        };
        return ($traceurRuntime.createClass)(SomeDecoratorDirectiveWithBinding, {}, {});
      }());
      Object.defineProperty(SomeDecoratorDirectiveWithBinding, "annotations", {get: function() {
          return [new Decorator({bind: {'boundprop1': 'decorProp'}})];
        }});
      SomeDecoratorDirectiveWith2Bindings = (function() {
        var SomeDecoratorDirectiveWith2Bindings = function SomeDecoratorDirectiveWith2Bindings() {
          this.decorProp = null;
          this.decorProp2 = null;
        };
        return ($traceurRuntime.createClass)(SomeDecoratorDirectiveWith2Bindings, {}, {});
      }());
      Object.defineProperty(SomeDecoratorDirectiveWith2Bindings, "annotations", {get: function() {
          return [new Decorator({bind: {
              'boundprop1': 'decorProp',
              'boundprop2': 'decorProp2'
            }})];
        }});
      SomeTemplateDirective = (function() {
        var SomeTemplateDirective = function SomeTemplateDirective() {};
        return ($traceurRuntime.createClass)(SomeTemplateDirective, {}, {});
      }());
      Object.defineProperty(SomeTemplateDirective, "annotations", {get: function() {
          return [new Template()];
        }});
      SomeTemplateDirectiveWithBinding = (function() {
        var SomeTemplateDirectiveWithBinding = function SomeTemplateDirectiveWithBinding() {
          this.templProp = null;
        };
        return ($traceurRuntime.createClass)(SomeTemplateDirectiveWithBinding, {}, {});
      }());
      Object.defineProperty(SomeTemplateDirectiveWithBinding, "annotations", {get: function() {
          return [new Template({bind: {'boundprop2': 'templProp'}})];
        }});
      SomeComponentDirective = (function() {
        var SomeComponentDirective = function SomeComponentDirective() {};
        return ($traceurRuntime.createClass)(SomeComponentDirective, {}, {});
      }());
      Object.defineProperty(SomeComponentDirective, "annotations", {get: function() {
          return [new Component()];
        }});
      SomeComponentDirectiveWithBinding = (function() {
        var SomeComponentDirectiveWithBinding = function SomeComponentDirectiveWithBinding() {
          this.compProp = null;
        };
        return ($traceurRuntime.createClass)(SomeComponentDirectiveWithBinding, {}, {});
      }());
      Object.defineProperty(SomeComponentDirectiveWithBinding, "annotations", {get: function() {
          return [new Component({bind: {'boundprop3': 'compProp'}})];
        }});
      Context = (function() {
        var Context = function Context() {
          this.prop1 = null;
          this.prop2 = null;
          this.prop3 = null;
        };
        return ($traceurRuntime.createClass)(Context, {}, {});
      }());
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

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/pipeline/element_binder_builder_spec.map

//# sourceMappingURL=./element_binder_builder_spec.map