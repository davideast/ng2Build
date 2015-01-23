System.register("core/test/compiler/view_spec", ["test_lib/test_lib", "core/compiler/view", "core/compiler/element_injector", "core/compiler/shadow_dom", "core/compiler/directive_metadata_reader", "core/annotations/annotations", "core/core", "change_detection/change_detection", "core/annotations/template_config", "facade/collection", "facade/dom", "facade/lang", "di/di", "core/compiler/viewport", "reflection/reflection"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/view_spec";
  var describe,
      xit,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      el,
      ProtoView,
      ElementPropertyMemento,
      DirectivePropertyMemento,
      ProtoElementInjector,
      ElementInjector,
      ShadowDomEmulated,
      DirectiveMetadataReader,
      Component,
      Decorator,
      Template,
      OnChange,
      Lexer,
      Parser,
      ProtoRecordRange,
      ChangeDetector,
      TemplateConfig,
      List,
      MapWrapper,
      DOM,
      Element,
      int,
      proxy,
      IMPLEMENTS,
      Injector,
      View,
      ViewPort,
      reflector,
      FakeViewPort,
      SomeDirective,
      DirectiveImplementingOnChange,
      SomeService,
      SomeComponent,
      SomeComponentWithEmulatedShadowDom,
      ServiceDependentDecorator,
      SomeTemplate,
      AnotherDirective,
      MyEvaluationContext,
      TestProtoElementInjector;
  function main() {
    describe('view', function() {
      var parser,
          someComponentDirective,
          someTemplateDirective;
      function createView(protoView) {
        var ctx = new MyEvaluationContext();
        var view = protoView.instantiate(null);
        view.hydrate(null, null, ctx);
        return view;
      }
      beforeEach((function() {
        parser = new Parser(new Lexer());
        someComponentDirective = new DirectiveMetadataReader().read(SomeComponent);
        someTemplateDirective = new DirectiveMetadataReader().read(SomeTemplate);
      }));
      describe('instatiated from protoView', (function() {
        var view;
        beforeEach((function() {
          var pv = new ProtoView(el('<div id="1"></div>'), new ProtoRecordRange());
          view = pv.instantiate(null);
        }));
        it('should be dehydrated by default', (function() {
          expect(view.hydrated()).toBe(false);
        }));
        it('should be able to be hydrated and dehydrated', (function() {
          var ctx = new Object();
          view.hydrate(null, null, ctx);
          expect(view.hydrated()).toBe(true);
          view.dehydrate();
          expect(view.hydrated()).toBe(false);
        }));
      }));
      describe("getViewPortByTemplateElement", (function() {
        var view,
            viewPort,
            templateElement;
        beforeEach((function() {
          templateElement = el("<template></template>");
          view = new View(null, null, new ProtoRecordRange(), MapWrapper.create());
          viewPort = new FakeViewPort(templateElement);
          view.viewPorts = [viewPort];
        }));
        it("should return null when the given element is not an element", (function() {
          expect(view.getViewPortByTemplateElement("not an element")).toBeNull();
        }));
        it("should return a view port with the matching template element", (function() {
          expect(view.getViewPortByTemplateElement(templateElement)).toBe(viewPort);
        }));
      }));
      describe('with locals', function() {
        var view;
        beforeEach((function() {
          var pv = new ProtoView(el('<div id="1"></div>'), new ProtoRecordRange());
          pv.bindVariable('context-foo', 'template-foo');
          view = createView(pv);
        }));
        it('should support setting of declared locals', (function() {
          view.setLocal('context-foo', 'bar');
          expect(view.context.get('template-foo')).toBe('bar');
        }));
        it('should throw on undeclared locals', (function() {
          expect((function() {
            return view.setLocal('setMePlease', 'bar');
          })).toThrowError();
        }));
        it('when dehydrated should set locals to null', (function() {
          view.setLocal('context-foo', 'bar');
          view.dehydrate();
          view.hydrate(null, null, new Object());
          expect(view.context.get('template-foo')).toBe(null);
        }));
        it('should throw when trying to set on dehydrated view', (function() {
          view.dehydrate();
          expect((function() {
            return view.setLocal('context-foo', 'bar');
          })).toThrowError();
        }));
      });
      describe('instatiated and hydrated', function() {
        function createCollectDomNodesTestCases(useTemplateElement) {
          function templateAwareCreateElement(html) {
            return el(useTemplateElement ? ("<template>" + html + "</template>") : html);
          }
          it('should collect the root node in the ProtoView element', (function() {
            var pv = new ProtoView(templateAwareCreateElement('<div id="1"></div>'), new ProtoRecordRange());
            var view = pv.instantiate(null);
            view.hydrate(null, null, null);
            expect(view.nodes.length).toBe(1);
            expect(view.nodes[0].getAttribute('id')).toEqual('1');
          }));
          describe('collect elements with property bindings', (function() {
            it('should collect property bindings on the root element if it has the ng-binding class', (function() {
              var pv = new ProtoView(templateAwareCreateElement('<div [prop]="a" class="ng-binding"></div>'), new ProtoRecordRange());
              pv.bindElement(null);
              pv.bindElementProperty(parser.parseBinding('a', null), 'prop', reflector.setter('prop'));
              var view = pv.instantiate(null);
              view.hydrate(null, null, null);
              expect(view.bindElements.length).toEqual(1);
              expect(view.bindElements[0]).toBe(view.nodes[0]);
            }));
            it('should collect property bindings on child elements with ng-binding class', (function() {
              var pv = new ProtoView(templateAwareCreateElement('<div><span></span><span class="ng-binding"></span></div>'), new ProtoRecordRange());
              pv.bindElement(null);
              pv.bindElementProperty(parser.parseBinding('b', null), 'a', reflector.setter('a'));
              var view = pv.instantiate(null);
              view.hydrate(null, null, null);
              expect(view.bindElements.length).toEqual(1);
              expect(view.bindElements[0]).toBe(view.nodes[0].childNodes[1]);
            }));
          }));
          describe('collect text nodes with bindings', (function() {
            it('should collect text nodes under the root element', (function() {
              var pv = new ProtoView(templateAwareCreateElement('<div class="ng-binding">{{}}<span></span>{{}}</div>'), new ProtoRecordRange());
              pv.bindElement(null);
              pv.bindTextNode(0, parser.parseBinding('a', null));
              pv.bindTextNode(2, parser.parseBinding('b', null));
              var view = pv.instantiate(null);
              view.hydrate(null, null, null);
              expect(view.textNodes.length).toEqual(2);
              expect(view.textNodes[0]).toBe(view.nodes[0].childNodes[0]);
              expect(view.textNodes[1]).toBe(view.nodes[0].childNodes[2]);
            }));
            it('should collect text nodes with bindings on child elements with ng-binding class', (function() {
              var pv = new ProtoView(templateAwareCreateElement('<div><span> </span><span class="ng-binding">{{}}</span></div>'), new ProtoRecordRange());
              pv.bindElement(null);
              pv.bindTextNode(0, parser.parseBinding('b', null));
              var view = pv.instantiate(null);
              view.hydrate(null, null, null);
              expect(view.textNodes.length).toEqual(1);
              expect(view.textNodes[0]).toBe(view.nodes[0].childNodes[1].childNodes[0]);
            }));
          }));
        }
        Object.defineProperty(createCollectDomNodesTestCases, "parameters", {get: function() {
            return [[$traceurRuntime.type.boolean]];
          }});
        describe('inplace instantiation', (function() {
          it('should be supported.', (function() {
            var template = el('<div></div>');
            var pv = new ProtoView(template, new ProtoRecordRange());
            pv.instantiateInPlace = true;
            var view = pv.instantiate(null);
            view.hydrate(null, null, null);
            expect(view.nodes[0]).toBe(template);
          }));
          it('should be off by default.', (function() {
            var template = el('<div></div>');
            var view = new ProtoView(template, new ProtoRecordRange()).instantiate(null);
            view.hydrate(null, null, null);
            expect(view.nodes[0]).not.toBe(template);
          }));
        }));
        describe('collect dom nodes with a regular element as root', (function() {
          createCollectDomNodesTestCases(false);
        }));
        describe('collect dom nodes with a template element as root', (function() {
          createCollectDomNodesTestCases(true);
        }));
        describe('create ElementInjectors', (function() {
          it('should use the directives of the ProtoElementInjector', (function() {
            var pv = new ProtoView(el('<div class="ng-binding"></div>'), new ProtoRecordRange());
            pv.bindElement(new ProtoElementInjector(null, 1, [SomeDirective]));
            var view = pv.instantiate(null);
            view.hydrate(null, null, null);
            expect(view.elementInjectors.length).toBe(1);
            expect(view.elementInjectors[0].get(SomeDirective) instanceof SomeDirective).toBe(true);
          }));
          it('should use the correct parent', (function() {
            var pv = new ProtoView(el('<div class="ng-binding"><span class="ng-binding"></span></div>'), new ProtoRecordRange());
            var protoParent = new ProtoElementInjector(null, 0, [SomeDirective]);
            pv.bindElement(protoParent);
            pv.bindElement(new ProtoElementInjector(protoParent, 1, [AnotherDirective]));
            var view = pv.instantiate(null);
            view.hydrate(null, null, null);
            expect(view.elementInjectors.length).toBe(2);
            expect(view.elementInjectors[0].get(SomeDirective) instanceof SomeDirective).toBe(true);
            expect(view.elementInjectors[1].parent).toBe(view.elementInjectors[0]);
          }));
          it('should not pass the host injector when a parent injector exists', (function() {
            var pv = new ProtoView(el('<div class="ng-binding"><span class="ng-binding"></span></div>'), new ProtoRecordRange());
            var protoParent = new ProtoElementInjector(null, 0, [SomeDirective]);
            pv.bindElement(protoParent);
            var testProtoElementInjector = new TestProtoElementInjector(protoParent, 1, [AnotherDirective]);
            pv.bindElement(testProtoElementInjector);
            var hostProtoInjector = new ProtoElementInjector(null, 0, []);
            var hostInjector = hostProtoInjector.instantiate(null, null);
            var view;
            expect((function() {
              return view = pv.instantiate(hostInjector);
            })).not.toThrow();
            expect(testProtoElementInjector.parentElementInjector).toBe(view.elementInjectors[0]);
            expect(testProtoElementInjector.hostElementInjector).toBeNull();
          }));
          it('should pass the host injector when there is no parent injector', (function() {
            var pv = new ProtoView(el('<div class="ng-binding"><span class="ng-binding"></span></div>'), new ProtoRecordRange());
            pv.bindElement(new ProtoElementInjector(null, 0, [SomeDirective]));
            var testProtoElementInjector = new TestProtoElementInjector(null, 1, [AnotherDirective]);
            pv.bindElement(testProtoElementInjector);
            var hostProtoInjector = new ProtoElementInjector(null, 0, []);
            var hostInjector = hostProtoInjector.instantiate(null, null);
            expect((function() {
              return pv.instantiate(hostInjector);
            })).not.toThrow();
            expect(testProtoElementInjector.parentElementInjector).toBeNull();
            expect(testProtoElementInjector.hostElementInjector).toBe(hostInjector);
          }));
        }));
        describe('collect root element injectors', (function() {
          it('should collect a single root element injector', (function() {
            var pv = new ProtoView(el('<div class="ng-binding"><span class="ng-binding"></span></div>'), new ProtoRecordRange());
            var protoParent = new ProtoElementInjector(null, 0, [SomeDirective]);
            pv.bindElement(protoParent);
            pv.bindElement(new ProtoElementInjector(protoParent, 1, [AnotherDirective]));
            var view = pv.instantiate(null);
            view.hydrate(null, null, null);
            expect(view.rootElementInjectors.length).toBe(1);
            expect(view.rootElementInjectors[0].get(SomeDirective) instanceof SomeDirective).toBe(true);
          }));
          it('should collect multiple root element injectors', (function() {
            var pv = new ProtoView(el('<div><span class="ng-binding"></span><span class="ng-binding"></span></div>'), new ProtoRecordRange());
            pv.bindElement(new ProtoElementInjector(null, 1, [SomeDirective]));
            pv.bindElement(new ProtoElementInjector(null, 2, [AnotherDirective]));
            var view = pv.instantiate(null);
            view.hydrate(null, null, null);
            expect(view.rootElementInjectors.length).toBe(2);
            expect(view.rootElementInjectors[0].get(SomeDirective) instanceof SomeDirective).toBe(true);
            expect(view.rootElementInjectors[1].get(AnotherDirective) instanceof AnotherDirective).toBe(true);
          }));
        }));
        describe('with component views', (function() {
          var ctx;
          function createComponentWithSubPV(subProtoView) {
            var pv = new ProtoView(el('<cmp class="ng-binding"></cmp>'), new ProtoRecordRange());
            var binder = pv.bindElement(new ProtoElementInjector(null, 0, [SomeComponent], true));
            binder.componentDirective = someComponentDirective;
            binder.nestedProtoView = subProtoView;
            return pv;
          }
          function createNestedView(protoView) {
            ctx = new MyEvaluationContext();
            var view = protoView.instantiate(null);
            view.hydrate(new Injector([]), null, ctx);
            return view;
          }
          it('should expose component services to the component', (function() {
            var subpv = new ProtoView(el('<span></span>'), new ProtoRecordRange());
            var pv = createComponentWithSubPV(subpv);
            var view = createNestedView(pv);
            var comp = view.rootElementInjectors[0].get(SomeComponent);
            expect(comp.service).toBeAnInstanceOf(SomeService);
          }));
          it('should expose component services and component instance to directives in the shadow Dom', (function() {
            var subpv = new ProtoView(el('<div dec class="ng-binding">hello shadow dom</div>'), new ProtoRecordRange());
            subpv.bindElement(new ProtoElementInjector(null, 0, [ServiceDependentDecorator]));
            var pv = createComponentWithSubPV(subpv);
            var view = createNestedView(pv);
            var subView = view.componentChildViews[0];
            var subInj = subView.rootElementInjectors[0];
            var subDecorator = subInj.get(ServiceDependentDecorator);
            var comp = view.rootElementInjectors[0].get(SomeComponent);
            expect(subDecorator).toBeAnInstanceOf(ServiceDependentDecorator);
            expect(subDecorator.service).toBe(comp.service);
            expect(subDecorator.component).toBe(comp);
          }));
          function expectViewHasNoDirectiveInstances(view) {
            view.elementInjectors.forEach((function(inj) {
              return expect(inj.hasInstances()).toBe(false);
            }));
          }
          it('dehydration should dehydrate child component views too', (function() {
            var subpv = new ProtoView(el('<div dec class="ng-binding">hello shadow dom</div>'), new ProtoRecordRange());
            subpv.bindElement(new ProtoElementInjector(null, 0, [ServiceDependentDecorator]));
            var pv = createComponentWithSubPV(subpv);
            var view = createNestedView(pv);
            view.dehydrate();
            expect(view.hydrated()).toBe(false);
            expectViewHasNoDirectiveInstances(view);
            view.componentChildViews.forEach((function(view) {
              return expectViewHasNoDirectiveInstances(view);
            }));
          }));
          it('should create shadow dom', (function() {
            var subpv = new ProtoView(el('<span>hello shadow dom</span>'), new ProtoRecordRange());
            var pv = createComponentWithSubPV(subpv);
            var view = createNestedView(pv);
            expect(view.nodes[0].shadowRoot.childNodes[0].childNodes[0].nodeValue).toEqual('hello shadow dom');
          }));
          it('should use the provided shadow DOM strategy', (function() {
            var subpv = new ProtoView(el('<span>hello shadow dom</span>'), new ProtoRecordRange());
            var pv = new ProtoView(el('<cmp class="ng-binding"></cmp>'), new ProtoRecordRange());
            var binder = pv.bindElement(new ProtoElementInjector(null, 0, [SomeComponentWithEmulatedShadowDom], true));
            binder.componentDirective = new DirectiveMetadataReader().read(SomeComponentWithEmulatedShadowDom);
            binder.nestedProtoView = subpv;
            var view = createNestedView(pv);
            expect(view.nodes[0].childNodes[0].childNodes[0].nodeValue).toEqual('hello shadow dom');
          }));
        }));
        describe('with template views', (function() {
          function createViewWithTemplate() {
            var templateProtoView = new ProtoView(el('<div id="1"></div>'), new ProtoRecordRange());
            var pv = new ProtoView(el('<someTmpl class="ng-binding"></someTmpl>'), new ProtoRecordRange());
            var binder = pv.bindElement(new ProtoElementInjector(null, 0, [SomeTemplate]));
            binder.templateDirective = someTemplateDirective;
            binder.nestedProtoView = templateProtoView;
            return createView(pv);
          }
          it('should create a viewPort for the template directive', (function() {
            var view = createViewWithTemplate();
            var tmplComp = view.rootElementInjectors[0].get(SomeTemplate);
            expect(tmplComp.viewPort).not.toBe(null);
          }));
          it('dehydration should dehydrate viewports', (function() {
            var view = createViewWithTemplate();
            var tmplComp = view.rootElementInjectors[0].get(SomeTemplate);
            expect(tmplComp.viewPort.hydrated()).toBe(false);
          }));
        }));
        describe('event handlers', (function() {
          var view,
              ctx,
              called;
          function createViewAndContext(protoView) {
            view = createView(protoView);
            ctx = view.context;
            called = 0;
            ctx.callMe = (function() {
              return called += 1;
            });
          }
          function dispatchClick(el) {
            DOM.dispatchEvent(el, DOM.createMouseEvent('click'));
          }
          it('should fire on non-bubbling native events', (function() {
            var pv = new ProtoView(el('<div class="ng-binding"><div></div></div>'), new ProtoRecordRange());
            pv.bindElement(null);
            pv.bindEvent('click', parser.parseBinding('callMe()', null));
            createViewAndContext(pv);
            dispatchClick(view.nodes[0]);
            dispatchClick(view.nodes[0].firstChild);
            expect(called).toEqual(1);
          }));
        }));
        describe('react to record changes', (function() {
          var view,
              cd,
              ctx;
          function createViewAndChangeDetector(protoView) {
            view = createView(protoView);
            ctx = view.context;
            cd = new ChangeDetector(view.recordRange);
          }
          it('should consume text node changes', (function() {
            var pv = new ProtoView(el('<div class="ng-binding">{{}}</div>'), new ProtoRecordRange());
            pv.bindElement(null);
            pv.bindTextNode(0, parser.parseBinding('foo', null));
            createViewAndChangeDetector(pv);
            ctx.foo = 'buz';
            cd.detectChanges();
            expect(view.textNodes[0].nodeValue).toEqual('buz');
          }));
          it('should consume element binding changes', (function() {
            var pv = new ProtoView(el('<div class="ng-binding"></div>'), new ProtoRecordRange());
            pv.bindElement(null);
            pv.bindElementProperty(parser.parseBinding('foo', null), 'id', reflector.setter('id'));
            createViewAndChangeDetector(pv);
            ctx.foo = 'buz';
            cd.detectChanges();
            expect(view.bindElements[0].id).toEqual('buz');
          }));
          it('should consume directive watch expression change', (function() {
            var pv = new ProtoView(el('<div class="ng-binding"></div>'), new ProtoRecordRange());
            pv.bindElement(new ProtoElementInjector(null, 0, [SomeDirective]));
            pv.bindDirectiveProperty(0, parser.parseBinding('foo', null), 'prop', reflector.setter('prop'), false);
            createViewAndChangeDetector(pv);
            ctx.foo = 'buz';
            cd.detectChanges();
            expect(view.elementInjectors[0].get(SomeDirective).prop).toEqual('buz');
          }));
          it('should notify a directive about changes after all its properties have been set', (function() {
            var pv = new ProtoView(el('<div class="ng-binding"></div>'), new ProtoRecordRange());
            pv.bindElement(new ProtoElementInjector(null, 0, [DirectiveImplementingOnChange]));
            pv.bindDirectiveProperty(0, parser.parseBinding('a', null), 'a', reflector.setter('a'), false);
            pv.bindDirectiveProperty(0, parser.parseBinding('b', null), 'b', reflector.setter('b'), false);
            createViewAndChangeDetector(pv);
            ctx.a = 100;
            ctx.b = 200;
            cd.detectChanges();
            var directive = view.elementInjectors[0].get(DirectiveImplementingOnChange);
            expect(directive.c).toEqual(300);
          }));
          it('should provide a map of updated properties', (function() {
            var pv = new ProtoView(el('<div class="ng-binding"></div>'), new ProtoRecordRange());
            pv.bindElement(new ProtoElementInjector(null, 0, [DirectiveImplementingOnChange]));
            pv.bindDirectiveProperty(0, parser.parseBinding('a', null), 'a', reflector.setter('a'), false);
            pv.bindDirectiveProperty(0, parser.parseBinding('b', null), 'b', reflector.setter('b'), false);
            createViewAndChangeDetector(pv);
            ctx.a = 0;
            ctx.b = 0;
            cd.detectChanges();
            ctx.a = 100;
            cd.detectChanges();
            var directive = view.elementInjectors[0].get(DirectiveImplementingOnChange);
            expect(directive.changes["a"].currentValue).toEqual(100);
            expect(directive.changes["b"]).not.toBeDefined();
          }));
        }));
      });
      describe('protoView createRootProtoView', (function() {
        var element,
            pv;
        beforeEach((function() {
          element = DOM.createElement('div');
          pv = new ProtoView(el('<div>hi</div>'), new ProtoRecordRange());
        }));
        it('should create the root component when instantiated', (function() {
          var rootProtoView = ProtoView.createRootProtoView(pv, element, someComponentDirective);
          var view = rootProtoView.instantiate(null);
          view.hydrate(new Injector([]), null, null);
          expect(view.rootElementInjectors[0].get(SomeComponent)).not.toBe(null);
        }));
        it('should inject the protoView into the shadowDom', (function() {
          var rootProtoView = ProtoView.createRootProtoView(pv, element, someComponentDirective);
          var view = rootProtoView.instantiate(null);
          view.hydrate(new Injector([]), null, null);
          expect(element.shadowRoot.childNodes[0].childNodes[0].nodeValue).toEqual('hi');
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
      ProtoView = m.ProtoView;
      ElementPropertyMemento = m.ElementPropertyMemento;
      DirectivePropertyMemento = m.DirectivePropertyMemento;
      View = m.View;
    }, function(m) {
      ProtoElementInjector = m.ProtoElementInjector;
      ElementInjector = m.ElementInjector;
    }, function(m) {
      ShadowDomEmulated = m.ShadowDomEmulated;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      Component = m.Component;
      Decorator = m.Decorator;
      Template = m.Template;
    }, function(m) {
      OnChange = m.OnChange;
    }, function(m) {
      Lexer = m.Lexer;
      Parser = m.Parser;
      ProtoRecordRange = m.ProtoRecordRange;
      ChangeDetector = m.ChangeDetector;
    }, function(m) {
      TemplateConfig = m.TemplateConfig;
    }, function(m) {
      List = m.List;
      MapWrapper = m.MapWrapper;
    }, function(m) {
      DOM = m.DOM;
      Element = m.Element;
    }, function(m) {
      int = m.int;
      proxy = m.proxy;
      IMPLEMENTS = m.IMPLEMENTS;
    }, function(m) {
      Injector = m.Injector;
    }, function(m) {
      ViewPort = m.ViewPort;
    }, function(m) {
      reflector = m.reflector;
    }],
    execute: function() {
      FakeViewPort = (function() {
        var FakeViewPort = function FakeViewPort(templateElement) {
          this.templateElement = templateElement;
        };
        return ($traceurRuntime.createClass)(FakeViewPort, {noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeViewPort.prototype, "noSuchMethod").call(this, i);
          }}, {});
      }());
      Object.defineProperty(FakeViewPort, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ViewPort)];
        }});
      SomeDirective = (function() {
        var SomeDirective = function SomeDirective() {
          this.prop = 'foo';
        };
        return ($traceurRuntime.createClass)(SomeDirective, {}, {});
      }());
      DirectiveImplementingOnChange = (function($__super) {
        var DirectiveImplementingOnChange = function DirectiveImplementingOnChange() {
          $traceurRuntime.superConstructor(DirectiveImplementingOnChange).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(DirectiveImplementingOnChange, {onChange: function(changes) {
            this.c = this.a + this.b;
            this.changes = changes;
          }}, {}, $__super);
      }(OnChange));
      SomeService = (function() {
        var SomeService = function SomeService() {};
        return ($traceurRuntime.createClass)(SomeService, {}, {});
      }());
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent(service) {
          this.service = service;
        };
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
      Object.defineProperty(SomeComponent, "annotations", {get: function() {
          return [new Component({componentServices: [SomeService]})];
        }});
      Object.defineProperty(SomeComponent, "parameters", {get: function() {
          return [[SomeService]];
        }});
      SomeComponentWithEmulatedShadowDom = (function() {
        var SomeComponentWithEmulatedShadowDom = function SomeComponentWithEmulatedShadowDom() {};
        return ($traceurRuntime.createClass)(SomeComponentWithEmulatedShadowDom, {}, {});
      }());
      Object.defineProperty(SomeComponentWithEmulatedShadowDom, "annotations", {get: function() {
          return [new Component({shadowDom: ShadowDomEmulated})];
        }});
      ServiceDependentDecorator = (function() {
        var ServiceDependentDecorator = function ServiceDependentDecorator(component, service) {
          this.component = component;
          this.service = service;
        };
        return ($traceurRuntime.createClass)(ServiceDependentDecorator, {}, {});
      }());
      Object.defineProperty(ServiceDependentDecorator, "annotations", {get: function() {
          return [new Decorator({selector: '[dec]'})];
        }});
      Object.defineProperty(ServiceDependentDecorator, "parameters", {get: function() {
          return [[SomeComponent], [SomeService]];
        }});
      SomeTemplate = (function() {
        var SomeTemplate = function SomeTemplate(viewPort) {
          this.viewPort = viewPort;
        };
        return ($traceurRuntime.createClass)(SomeTemplate, {}, {});
      }());
      Object.defineProperty(SomeTemplate, "annotations", {get: function() {
          return [new Template({selector: 'someTmpl'})];
        }});
      Object.defineProperty(SomeTemplate, "parameters", {get: function() {
          return [[ViewPort]];
        }});
      AnotherDirective = (function() {
        var AnotherDirective = function AnotherDirective() {
          this.prop = 'anotherFoo';
        };
        return ($traceurRuntime.createClass)(AnotherDirective, {}, {});
      }());
      MyEvaluationContext = (function() {
        var MyEvaluationContext = function MyEvaluationContext() {
          this.foo = 'bar';
        };
        return ($traceurRuntime.createClass)(MyEvaluationContext, {}, {});
      }());
      TestProtoElementInjector = (function($__super) {
        var TestProtoElementInjector = function TestProtoElementInjector(parent, index, bindings) {
          var firstBindingIsComponent = arguments[3] !== (void 0) ? arguments[3] : false;
          $traceurRuntime.superConstructor(TestProtoElementInjector).call(this, parent, index, bindings, firstBindingIsComponent);
        };
        return ($traceurRuntime.createClass)(TestProtoElementInjector, {instantiate: function(parent, host) {
            this.parentElementInjector = parent;
            this.hostElementInjector = host;
            return $traceurRuntime.superGet(this, TestProtoElementInjector.prototype, "instantiate").call(this, parent, host);
          }}, {}, $__super);
      }(ProtoElementInjector));
      Object.defineProperty(TestProtoElementInjector, "parameters", {get: function() {
          return [[ProtoElementInjector], [int], [List], [$traceurRuntime.type.boolean]];
        }});
      Object.defineProperty(TestProtoElementInjector.prototype.instantiate, "parameters", {get: function() {
          return [[ElementInjector], [ElementInjector]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/view_spec.map

//# sourceMappingURL=./view_spec.map