System.register("directives/test/ng_repeat_spec", ["test_lib/test_lib", "facade/dom", "di/di", "change_detection/change_detection", "core/compiler/compiler", "core/compiler/interfaces", "core/compiler/directive_metadata_reader", "core/annotations/annotations", "core/annotations/template_config", "core/compiler/viewport", "facade/collection", "directives/ng_repeat"], function($__export) {
  "use strict";
  var __moduleName = "directives/test/ng_repeat_spec";
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
      OnChange,
      DirectiveMetadataReader,
      Decorator,
      Component,
      Template,
      TemplateConfig,
      ViewPort,
      MapWrapper,
      ListWrapper,
      NgRepeat,
      Foo,
      TestComponent;
  function main() {
    describe('ng-repeat', (function() {
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
      var TEMPLATE = '<div><copy-me template="ng-repeat #item in items">{{item.toString()}};</copy-me></div>';
      it('should reflect initial elements', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;');
          done();
        }));
      }));
      it('should reflect added elements', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          ListWrapper.push(component.items, 3);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;3;');
          done();
        }));
      }));
      it('should reflect removed elements', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          ListWrapper.removeAt(component.items, 1);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;');
          done();
        }));
      }));
      it('should reflect moved elements', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          ListWrapper.removeAt(component.items, 0);
          ListWrapper.push(component.items, 1);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('2;1;');
          done();
        }));
      }));
      it('should reflect a mix of all changes (additions/removals/moves)', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          component.items = [0, 1, 2, 3, 4, 5];
          cd.detectChanges();
          component.items = [6, 2, 7, 0, 4, 8];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('6;2;7;0;4;8;');
          done();
        }));
      }));
      it('should iterate over an array of objects', (function() {
        compileWithTemplate('<ul><li template="ng-repeat #item in items">{{item["name"]}};</li></ul>').then((function(pv) {
          createView(pv);
          component.items = [{'name': 'misko'}, {'name': 'shyam'}];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('misko;shyam;');
          ListWrapper.push(component.items, {'name': 'adam'});
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('misko;shyam;adam;');
          ListWrapper.removeAt(component.items, 2);
          ListWrapper.removeAt(component.items, 0);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('shyam;');
        }));
      }));
      it('should gracefully handle nulls', (function(done) {
        compileWithTemplate('<ul><li template="ng-repeat #item in null">{{item}};</li></ul>').then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('');
          done();
        }));
      }));
      it('should gracefully handle ref changing to null and back', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;');
          component.items = null;
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('');
          component.items = [1, 2, 3];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;3;');
          done();
        }));
      }));
      it('should throw on ref changing to string', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;');
          component.items = 'whaaa';
          expect((function() {
            return cd.detectChanges();
          })).toThrowError();
          done();
        }));
      }));
      it('should works with duplicates', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          var a = new Foo();
          component.items = [a, a];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('foo;foo;');
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
      OnChange = m.OnChange;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      Decorator = m.Decorator;
      Component = m.Component;
      Template = m.Template;
    }, function(m) {
      TemplateConfig = m.TemplateConfig;
    }, function(m) {
      ViewPort = m.ViewPort;
    }, function(m) {
      MapWrapper = m.MapWrapper;
      ListWrapper = m.ListWrapper;
    }, function(m) {
      NgRepeat = m.NgRepeat;
    }],
    execute: function() {
      Foo = (function() {
        var Foo = function Foo() {};
        return ($traceurRuntime.createClass)(Foo, {toString: function() {
            return 'foo';
          }}, {});
      }());
      TestComponent = (function() {
        var TestComponent = function TestComponent() {
          this.items = [1, 2];
        };
        return ($traceurRuntime.createClass)(TestComponent, {}, {});
      }());
      Object.defineProperty(TestComponent, "annotations", {get: function() {
          return [new Component({
            selector: 'test-cmp',
            template: new TemplateConfig({
              inline: '',
              directives: [NgRepeat]
            })
          })];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/directives/test/ng_repeat_spec.map

//# sourceMappingURL=./ng_repeat_spec.map