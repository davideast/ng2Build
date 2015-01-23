System.register("core/dom/element", ["facade/dom", "facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "core/dom/element";
  var DOM,
      Element,
      normalizeBlank,
      NgElement;
  return {
    setters: [function(m) {
      DOM = m.DOM;
      Element = m.Element;
    }, function(m) {
      normalizeBlank = m.normalizeBlank;
    }],
    execute: function() {
      NgElement = $__export("NgElement", (function() {
        var NgElement = function NgElement(domElement) {
          this.domElement = domElement;
        };
        return ($traceurRuntime.createClass)(NgElement, {getAttribute: function(name) {
            return normalizeBlank(DOM.getAttribute(this.domElement, name));
          }}, {});
      }()));
      Object.defineProperty(NgElement, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(NgElement.prototype.getAttribute, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/dom/element.map

//# sourceMappingURL=./element.map