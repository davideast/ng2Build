System.register("core/test/compiler/integration_spec", ["test_lib/test_lib", "facade/dom", "di/di", "change_detection/change_detection", "core/compiler/compiler", "core/compiler/directive_metadata_reader", "core/compiler/shadow_dom", "core/annotations/annotations", "core/annotations/template_config", "core/compiler/viewport", "facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/integration_spec";
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
      ShadowDomEmulated,
      Decorator,
      Component,
      Template,
      TemplateConfig,
      ViewPort,
      MapWrapper,
      TrivialTemplateDirective,
      EmulatedShadowDomCmp,
      MyDir,
      MyComp,
      ChildComp,
      SomeTemplate,
      MyService;
  function main() {
    describe('integration tests', function() {
      var compiler;
      beforeEach((function() {
        compiler = new Compiler(null, new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache());
      }));
      describe('react to record changes', function() {
        var view,
            ctx,
            cd;
        function createView(pv) {
          ctx = new MyComp();
          view = pv.instantiate(null);
          view.hydrate(new Injector([]), null, ctx);
          cd = new ChangeDetector(view.recordRange);
        }
        it('should consume text node changes', (function(done) {
          compiler.compile(MyComp, el('<div>{{ctxProp}}</div>')).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            expect(DOM.getInnerHTML(view.nodes[0])).toEqual('Hello World!');
            done();
          }));
        }));
        it('should consume element binding changes', (function(done) {
          compiler.compile(MyComp, el('<div [id]="ctxProp"></div>')).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            expect(view.nodes[0].id).toEqual('Hello World!');
            done();
          }));
        }));
        it('should consume directive watch expression change.', (function(done) {
          compiler.compile(MyComp, el('<div my-dir [elprop]="ctxProp"></div>')).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            var elInj = view.elementInjectors[0];
            expect(elInj.get(MyDir).dirProp).toEqual('Hello World!');
            done();
          }));
        }));
        it('should support nested components.', (function(done) {
          compiler.compile(MyComp, el('<child-cmp></child-cmp>')).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(view.nodes[0].shadowRoot.childNodes[0].nodeValue).toEqual('hello');
            done();
          }));
        }));
        it('should support template directives via `<template>` elements.', (function(done) {
          compiler.compile(MyComp, el('<div><template let-some-tmpl="greeting"><copy-me>{{greeting}}</copy-me></template></div>')).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            var childNodesOfWrapper = view.nodes[0].childNodes;
            expect(childNodesOfWrapper.length).toBe(3);
            expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
            expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
            done();
          }));
        }));
        it('should support template directives via `template` attribute.', (function(done) {
          compiler.compile(MyComp, el('<div><copy-me template="some-tmpl #greeting">{{greeting}}</copy-me></div>')).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            var childNodesOfWrapper = view.nodes[0].childNodes;
            expect(childNodesOfWrapper.length).toBe(3);
            expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
            expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
            done();
          }));
        }));
      });
      it('should emulate content tag', (function(done) {
        var temp = "<emulated-shadow-dom-component>" + "<div>Light</div>" + "<div template=\"trivial-template\">DOM</div>" + "</emulated-shadow-dom-component>";
        function createView(pv) {
          var view = pv.instantiate(null);
          view.hydrate(new Injector([]), null, {});
          return view;
        }
        compiler.compile(MyComp, el(temp)).then(createView).then((function(view) {
          expect(DOM.getText(view.nodes[0])).toEqual('Before LightDOM After');
          done();
        }));
      }));
    });
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
      ShadowDomEmulated = m.ShadowDomEmulated;
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
    }],
    execute: function() {
      TrivialTemplateDirective = (function() {
        var TrivialTemplateDirective = function TrivialTemplateDirective(viewPort) {
          viewPort.create();
        };
        return ($traceurRuntime.createClass)(TrivialTemplateDirective, {}, {});
      }());
      Object.defineProperty(TrivialTemplateDirective, "annotations", {get: function() {
          return [new Template({selector: '[trivial-template]'})];
        }});
      Object.defineProperty(TrivialTemplateDirective, "parameters", {get: function() {
          return [[ViewPort]];
        }});
      EmulatedShadowDomCmp = (function() {
        var EmulatedShadowDomCmp = function EmulatedShadowDomCmp() {};
        return ($traceurRuntime.createClass)(EmulatedShadowDomCmp, {}, {});
      }());
      Object.defineProperty(EmulatedShadowDomCmp, "annotations", {get: function() {
          return [new Component({
            selector: 'emulated-shadow-dom-component',
            template: new TemplateConfig({
              inline: 'Before <content></content> After',
              directives: []
            }),
            shadowDom: ShadowDomEmulated
          })];
        }});
      MyDir = (function() {
        var MyDir = function MyDir() {
          this.dirProp = '';
        };
        return ($traceurRuntime.createClass)(MyDir, {}, {});
      }());
      Object.defineProperty(MyDir, "annotations", {get: function() {
          return [new Decorator({
            selector: '[my-dir]',
            bind: {'elprop': 'dirProp'}
          })];
        }});
      MyComp = (function() {
        var MyComp = function MyComp() {
          this.ctxProp = 'initial value';
        };
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component({template: new TemplateConfig({directives: [MyDir, ChildComp, SomeTemplate, EmulatedShadowDomCmp, TrivialTemplateDirective]})})];
        }});
      ChildComp = (function() {
        var ChildComp = function ChildComp(service) {
          this.ctxProp = service.greeting;
        };
        return ($traceurRuntime.createClass)(ChildComp, {}, {});
      }());
      Object.defineProperty(ChildComp, "annotations", {get: function() {
          return [new Component({
            selector: 'child-cmp',
            componentServices: [MyService],
            template: new TemplateConfig({
              directives: [MyDir],
              inline: '{{ctxProp}}'
            })
          })];
        }});
      Object.defineProperty(ChildComp, "parameters", {get: function() {
          return [[MyService]];
        }});
      SomeTemplate = (function() {
        var SomeTemplate = function SomeTemplate(viewPort) {
          viewPort.create().setLocal('some-tmpl', 'hello');
          viewPort.create().setLocal('some-tmpl', 'again');
        };
        return ($traceurRuntime.createClass)(SomeTemplate, {}, {});
      }());
      Object.defineProperty(SomeTemplate, "annotations", {get: function() {
          return [new Template({selector: '[some-tmpl]'})];
        }});
      Object.defineProperty(SomeTemplate, "parameters", {get: function() {
          return [[ViewPort]];
        }});
      MyService = (function() {
        var MyService = function MyService() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(MyService, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/integration_spec.map

//# sourceMappingURL=./integration_spec.map