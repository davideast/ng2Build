System.register("core/compiler/shadow_dom_emulation/light_dom", ["facade/dom", "facade/collection", "facade/lang", "../view", "../element_injector", "../viewport", "./content_tag"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/shadow_dom_emulation/light_dom";
  var Element,
      Node,
      DOM,
      List,
      ListWrapper,
      isBlank,
      isPresent,
      View,
      ElementInjector,
      ViewPort,
      Content,
      SourceLightDom,
      DestinationLightDom,
      LightDom;
  function redistributeNodes(contents, nodes) {
    for (var i = 0; i < contents.length; ++i) {
      var content = contents[i];
      var select = content.select;
      var matchSelector = (function(n) {
        return DOM.elementMatches(n, select);
      });
      if (isBlank(select)) {
        content.insert(nodes);
        ListWrapper.clear(nodes);
      } else {
        var matchingNodes = ListWrapper.filter(nodes, matchSelector);
        content.insert(matchingNodes);
        ListWrapper.removeAll(nodes, matchingNodes);
      }
    }
  }
  return {
    setters: [function(m) {
      Element = m.Element;
      Node = m.Node;
      DOM = m.DOM;
    }, function(m) {
      List = m.List;
      ListWrapper = m.ListWrapper;
    }, function(m) {
      isBlank = m.isBlank;
      isPresent = m.isPresent;
    }, function(m) {
      View = m.View;
    }, function(m) {
      ElementInjector = m.ElementInjector;
    }, function(m) {
      ViewPort = m.ViewPort;
    }, function(m) {
      Content = m.Content;
    }],
    execute: function() {
      SourceLightDom = $__export("SourceLightDom", (function() {
        var SourceLightDom = function SourceLightDom() {};
        return ($traceurRuntime.createClass)(SourceLightDom, {}, {});
      }()));
      DestinationLightDom = $__export("DestinationLightDom", (function() {
        var DestinationLightDom = function DestinationLightDom() {};
        return ($traceurRuntime.createClass)(DestinationLightDom, {}, {});
      }()));
      LightDom = $__export("LightDom", (function() {
        var LightDom = function LightDom(lightDomView, shadowDomView, element) {
          this.lightDomView = lightDomView;
          this.shadowDomView = shadowDomView;
          this.roots = DOM.childNodesAsList(element);
          DOM.clearNodes(element);
        };
        return ($traceurRuntime.createClass)(LightDom, {
          redistribute: function() {
            redistributeNodes(this.contentTags(), this.expandedDomNodes());
          },
          contentTags: function() {
            return this._collectAllContentTags(this.shadowDomView, []);
          },
          _collectAllContentTags: function(item, acc) {
            var $__0 = this;
            ListWrapper.forEach(item.elementInjectors, (function(ei) {
              if (ei.hasDirective(Content)) {
                ListWrapper.push(acc, ei.get(Content));
              } else if (ei.hasPreBuiltObject(ViewPort)) {
                var vp = ei.get(ViewPort);
                ListWrapper.forEach(vp.contentTagContainers(), (function(c) {
                  $__0._collectAllContentTags(c, acc);
                }));
              }
            }));
            return acc;
          },
          expandedDomNodes: function() {
            var $__0 = this;
            var res = [];
            ListWrapper.forEach(this.roots, (function(root) {
              var viewPort = $__0.lightDomView.getViewPortByTemplateElement(root);
              if (isPresent(viewPort)) {
                res = ListWrapper.concat(res, viewPort.nodes());
              } else {
                ListWrapper.push(res, root);
              }
            }));
            return res;
          }
        }, {});
      }()));
      Object.defineProperty(LightDom, "parameters", {get: function() {
          return [[View], [View], [Element]];
        }});
      Object.defineProperty(LightDom.prototype._collectAllContentTags, "parameters", {get: function() {
          return [[], [List]];
        }});
      Object.defineProperty(redistributeNodes, "parameters", {get: function() {
          return [[List], [List]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/shadow_dom_emulation/light_dom.map

//# sourceMappingURL=./light_dom.map