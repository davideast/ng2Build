System.register("core/test/compiler/shadow_dom/light_dom_spec", ["test_lib/test_lib", "facade/lang", "facade/collection", "facade/dom", "core/compiler/shadow_dom_emulation/content_tag", "core/dom/element", "core/compiler/shadow_dom_emulation/light_dom", "core/compiler/view", "core/compiler/viewport", "core/compiler/element_injector", "change_detection/change_detection"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/shadow_dom/light_dom_spec";
  var describe,
      beforeEach,
      it,
      expect,
      ddescribe,
      iit,
      SpyObject,
      el,
      proxy,
      IMPLEMENTS,
      isBlank,
      ListWrapper,
      MapWrapper,
      DOM,
      Content,
      NgElement,
      LightDom,
      View,
      ViewPort,
      ElementInjector,
      ProtoRecordRange,
      FakeElementInjector,
      FakeView,
      FakeViewPort,
      FakeContentTag;
  function main() {
    describe('LightDom', function() {
      var lightDomView;
      beforeEach((function() {
        lightDomView = new FakeView([], MapWrapper.create());
      }));
      describe("contentTags", (function() {
        it("should collect content tags from element injectors", (function() {
          var tag = new FakeContentTag();
          var shadowDomView = new FakeView([new FakeElementInjector(tag, null)]);
          var lightDom = new LightDom(lightDomView, shadowDomView, el("<div></div>"));
          expect(lightDom.contentTags()).toEqual([tag]);
        }));
        it("should collect content tags from view ports", (function() {
          var tag = new FakeContentTag();
          var vp = new FakeViewPort(null, [new FakeView([new FakeElementInjector(tag, null)])]);
          var shadowDomView = new FakeView([new FakeElementInjector(null, vp)]);
          var lightDom = new LightDom(lightDomView, shadowDomView, el("<div></div>"));
          expect(lightDom.contentTags()).toEqual([tag]);
        }));
      }));
      describe("expanded roots", (function() {
        it("should contain root nodes", (function() {
          var lightDomEl = el("<div><a></a></div>");
          var lightDom = new LightDom(lightDomView, new FakeView(), lightDomEl);
          expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
        }));
        it("should include view port nodes", (function() {
          var lightDomEl = el("<div><template></template></div>");
          var template = lightDomEl.childNodes[0];
          var lightDomView = new FakeView([], MapWrapper.createFromPairs([[template, new FakeViewPort([el("<a></a>")], null)]]));
          var lightDom = new LightDom(lightDomView, new FakeView(), lightDomEl);
          expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
        }));
      }));
      describe("redistribute", (function() {
        it("should redistribute nodes between content tags with select property set", (function() {
          var contentA = new FakeContentTag("a");
          var contentB = new FakeContentTag("b");
          var lightDomEl = el("<div><a>1</a><b>2</b><a>3</a></div>");
          var lightDom = new LightDom(lightDomView, new FakeView([new FakeElementInjector(contentA, null), new FakeElementInjector(contentB, null)]), lightDomEl);
          lightDom.redistribute();
          expect(toHtml(contentA.nodes)).toEqual(["<a>1</a>", "<a>3</a>"]);
          expect(toHtml(contentB.nodes)).toEqual(["<b>2</b>"]);
        }));
        it("should support wildcard content tags", (function() {
          var wildcard = new FakeContentTag(null);
          var contentB = new FakeContentTag("b");
          var lightDomEl = el("<div><a>1</a><b>2</b><a>3</a></div>");
          var lightDom = new LightDom(lightDomView, new FakeView([new FakeElementInjector(wildcard, null), new FakeElementInjector(contentB, null)]), lightDomEl);
          lightDom.redistribute();
          expect(toHtml(wildcard.nodes)).toEqual(["<a>1</a>", "<b>2</b>", "<a>3</a>"]);
          expect(toHtml(contentB.nodes)).toEqual([]);
        }));
      }));
    });
  }
  function toHtml(nodes) {
    if (isBlank(nodes))
      return [];
    return ListWrapper.map(nodes, DOM.getOuterHTML);
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
      SpyObject = m.SpyObject;
      el = m.el;
    }, function(m) {
      proxy = m.proxy;
      IMPLEMENTS = m.IMPLEMENTS;
      isBlank = m.isBlank;
    }, function(m) {
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
    }, function(m) {
      DOM = m.DOM;
    }, function(m) {
      Content = m.Content;
    }, function(m) {
      NgElement = m.NgElement;
    }, function(m) {
      LightDom = m.LightDom;
    }, function(m) {
      View = m.View;
    }, function(m) {
      ViewPort = m.ViewPort;
    }, function(m) {
      ElementInjector = m.ElementInjector;
    }, function(m) {
      ProtoRecordRange = m.ProtoRecordRange;
    }],
    execute: function() {
      FakeElementInjector = (function() {
        var FakeElementInjector = function FakeElementInjector(content, viewPort) {
          this.content = content;
          this.viewPort = viewPort;
        };
        return ($traceurRuntime.createClass)(FakeElementInjector, {
          hasDirective: function(type) {
            return this.content != null;
          },
          hasPreBuiltObject: function(type) {
            return this.viewPort != null;
          },
          get: function(t) {
            if (t === Content)
              return this.content;
            if (t === ViewPort)
              return this.viewPort;
            return null;
          },
          noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeElementInjector.prototype, "noSuchMethod").call(this, i);
          }
        }, {});
      }());
      Object.defineProperty(FakeElementInjector, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ElementInjector)];
        }});
      FakeView = (function() {
        var FakeView = function FakeView() {
          var elementInjectors = arguments[0] !== (void 0) ? arguments[0] : null;
          var ports = arguments[1] !== (void 0) ? arguments[1] : null;
          this.elementInjectors = elementInjectors;
          this.ports = ports;
        };
        return ($traceurRuntime.createClass)(FakeView, {
          getViewPortByTemplateElement: function(el) {
            if (isBlank(this.ports))
              return null;
            return MapWrapper.get(this.ports, el);
          },
          noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeView.prototype, "noSuchMethod").call(this, i);
          }
        }, {});
      }());
      Object.defineProperty(FakeView, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(View)];
        }});
      FakeViewPort = (function() {
        var FakeViewPort = function FakeViewPort(nodes, views) {
          this._nodes = nodes;
          this._contentTagContainers = views;
        };
        return ($traceurRuntime.createClass)(FakeViewPort, {
          nodes: function() {
            return this._nodes;
          },
          contentTagContainers: function() {
            return this._contentTagContainers;
          },
          noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeViewPort.prototype, "noSuchMethod").call(this, i);
          }
        }, {});
      }());
      Object.defineProperty(FakeViewPort, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ViewPort)];
        }});
      FakeContentTag = (function() {
        var FakeContentTag = function FakeContentTag() {
          var select = arguments[0] !== (void 0) ? arguments[0] : null;
          this.select = select;
        };
        return ($traceurRuntime.createClass)(FakeContentTag, {
          insert: function(nodes) {
            this.nodes = ListWrapper.clone(nodes);
          },
          noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeContentTag.prototype, "noSuchMethod").call(this, i);
          }
        }, {});
      }());
      Object.defineProperty(FakeContentTag, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(Content)];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/shadow_dom/light_dom_spec.map

//# sourceMappingURL=./light_dom_spec.map