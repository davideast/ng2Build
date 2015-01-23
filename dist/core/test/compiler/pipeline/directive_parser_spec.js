System.register("core/test/compiler/pipeline/directive_parser_spec", ["test_lib/test_lib", "facade/lang", "facade/collection", "core/compiler/pipeline/directive_parser", "core/compiler/pipeline/compile_pipeline", "core/compiler/pipeline/compile_step", "core/compiler/pipeline/compile_element", "core/compiler/pipeline/compile_control", "facade/dom", "core/annotations/annotations", "core/annotations/template_config", "core/compiler/directive_metadata_reader", "change_detection/change_detection"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/pipeline/directive_parser_spec";
  var describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      isPresent,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      DirectiveParser,
      CompilePipeline,
      CompileStep,
      CompileElement,
      CompileControl,
      DOM,
      Component,
      Decorator,
      Template,
      TemplateConfig,
      DirectiveMetadataReader,
      Lexer,
      Parser,
      MockStep,
      SomeDecorator,
      SomeDecoratorIgnoringChildren,
      SomeTemplate,
      SomeTemplate2,
      SomeComponent,
      SomeComponent2,
      MyComp;
  function main() {
    describe('DirectiveParser', (function() {
      var reader,
          directives;
      beforeEach((function() {
        reader = new DirectiveMetadataReader();
        directives = [SomeDecorator, SomeDecoratorIgnoringChildren, SomeTemplate, SomeTemplate2, SomeComponent, SomeComponent2];
      }));
      function createPipeline() {
        var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
            propertyBindings = $__1.propertyBindings,
            variableBindings = $__1.variableBindings;
        var parser = new Parser(new Lexer());
        var annotatedDirectives = ListWrapper.create();
        for (var i = 0; i < directives.length; i++) {
          ListWrapper.push(annotatedDirectives, reader.read(directives[i]));
        }
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          if (isPresent(propertyBindings)) {
            StringMapWrapper.forEach(propertyBindings, (function(v, k) {
              current.addPropertyBinding(k, parser.parseBinding(v, null));
            }));
          }
          if (isPresent(variableBindings)) {
            current.variableBindings = MapWrapper.createFromStringMap(variableBindings);
          }
        })), new DirectiveParser(annotatedDirectives)]);
      }
      it('should not add directives if they are not used', (function() {
        var results = createPipeline().process(el('<div></div>'));
        expect(results[0].decoratorDirectives).toBe(null);
        expect(results[0].componentDirective).toBe(null);
        expect(results[0].templateDirective).toBe(null);
      }));
      describe('component directives', (function() {
        it('should detect them in attributes', (function() {
          var results = createPipeline().process(el('<div some-comp></div>'));
          expect(results[0].componentDirective).toEqual(reader.read(SomeComponent));
        }));
        it('should detect them in property bindings', (function() {
          var pipeline = createPipeline({propertyBindings: {'some-comp': 'someExpr'}});
          var results = pipeline.process(el('<div></div>'));
          expect(results[0].componentDirective).toEqual(reader.read(SomeComponent));
        }));
        it('should detect them in variable bindings', (function() {
          var pipeline = createPipeline({variableBindings: {'some-comp': 'someExpr'}});
          var results = pipeline.process(el('<div></div>'));
          expect(results[0].componentDirective).toEqual(reader.read(SomeComponent));
        }));
        it('should not allow multiple component directives on the same element', (function() {
          expect((function() {
            createPipeline().process(el('<div some-comp some-comp2></div>'));
          })).toThrowError('Only one component directive per element is allowed!');
        }));
        it('should not allow component directives on <template> elements', (function() {
          expect((function() {
            createPipeline().process(el('<template some-comp></template>'));
          })).toThrowError('Only template directives are allowed on <template> elements!');
        }));
      }));
      describe('template directives', (function() {
        it('should detect them in attributes', (function() {
          var results = createPipeline().process(el('<template some-templ></template>'));
          expect(results[0].templateDirective).toEqual(reader.read(SomeTemplate));
        }));
        it('should detect them in property bindings', (function() {
          var pipeline = createPipeline({propertyBindings: {'some-templ': 'someExpr'}});
          var results = pipeline.process(el('<template></template>'));
          expect(results[0].templateDirective).toEqual(reader.read(SomeTemplate));
        }));
        it('should detect them in variable bindings', (function() {
          var pipeline = createPipeline({variableBindings: {'some-templ': 'someExpr'}});
          var results = pipeline.process(el('<template></template>'));
          expect(results[0].templateDirective).toEqual(reader.read(SomeTemplate));
        }));
        it('should not allow multiple template directives on the same element', (function() {
          expect((function() {
            createPipeline().process(el('<template some-templ some-templ2></template>'));
          })).toThrowError('Only one template directive per element is allowed!');
        }));
        it('should not allow template directives on non <template> elements', (function() {
          expect((function() {
            createPipeline().process(el('<div some-templ></div>'));
          })).toThrowError('Template directives need to be placed on <template> elements or elements with template attribute!');
        }));
      }));
      describe('decorator directives', (function() {
        it('should detect them in attributes', (function() {
          var results = createPipeline().process(el('<div some-decor></div>'));
          expect(results[0].decoratorDirectives).toEqual([reader.read(SomeDecorator)]);
        }));
        it('should detect them in property bindings', (function() {
          var pipeline = createPipeline({propertyBindings: {'some-decor': 'someExpr'}});
          var results = pipeline.process(el('<div></div>'));
          expect(results[0].decoratorDirectives).toEqual([reader.read(SomeDecorator)]);
        }));
        it('should compile children by default', (function() {
          var results = createPipeline().process(el('<div some-decor></div>'));
          expect(results[0].compileChildren).toEqual(true);
        }));
        it('should stop compiling children when specified in the decorator config', (function() {
          var results = createPipeline().process(el('<div some-decor-ignoring-children></div>'));
          expect(results[0].compileChildren).toEqual(false);
        }));
        it('should detect them in variable bindings', (function() {
          var pipeline = createPipeline({variableBindings: {'some-decor': 'someExpr'}});
          var results = pipeline.process(el('<div></div>'));
          expect(results[0].decoratorDirectives).toEqual([reader.read(SomeDecorator)]);
        }));
        it('should not allow decorator directives on <template> elements', (function() {
          expect((function() {
            createPipeline().process(el('<template some-decor></template>'));
          })).toThrowError('Only template directives are allowed on <template> elements!');
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
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
      StringMapWrapper = m.StringMapWrapper;
    }, function(m) {
      DirectiveParser = m.DirectiveParser;
    }, function(m) {
      CompilePipeline = m.CompilePipeline;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileControl = m.CompileControl;
    }, function(m) {
      DOM = m.DOM;
    }, function(m) {
      Component = m.Component;
      Decorator = m.Decorator;
      Template = m.Template;
    }, function(m) {
      TemplateConfig = m.TemplateConfig;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      Lexer = m.Lexer;
      Parser = m.Parser;
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
      SomeDecorator = (function() {
        var SomeDecorator = function SomeDecorator() {};
        return ($traceurRuntime.createClass)(SomeDecorator, {}, {});
      }());
      Object.defineProperty(SomeDecorator, "annotations", {get: function() {
          return [new Decorator({selector: '[some-decor]'})];
        }});
      SomeDecoratorIgnoringChildren = (function() {
        var SomeDecoratorIgnoringChildren = function SomeDecoratorIgnoringChildren() {};
        return ($traceurRuntime.createClass)(SomeDecoratorIgnoringChildren, {}, {});
      }());
      Object.defineProperty(SomeDecoratorIgnoringChildren, "annotations", {get: function() {
          return [new Decorator({
            selector: '[some-decor-ignoring-children]',
            compileChildren: false
          })];
        }});
      SomeTemplate = (function() {
        var SomeTemplate = function SomeTemplate() {};
        return ($traceurRuntime.createClass)(SomeTemplate, {}, {});
      }());
      Object.defineProperty(SomeTemplate, "annotations", {get: function() {
          return [new Template({selector: '[some-templ]'})];
        }});
      SomeTemplate2 = (function() {
        var SomeTemplate2 = function SomeTemplate2() {};
        return ($traceurRuntime.createClass)(SomeTemplate2, {}, {});
      }());
      Object.defineProperty(SomeTemplate2, "annotations", {get: function() {
          return [new Template({selector: '[some-templ2]'})];
        }});
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {};
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
      Object.defineProperty(SomeComponent, "annotations", {get: function() {
          return [new Component({selector: '[some-comp]'})];
        }});
      SomeComponent2 = (function() {
        var SomeComponent2 = function SomeComponent2() {};
        return ($traceurRuntime.createClass)(SomeComponent2, {}, {});
      }());
      Object.defineProperty(SomeComponent2, "annotations", {get: function() {
          return [new Component({selector: '[some-comp2]'})];
        }});
      MyComp = (function() {
        var MyComp = function MyComp() {};
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component({template: new TemplateConfig({directives: [SomeDecorator, SomeTemplate, SomeTemplate2, SomeComponent, SomeComponent2]})})];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/pipeline/directive_parser_spec.map

//# sourceMappingURL=./directive_parser_spec.map