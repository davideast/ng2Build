System.register("core/test/compiler/compiler_spec", ["test_lib/test_lib", "facade/dom", "facade/collection", "core/compiler/compiler", "core/compiler/view", "core/compiler/directive_metadata_reader", "core/compiler/template_loader", "core/annotations/annotations", "core/annotations/template_config", "core/compiler/pipeline/compile_element", "core/compiler/pipeline/compile_step", "core/compiler/pipeline/compile_control", "change_detection/change_detection"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/compiler_spec";
  var describe,
      beforeEach,
      it,
      expect,
      ddescribe,
      iit,
      el,
      DOM,
      List,
      Compiler,
      CompilerCache,
      ProtoView,
      DirectiveMetadataReader,
      TemplateLoader,
      Component,
      TemplateConfig,
      CompileElement,
      CompileStep,
      CompileControl,
      Lexer,
      Parser,
      MainComponent,
      NestedComponent,
      RecursiveComponent,
      TestableCompiler,
      MockStep;
  function main() {
    describe('compiler', function() {
      var reader;
      beforeEach((function() {
        reader = new DirectiveMetadataReader();
      }));
      function createCompiler(processClosure) {
        var steps = [new MockStep(processClosure)];
        return new TestableCompiler(reader, steps);
      }
      it('should run the steps and return the ProtoView of the root element', (function(done) {
        var rootProtoView = new ProtoView(null, null);
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = rootProtoView;
        }));
        compiler.compile(MainComponent, el('<div></div>')).then((function(protoView) {
          expect(protoView).toBe(rootProtoView);
          done();
        }));
      }));
      it('should use the given element', (function(done) {
        var element = el('<div></div>');
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = new ProtoView(current.element, null);
        }));
        compiler.compile(MainComponent, element).then((function(protoView) {
          expect(protoView.element).toBe(element);
          done();
        }));
      }));
      it('should use the inline template if no element is given explicitly', (function(done) {
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = new ProtoView(current.element, null);
        }));
        compiler.compile(MainComponent, null).then((function(protoView) {
          expect(DOM.getInnerHTML(protoView.element)).toEqual('inline component');
          done();
        }));
      }));
      it('should load nested components', (function(done) {
        var mainEl = el('<div></div>');
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = new ProtoView(current.element, null);
          current.inheritedElementBinder = current.inheritedProtoView.bindElement(null);
          if (current.element === mainEl) {
            current.componentDirective = reader.read(NestedComponent);
          }
        }));
        compiler.compile(MainComponent, mainEl).then((function(protoView) {
          var nestedView = protoView.elementBinders[0].nestedProtoView;
          expect(DOM.getInnerHTML(nestedView.element)).toEqual('nested component');
          done();
        }));
      }));
      it('should cache components', (function(done) {
        var element = el('<div></div>');
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = new ProtoView(current.element, null);
        }));
        var firstProtoView;
        compiler.compile(MainComponent, element).then((function(protoView) {
          firstProtoView = protoView;
          return compiler.compile(MainComponent, element);
        })).then((function(protoView) {
          expect(firstProtoView).toBe(protoView);
          done();
        }));
      }));
      it('should allow recursive components', (function(done) {
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = new ProtoView(current.element, null);
          current.inheritedElementBinder = current.inheritedProtoView.bindElement(null);
          current.componentDirective = reader.read(RecursiveComponent);
        }));
        compiler.compile(RecursiveComponent, null).then((function(protoView) {
          expect(protoView.elementBinders[0].nestedProtoView).toBe(protoView);
          done();
        }));
      }));
    });
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      describe = m.describe;
      beforeEach = m.beforeEach;
      it = m.it;
      expect = m.expect;
      ddescribe = m.ddescribe;
      iit = m.iit;
      el = m.el;
    }, function(m) {
      DOM = m.DOM;
    }, function(m) {
      List = m.List;
    }, function(m) {
      Compiler = m.Compiler;
      CompilerCache = m.CompilerCache;
    }, function(m) {
      ProtoView = m.ProtoView;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      TemplateLoader = m.TemplateLoader;
    }, function(m) {
      Component = m.Component;
    }, function(m) {
      TemplateConfig = m.TemplateConfig;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      CompileControl = m.CompileControl;
    }, function(m) {
      Lexer = m.Lexer;
      Parser = m.Parser;
    }],
    execute: function() {
      MainComponent = (function() {
        var MainComponent = function MainComponent() {};
        return ($traceurRuntime.createClass)(MainComponent, {}, {});
      }());
      Object.defineProperty(MainComponent, "annotations", {get: function() {
          return [new Component({template: new TemplateConfig({inline: 'inline component'})})];
        }});
      NestedComponent = (function() {
        var NestedComponent = function NestedComponent() {};
        return ($traceurRuntime.createClass)(NestedComponent, {}, {});
      }());
      Object.defineProperty(NestedComponent, "annotations", {get: function() {
          return [new Component({template: new TemplateConfig({inline: 'nested component'})})];
        }});
      RecursiveComponent = (function() {
        var RecursiveComponent = function RecursiveComponent() {};
        return ($traceurRuntime.createClass)(RecursiveComponent, {}, {});
      }());
      Object.defineProperty(RecursiveComponent, "annotations", {get: function() {
          return [new Component({
            template: new TemplateConfig({inline: '<div rec-comp></div>'}),
            selector: 'rec-comp'
          })];
        }});
      TestableCompiler = (function($__super) {
        var TestableCompiler = function TestableCompiler(reader, steps) {
          $traceurRuntime.superConstructor(TestableCompiler).call(this, null, reader, new Parser(new Lexer()), new CompilerCache());
          this.steps = steps;
        };
        return ($traceurRuntime.createClass)(TestableCompiler, {createSteps: function(component) {
            return this.steps;
          }}, {}, $__super);
      }(Compiler));
      Object.defineProperty(TestableCompiler, "parameters", {get: function() {
          return [[DirectiveMetadataReader], [List]];
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
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/compiler_spec.map

//# sourceMappingURL=./compiler_spec.map