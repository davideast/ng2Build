System.register("core/compiler/shadow_dom_emulation/content_tag", ["../../annotations/annotations", "./light_dom", "di/di", "facade/dom", "facade/collection", "core/dom/element"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/shadow_dom_emulation/content_tag";
  var Decorator,
      SourceLightDom,
      DestinationLightDom,
      LightDom,
      Inject,
      Element,
      Node,
      DOM,
      List,
      ListWrapper,
      NgElement,
      _scriptTemplate,
      Content;
  return {
    setters: [function(m) {
      Decorator = m.Decorator;
    }, function(m) {
      SourceLightDom = m.SourceLightDom;
      DestinationLightDom = m.DestinationLightDom;
      LightDom = m.LightDom;
    }, function(m) {
      Inject = m.Inject;
    }, function(m) {
      Element = m.Element;
      Node = m.Node;
      DOM = m.DOM;
    }, function(m) {
      List = m.List;
      ListWrapper = m.ListWrapper;
    }, function(m) {
      NgElement = m.NgElement;
    }],
    execute: function() {
      _scriptTemplate = DOM.createScriptTag('type', 'ng/content');
      Content = $__export("Content", (function() {
        var Content = function Content(destinationLightDom, contentEl) {
          this._destinationLightDom = destinationLightDom;
          this.select = contentEl.getAttribute('select');
          this._replaceContentElementWithScriptTags(contentEl.domElement);
        };
        return ($traceurRuntime.createClass)(Content, {
          insert: function(nodes) {
            DOM.insertAllBefore(this._endScript, nodes);
            this._removeNodesUntil(ListWrapper.isEmpty(nodes) ? this._endScript : nodes[0]);
          },
          _replaceContentElementWithScriptTags: function(contentEl) {
            this._beginScript = DOM.clone(_scriptTemplate);
            this._endScript = DOM.clone(_scriptTemplate);
            DOM.insertBefore(contentEl, this._beginScript);
            DOM.insertBefore(contentEl, this._endScript);
            DOM.removeChild(DOM.parentElement(contentEl), contentEl);
          },
          _removeNodesUntil: function(node) {
            var p = DOM.parentElement(this._beginScript);
            for (var next = DOM.nextSibling(this._beginScript); next !== node; next = DOM.nextSibling(this._beginScript)) {
              DOM.removeChild(p, next);
            }
          }
        }, {});
      }()));
      Object.defineProperty(Content, "annotations", {get: function() {
          return [new Decorator({selector: 'content'})];
        }});
      Object.defineProperty(Content, "parameters", {get: function() {
          return [[new Inject(DestinationLightDom)], [NgElement]];
        }});
      Object.defineProperty(Content.prototype.insert, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(Content.prototype._replaceContentElementWithScriptTags, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(Content.prototype._removeNodesUntil, "parameters", {get: function() {
          return [[Node]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/shadow_dom_emulation/content_tag.map

//# sourceMappingURL=./content_tag.map