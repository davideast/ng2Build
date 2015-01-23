System.register("core/test/compiler/element_injector_spec", ["test_lib/test_lib", "facade/lang", "facade/collection", "core/compiler/element_injector", "core/annotations/visibility", "di/di", "core/compiler/view", "change_detection/change_detection", "core/compiler/viewport", "core/dom/element", "core/compiler/shadow_dom_emulation/light_dom"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/element_injector_spec";
  var describe,
      ddescribe,
      it,
      iit,
      xit,
      xdescribe,
      expect,
      beforeEach,
      SpyObject,
      isBlank,
      isPresent,
      FIELD,
      IMPLEMENTS,
      proxy,
      ListWrapper,
      MapWrapper,
      List,
      ProtoElementInjector,
      PreBuiltObjects,
      Parent,
      Ancestor,
      Injector,
      Inject,
      bind,
      View,
      ProtoRecordRange,
      ViewPort,
      NgElement,
      LightDom,
      SourceLightDom,
      DestinationLightDom,
      DummyView,
      DummyLightDom,
      Directive,
      SomeOtherDirective,
      NeedsDirective,
      NeedDirectiveFromParent,
      NeedDirectiveFromAncestor,
      NeedsService,
      A_Needs_B,
      B_Needs_A,
      NeedsView;
  function main() {
    var defaultPreBuiltObjects = new PreBuiltObjects(null, null, null, null);
    function humanize(tree, names) {
      var lookupName = (function(item) {
        return ListWrapper.last(ListWrapper.find(names, (function(pair) {
          return pair[0] === item;
        })));
      });
      if (tree.children.length == 0)
        return lookupName(tree);
      var children = tree.children.map((function(m) {
        return humanize(m, names);
      }));
      return [lookupName(tree), children];
    }
    Object.defineProperty(humanize, "parameters", {get: function() {
        return [[], [List]];
      }});
    function injector(bindings) {
      var lightDomAppInjector = arguments[1] !== (void 0) ? arguments[1] : null;
      var shadowDomAppInjector = arguments[2] !== (void 0) ? arguments[2] : null;
      var preBuiltObjects = arguments[3] !== (void 0) ? arguments[3] : null;
      if (isBlank(lightDomAppInjector))
        lightDomAppInjector = new Injector([]);
      var proto = new ProtoElementInjector(null, 0, bindings, isPresent(shadowDomAppInjector));
      var inj = proto.instantiate(null, null);
      var preBuilt = isPresent(preBuiltObjects) ? preBuiltObjects : defaultPreBuiltObjects;
      inj.instantiateDirectives(lightDomAppInjector, shadowDomAppInjector, preBuilt);
      return inj;
    }
    function parentChildInjectors(parentBindings, childBindings) {
      var parentPreBuildObjects = arguments[2] !== (void 0) ? arguments[2] : null;
      if (isBlank(parentPreBuildObjects))
        parentPreBuildObjects = defaultPreBuiltObjects;
      var inj = new Injector([]);
      var protoParent = new ProtoElementInjector(null, 0, parentBindings);
      var parent = protoParent.instantiate(null, null);
      parent.instantiateDirectives(inj, null, parentPreBuildObjects);
      var protoChild = new ProtoElementInjector(protoParent, 1, childBindings, false, 1);
      var child = protoChild.instantiate(parent, null);
      child.instantiateDirectives(inj, null, defaultPreBuiltObjects);
      return child;
    }
    function hostShadowInjectors(hostBindings, shadowBindings) {
      var hostPreBuildObjects = arguments[2] !== (void 0) ? arguments[2] : null;
      if (isBlank(hostPreBuildObjects))
        hostPreBuildObjects = defaultPreBuiltObjects;
      var inj = new Injector([]);
      var shadowInj = inj.createChild([]);
      var protoParent = new ProtoElementInjector(null, 0, hostBindings, true);
      var host = protoParent.instantiate(null, null);
      host.instantiateDirectives(inj, shadowInj, hostPreBuildObjects);
      var protoChild = new ProtoElementInjector(protoParent, 0, shadowBindings, false, 1);
      var shadow = protoChild.instantiate(null, host);
      shadow.instantiateDirectives(shadowInj, null, null);
      return shadow;
    }
    describe("ElementInjector", function() {
      describe("instantiate", function() {
        it("should create an element injector", function() {
          var protoParent = new ProtoElementInjector(null, 0, []);
          var protoChild1 = new ProtoElementInjector(protoParent, 1, []);
          var protoChild2 = new ProtoElementInjector(protoParent, 2, []);
          var p = protoParent.instantiate(null, null);
          var c1 = protoChild1.instantiate(p, null);
          var c2 = protoChild2.instantiate(p, null);
          expect(humanize(p, [[p, 'parent'], [c1, 'child1'], [c2, 'child2']])).toEqual(["parent", ["child1", "child2"]]);
        });
        describe("direct parent", (function() {
          it("should return parent injector when distance is 1", (function() {
            var distance = 1;
            var protoParent = new ProtoElementInjector(null, 0, []);
            var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
            var p = protoParent.instantiate(null, null);
            var c = protoChild.instantiate(p, null);
            expect(c.directParent()).toEqual(p);
          }));
          it("should return null otherwise", (function() {
            var distance = 2;
            var protoParent = new ProtoElementInjector(null, 0, []);
            var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
            var p = protoParent.instantiate(null, null);
            var c = protoChild.instantiate(p, null);
            expect(c.directParent()).toEqual(null);
          }));
        }));
      });
      describe("hasBindings", function() {
        it("should be true when there are bindings", function() {
          var p = new ProtoElementInjector(null, 0, [Directive]);
          expect(p.hasBindings).toBeTruthy();
        });
        it("should be false otherwise", function() {
          var p = new ProtoElementInjector(null, 0, []);
          expect(p.hasBindings).toBeFalsy();
        });
      });
      describe("hasInstances", function() {
        it("should be false when no directives are instantiated", function() {
          expect(injector([]).hasInstances()).toBe(false);
        });
        it("should be true when directives are instantiated", function() {
          expect(injector([Directive]).hasInstances()).toBe(true);
        });
      });
      describe("instantiateDirectives", function() {
        it("should instantiate directives that have no dependencies", function() {
          var inj = injector([Directive]);
          expect(inj.get(Directive)).toBeAnInstanceOf(Directive);
        });
        it("should instantiate directives that depend on other directives", function() {
          var inj = injector([Directive, NeedsDirective]);
          var d = inj.get(NeedsDirective);
          expect(d).toBeAnInstanceOf(NeedsDirective);
          expect(d.dependency).toBeAnInstanceOf(Directive);
        });
        it("should instantiate directives that depend on app services", function() {
          var appInjector = new Injector([bind("service").toValue("service")]);
          var inj = injector([NeedsService], appInjector);
          var d = inj.get(NeedsService);
          expect(d).toBeAnInstanceOf(NeedsService);
          expect(d.service).toEqual("service");
        });
        it("should instantiate directives that depend on pre built objects", function() {
          var view = new DummyView();
          var inj = injector([NeedsView], null, null, new PreBuiltObjects(view, null, null, null));
          expect(inj.get(NeedsView).view).toBe(view);
        });
        it("should instantiate directives that depend on the containing component", function() {
          var shadow = hostShadowInjectors([Directive], [NeedsDirective]);
          var d = shadow.get(NeedsDirective);
          expect(d).toBeAnInstanceOf(NeedsDirective);
          expect(d.dependency).toBeAnInstanceOf(Directive);
        });
        it("should not instantiate directives that depend on other directives in the containing component's ElementInjector", (function() {
          expect((function() {
            hostShadowInjectors([SomeOtherDirective, Directive], [NeedsDirective]);
          })).toThrowError('No provider for Directive! (NeedsDirective -> Directive)');
        }));
        it("should instantiate component directives that depend on app services in the shadow app injector", (function() {
          var shadowAppInjector = new Injector([bind("service").toValue("service")]);
          var inj = injector([NeedsService], null, shadowAppInjector);
          var d = inj.get(NeedsService);
          expect(d).toBeAnInstanceOf(NeedsService);
          expect(d.service).toEqual("service");
        }));
        it("should not instantiate other directives that depend on app services in the shadow app injector", (function() {
          var shadowAppInjector = new Injector([bind("service").toValue("service")]);
          expect((function() {
            injector([SomeOtherDirective, NeedsService], null, shadowAppInjector);
          })).toThrowError('No provider for service! (NeedsService -> service)');
        }));
        it("should return app services", function() {
          var appInjector = new Injector([bind("service").toValue("service")]);
          var inj = injector([], appInjector);
          expect(inj.get('service')).toEqual('service');
        });
        it("should get directives from parent", function() {
          var child = parentChildInjectors([Directive], [NeedDirectiveFromParent]);
          var d = child.get(NeedDirectiveFromParent);
          expect(d).toBeAnInstanceOf(NeedDirectiveFromParent);
          expect(d.dependency).toBeAnInstanceOf(Directive);
        });
        it("should not return parent's directives on self", function() {
          expect((function() {
            injector([Directive, NeedDirectiveFromParent]);
          })).toThrowError();
        });
        it("should get directives from ancestor", function() {
          var child = parentChildInjectors([Directive], [NeedDirectiveFromAncestor]);
          var d = child.get(NeedDirectiveFromAncestor);
          expect(d).toBeAnInstanceOf(NeedDirectiveFromAncestor);
          expect(d.dependency).toBeAnInstanceOf(Directive);
        });
        it("should throw when no directive found", function() {
          expect((function() {
            return injector([NeedDirectiveFromParent]);
          })).toThrowError('No provider for Directive! (NeedDirectiveFromParent -> Directive)');
        });
        it("should accept bindings instead of directive types", function() {
          var inj = injector([bind(Directive).toClass(Directive)]);
          expect(inj.get(Directive)).toBeAnInstanceOf(Directive);
        });
        it("should allow for direct access using getAtIndex", function() {
          var inj = injector([bind(Directive).toClass(Directive)]);
          expect(inj.getAtIndex(0)).toBeAnInstanceOf(Directive);
          expect((function() {
            return inj.getAtIndex(-1);
          })).toThrowError('Index -1 is out-of-bounds.');
          expect((function() {
            return inj.getAtIndex(10);
          })).toThrowError('Index 10 is out-of-bounds.');
        });
        it("should handle cyclic dependencies", function() {
          expect((function() {
            injector([bind(A_Needs_B).toFactory((function(a) {
              return new A_Needs_B(a);
            }), [B_Needs_A]), bind(B_Needs_A).toFactory((function(a) {
              return new B_Needs_A(a);
            }), [A_Needs_B])]);
          })).toThrowError('Cannot instantiate cyclic dependency! ' + '(A_Needs_B -> B_Needs_A -> A_Needs_B)');
        });
      });
      describe("pre built objects", function() {
        it("should return view", function() {
          var view = new DummyView();
          var inj = injector([], null, null, new PreBuiltObjects(view, null, null, null));
          expect(inj.get(View)).toEqual(view);
        });
        it("should return element", function() {
          var element = new NgElement(null);
          var inj = injector([], null, null, new PreBuiltObjects(null, element, null, null));
          expect(inj.get(NgElement)).toEqual(element);
        });
        it('should return viewPort', function() {
          var viewPort = new ViewPort(null, null, null, null);
          var inj = injector([], null, null, new PreBuiltObjects(null, null, viewPort, null));
          expect(inj.get(ViewPort)).toEqual(viewPort);
        });
        describe("light DOM", (function() {
          var lightDom,
              parentPreBuiltObjects;
          beforeEach((function() {
            lightDom = new DummyLightDom();
            parentPreBuiltObjects = new PreBuiltObjects(null, null, null, lightDom);
          }));
          it("should return destination light DOM from the parent's injector", function() {
            var child = parentChildInjectors([], [], parentPreBuiltObjects);
            expect(child.get(DestinationLightDom)).toEqual(lightDom);
          });
          it("should return null when parent's injector is a component boundary", function() {
            var child = hostShadowInjectors([], [], parentPreBuiltObjects);
            expect(child.get(DestinationLightDom)).toBeNull();
          });
          it("should return source light DOM from the closest component boundary", function() {
            var child = hostShadowInjectors([], [], parentPreBuiltObjects);
            expect(child.get(SourceLightDom)).toEqual(lightDom);
          });
        }));
      });
    });
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      describe = m.describe;
      ddescribe = m.ddescribe;
      it = m.it;
      iit = m.iit;
      xit = m.xit;
      xdescribe = m.xdescribe;
      expect = m.expect;
      beforeEach = m.beforeEach;
      SpyObject = m.SpyObject;
    }, function(m) {
      isBlank = m.isBlank;
      isPresent = m.isPresent;
      FIELD = m.FIELD;
      IMPLEMENTS = m.IMPLEMENTS;
      proxy = m.proxy;
    }, function(m) {
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
      List = m.List;
    }, function(m) {
      ProtoElementInjector = m.ProtoElementInjector;
      PreBuiltObjects = m.PreBuiltObjects;
    }, function(m) {
      Parent = m.Parent;
      Ancestor = m.Ancestor;
    }, function(m) {
      Injector = m.Injector;
      Inject = m.Inject;
      bind = m.bind;
    }, function(m) {
      View = m.View;
    }, function(m) {
      ProtoRecordRange = m.ProtoRecordRange;
    }, function(m) {
      ViewPort = m.ViewPort;
    }, function(m) {
      NgElement = m.NgElement;
    }, function(m) {
      LightDom = m.LightDom;
      SourceLightDom = m.SourceLightDom;
      DestinationLightDom = m.DestinationLightDom;
    }],
    execute: function() {
      DummyView = (function($__super) {
        var DummyView = function DummyView() {
          $traceurRuntime.superConstructor(DummyView).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(DummyView, {noSuchMethod: function(m) {
            $traceurRuntime.superGet(this, DummyView.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(DummyView, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(View)];
        }});
      DummyLightDom = (function($__super) {
        var DummyLightDom = function DummyLightDom() {
          $traceurRuntime.superConstructor(DummyLightDom).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(DummyLightDom, {noSuchMethod: function(m) {
            $traceurRuntime.superGet(this, DummyLightDom.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(DummyLightDom, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(LightDom)];
        }});
      Directive = (function() {
        var Directive = function Directive() {};
        return ($traceurRuntime.createClass)(Directive, {}, {});
      }());
      SomeOtherDirective = (function() {
        var SomeOtherDirective = function SomeOtherDirective() {};
        return ($traceurRuntime.createClass)(SomeOtherDirective, {}, {});
      }());
      NeedsDirective = (function() {
        var NeedsDirective = function NeedsDirective(dependency) {
          this.dependency = dependency;
        };
        return ($traceurRuntime.createClass)(NeedsDirective, {}, {});
      }());
      Object.defineProperty(NeedsDirective, "parameters", {get: function() {
          return [[Directive]];
        }});
      NeedDirectiveFromParent = (function() {
        var NeedDirectiveFromParent = function NeedDirectiveFromParent(dependency) {
          this.dependency = dependency;
        };
        return ($traceurRuntime.createClass)(NeedDirectiveFromParent, {}, {});
      }());
      Object.defineProperty(NeedDirectiveFromParent, "parameters", {get: function() {
          return [[Directive, new Parent()]];
        }});
      NeedDirectiveFromAncestor = (function() {
        var NeedDirectiveFromAncestor = function NeedDirectiveFromAncestor(dependency) {
          this.dependency = dependency;
        };
        return ($traceurRuntime.createClass)(NeedDirectiveFromAncestor, {}, {});
      }());
      Object.defineProperty(NeedDirectiveFromAncestor, "parameters", {get: function() {
          return [[Directive, new Ancestor()]];
        }});
      NeedsService = (function() {
        var NeedsService = function NeedsService(service) {
          this.service = service;
        };
        return ($traceurRuntime.createClass)(NeedsService, {}, {});
      }());
      Object.defineProperty(NeedsService, "parameters", {get: function() {
          return [[new Inject("service")]];
        }});
      A_Needs_B = (function() {
        var A_Needs_B = function A_Needs_B(dep) {};
        return ($traceurRuntime.createClass)(A_Needs_B, {}, {});
      }());
      B_Needs_A = (function() {
        var B_Needs_A = function B_Needs_A(dep) {};
        return ($traceurRuntime.createClass)(B_Needs_A, {}, {});
      }());
      NeedsView = (function() {
        var NeedsView = function NeedsView(view) {
          this.view = view;
        };
        return ($traceurRuntime.createClass)(NeedsView, {}, {});
      }());
      Object.defineProperty(NeedsView, "parameters", {get: function() {
          return [[new Inject(View)]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/element_injector_spec.map

//# sourceMappingURL=./element_injector_spec.map