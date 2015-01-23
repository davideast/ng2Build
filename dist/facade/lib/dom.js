System.register("facade/dom", ["facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "facade/dom";
  var window,
      DocumentFragment,
      Node,
      NodeList,
      Text,
      Element,
      TemplateElement,
      document,
      location,
      gc,
      List,
      MapWrapper,
      ListWrapper,
      DOM;
  return {
    setters: [function(m) {
      List = m.List;
      MapWrapper = m.MapWrapper;
      ListWrapper = m.ListWrapper;
    }],
    execute: function() {
      window = $__export("window", frames.window);
      DocumentFragment = $__export("DocumentFragment", window.DocumentFragment);
      Node = $__export("Node", window.Node);
      NodeList = $__export("NodeList", window.NodeList);
      Text = $__export("Text", window.Text);
      Element = $__export("Element", window.HTMLElement);
      TemplateElement = $__export("TemplateElement", window.HTMLTemplateElement);
      document = $__export("document", window.document);
      location = $__export("location", window.location);
      gc = $__export("gc", window.gc ? (function() {
        return window.gc();
      }) : (function() {
        return null;
      }));
      DOM = $__export("DOM", (function() {
        var DOM = function DOM() {};
        return ($traceurRuntime.createClass)(DOM, {}, {
          query: function(selector) {
            return document.querySelector(selector);
          },
          querySelector: function(el, selector) {
            return el.querySelector(selector);
          },
          querySelectorAll: function(el, selector) {
            return el.querySelectorAll(selector);
          },
          on: function(el, evt, listener) {
            el.addEventListener(evt, listener, false);
          },
          dispatchEvent: function(el, evt) {
            el.dispatchEvent(evt);
          },
          createMouseEvent: function(eventType) {
            var evt = new MouseEvent(eventType);
            evt.initEvent(eventType, true, true);
            return evt;
          },
          getInnerHTML: function(el) {
            return el.innerHTML;
          },
          getOuterHTML: function(el) {
            return el.outerHTML;
          },
          firstChild: function(el) {
            return el.firstChild;
          },
          nextSibling: function(el) {
            return el.nextSibling;
          },
          parentElement: function(el) {
            return el.parentElement;
          },
          childNodes: function(el) {
            return el.childNodes;
          },
          childNodesAsList: function(el) {
            var childNodes = el.childNodes;
            var res = ListWrapper.createFixedSize(childNodes.length);
            for (var i = 0; i < childNodes.length; i++) {
              res[i] = childNodes[i];
            }
            return res;
          },
          clearNodes: function(el) {
            el.innerHTML = "";
          },
          appendChild: function(el, node) {
            el.appendChild(node);
          },
          removeChild: function(el, node) {
            el.removeChild(node);
          },
          insertBefore: function(el, node) {
            el.parentNode.insertBefore(node, el);
          },
          insertAllBefore: function(el, nodes) {
            ListWrapper.forEach(nodes, (function(n) {
              el.parentNode.insertBefore(n, el);
            }));
          },
          insertAfter: function(el, node) {
            el.parentNode.insertBefore(node, el.nextSibling);
          },
          setInnerHTML: function(el, value) {
            el.innerHTML = value;
          },
          getText: function(el) {
            return el.textContent;
          },
          setText: function(text, value) {
            text.nodeValue = value;
          },
          createTemplate: function(html) {
            var t = document.createElement('template');
            t.innerHTML = html;
            return t;
          },
          createElement: function(tagName) {
            var doc = arguments[1] !== (void 0) ? arguments[1] : document;
            return doc.createElement(tagName);
          },
          createScriptTag: function(attrName, attrValue) {
            var doc = arguments[2] !== (void 0) ? arguments[2] : document;
            var el = doc.createElement("SCRIPT");
            el.setAttribute(attrName, attrValue);
            return el;
          },
          clone: function(node) {
            return node.cloneNode(true);
          },
          hasProperty: function(element, name) {
            return name in element;
          },
          getElementsByClassName: function(element, name) {
            return element.getElementsByClassName(name);
          },
          getElementsByTagName: function(element, name) {
            return element.getElementsByTagName(name);
          },
          classList: function(element) {
            return Array.prototype.slice.call(element.classList, 0);
          },
          addClass: function(element, classname) {
            element.classList.add(classname);
          },
          hasClass: function(element, classname) {
            return element.classList.contains(classname);
          },
          tagName: function(element) {
            return element.tagName;
          },
          attributeMap: function(element) {
            var res = MapWrapper.create();
            var elAttrs = element.attributes;
            for (var i = 0; i < elAttrs.length; i++) {
              var attrib = elAttrs[i];
              MapWrapper.set(res, attrib.name, attrib.value);
            }
            return res;
          },
          getAttribute: function(element, attribute) {
            return element.getAttribute(attribute);
          },
          templateAwareRoot: function(el) {
            return el instanceof TemplateElement ? el.content : el;
          },
          createHtmlDocument: function() {
            return document.implementation.createHTMLDocument();
          },
          defaultDoc: function() {
            return document;
          },
          elementMatches: function(n, selector) {
            return n instanceof Element && n.matches(selector);
          }
        });
      }()));
      Object.defineProperty(DOM.querySelector, "parameters", {get: function() {
          return [[], [$traceurRuntime.type.string]];
        }});
      Object.defineProperty(DOM.querySelectorAll, "parameters", {get: function() {
          return [[], [$traceurRuntime.type.string]];
        }});
      Object.defineProperty(DOM.getText, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(DOM.setText, "parameters", {get: function() {
          return [[Text], [$traceurRuntime.type.string]];
        }});
      Object.defineProperty(DOM.createScriptTag, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], [$traceurRuntime.type.string], []];
        }});
      Object.defineProperty(DOM.clone, "parameters", {get: function() {
          return [[Node]];
        }});
      Object.defineProperty(DOM.hasProperty, "parameters", {get: function() {
          return [[Element], [$traceurRuntime.type.string]];
        }});
      Object.defineProperty(DOM.getElementsByClassName, "parameters", {get: function() {
          return [[Element], [$traceurRuntime.type.string]];
        }});
      Object.defineProperty(DOM.getElementsByTagName, "parameters", {get: function() {
          return [[Element], [$traceurRuntime.type.string]];
        }});
      Object.defineProperty(DOM.classList, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(DOM.addClass, "parameters", {get: function() {
          return [[Element], [$traceurRuntime.type.string]];
        }});
      Object.defineProperty(DOM.hasClass, "parameters", {get: function() {
          return [[Element], [$traceurRuntime.type.string]];
        }});
      Object.defineProperty(DOM.tagName, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(DOM.attributeMap, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(DOM.getAttribute, "parameters", {get: function() {
          return [[Element], [$traceurRuntime.type.string]];
        }});
      Object.defineProperty(DOM.templateAwareRoot, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(DOM.elementMatches, "parameters", {get: function() {
          return [[], [$traceurRuntime.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/facade/src/dom.map

//# sourceMappingURL=./dom.map