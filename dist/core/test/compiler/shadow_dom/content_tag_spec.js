System.register("core/test/compiler/shadow_dom/content_tag_spec", ["test_lib/test_lib", "facade/lang", "facade/dom", "core/compiler/shadow_dom_emulation/content_tag", "core/dom/element", "core/compiler/shadow_dom_emulation/light_dom"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/shadow_dom/content_tag_spec";
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
      DOM,
      Content,
      NgElement,
      LightDom,
      DummyLightDom,
      _script;
  function main() {
    describe('Content', function() {
      it("should insert the nodes", (function() {
        var lightDom = new DummyLightDom();
        var parent = el("<div><content></content></div>");
        var content = DOM.firstChild(parent);
        var c = new Content(lightDom, new NgElement(content));
        c.insert([el("<a></a>"), el("<b></b>")]);
        expect(DOM.getInnerHTML(parent)).toEqual((_script + "<a></a><b></b>" + _script));
      }));
      it("should remove the nodes from the previous insertion", (function() {
        var lightDom = new DummyLightDom();
        var parent = el("<div><content></content></div>");
        var content = DOM.firstChild(parent);
        var c = new Content(lightDom, new NgElement(content));
        c.insert([el("<a></a>")]);
        c.insert([el("<b></b>")]);
        expect(DOM.getInnerHTML(parent)).toEqual((_script + "<b></b>" + _script));
      }));
      it("should insert empty list", (function() {
        var lightDom = new DummyLightDom();
        var parent = el("<div><content></content></div>");
        var content = DOM.firstChild(parent);
        var c = new Content(lightDom, new NgElement(content));
        c.insert([el("<a></a>")]);
        c.insert([]);
        expect(DOM.getInnerHTML(parent)).toEqual(("" + _script + _script));
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
      SpyObject = m.SpyObject;
      el = m.el;
    }, function(m) {
      proxy = m.proxy;
      IMPLEMENTS = m.IMPLEMENTS;
    }, function(m) {
      DOM = m.DOM;
    }, function(m) {
      Content = m.Content;
    }, function(m) {
      NgElement = m.NgElement;
    }, function(m) {
      LightDom = m.LightDom;
    }],
    execute: function() {
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
      _script = "<script type=\"ng/content\"></script>";
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/shadow_dom/content_tag_spec.map

//# sourceMappingURL=./content_tag_spec.map