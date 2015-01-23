System.register("directives/test/ng_non_bindable_spec", ["test_lib/test_lib", "facade/dom", "di/di", "change_detection/change_detection", "core/compiler/compiler", "core/compiler/directive_metadata_reader", "core/annotations/annotations", "core/annotations/template_config", "core/dom/element", "directives/ng_non_bindable"], function($__export) {
  "use strict";
  var __moduleName = "directives/test/ng_non_bindable_spec";
  var describe,
      xit,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      el,
      DOM,
      Injector,
      Lexer,
      Parser,
      ChangeDetector,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      Decorator,
      Component,
      TemplateConfig,
      NgElement,
      NgNonBindable,
      TestComponent,
      TestDecorator;
  function main() {
    describe('ng-non-bindable', (function() {
      var view,
          cd,
          compiler,
          component;
      beforeEach((function() {
        compiler = new Compiler(null, new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache());
      }));
      function createView(pv) {
        component = new TestComponent();
        view = pv.instantiate(null);
        view.hydrate(new Injector([]), null, component);
        cd = new ChangeDetector(view.recordRange);
      }
      function compileWithTemplate(template) {
        return compiler.compile(TestComponent, el(template));
      }
      it('should not interpolate children', (function(done) {
        var template = '<div>{{text}}<span ng-non-bindable>{{text}}</span></div>';
        compileWithTemplate(template).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('foo{{text}}');
          done();
        }));
      }));
      it('should ignore directives on child nodes', (function(done) {
        var template = '<div ng-non-bindable><span id=child test-dec>{{text}}</span></div>';
        compileWithTemplate(template).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          var span = DOM.querySelector(view.nodes[0], '#child');
          expect(DOM.hasClass(span, 'compiled')).toBeFalsy();
          done();
        }));
      }));
      it('should trigger directives on the same node', (function(done) {
        var template = '<div><span id=child ng-non-bindable test-dec>{{text}}</span></div>';
        compileWithTemplate(template).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          var span = DOM.querySelector(view.nodes[0], '#child');
          expect(DOM.hasClass(span, 'compiled')).toBeTruthy();
          done();
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      describe = m.describe;
      xit = m.xit;
      it = m.it;
      expect = m.expect;
      beforeEach = m.beforeEach;
      ddescribe = m.ddescribe;
      iit = m.iit;
      el = m.el;
    }, function(m) {
      DOM = m.DOM;
    }, function(m) {
      Injector = m.Injector;
    }, function(m) {
      Lexer = m.Lexer;
      Parser = m.Parser;
      ChangeDetector = m.ChangeDetector;
    }, function(m) {
      Compiler = m.Compiler;
      CompilerCache = m.CompilerCache;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      Decorator = m.Decorator;
      Component = m.Component;
    }, function(m) {
      TemplateConfig = m.TemplateConfig;
    }, function(m) {
      NgElement = m.NgElement;
    }, function(m) {
      NgNonBindable = m.NgNonBindable;
    }],
    execute: function() {
      TestComponent = (function() {
        var TestComponent = function TestComponent() {
          this.text = 'foo';
        };
        return ($traceurRuntime.createClass)(TestComponent, {}, {});
      }());
      Object.defineProperty(TestComponent, "annotations", {get: function() {
          return [new Component({
            selector: 'test-cmp',
            template: new TemplateConfig({
              inline: '',
              directives: [NgNonBindable, TestDecorator]
            })
          })];
        }});
      TestDecorator = (function() {
        var TestDecorator = function TestDecorator(el) {
          DOM.addClass(el.domElement, 'compiled');
        };
        return ($traceurRuntime.createClass)(TestDecorator, {}, {});
      }());
      Object.defineProperty(TestDecorator, "annotations", {get: function() {
          return [new Decorator({selector: '[test-dec]'})];
        }});
      Object.defineProperty(TestDecorator, "parameters", {get: function() {
          return [[NgElement]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/directives/test/ng_non_bindable_spec.map

//# sourceMappingURL=./ng_non_bindable_spec.map