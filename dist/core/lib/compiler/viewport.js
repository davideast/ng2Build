System.register("core/compiler/viewport", ["./view", "facade/dom", "facade/collection", "facade/lang", "di/di", "core/compiler/element_injector"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/viewport";
  var View,
      ProtoView,
      DOM,
      Node,
      Element,
      ListWrapper,
      MapWrapper,
      List,
      BaseException,
      Injector,
      ElementInjector,
      isPresent,
      isBlank,
      ViewPort;
  return {
    setters: [function(m) {
      View = m.View;
      ProtoView = m.ProtoView;
    }, function(m) {
      DOM = m.DOM;
      Node = m.Node;
      Element = m.Element;
    }, function(m) {
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
      List = m.List;
    }, function(m) {
      BaseException = m.BaseException;
      isPresent = m.isPresent;
      isBlank = m.isBlank;
    }, function(m) {
      Injector = m.Injector;
    }, function(m) {
      ElementInjector = m.ElementInjector;
    }],
    execute: function() {
      ViewPort = $__export("ViewPort", (function() {
        var ViewPort = function ViewPort(parentView, templateElement, defaultProtoView, elementInjector) {
          var lightDom = arguments[4] !== (void 0) ? arguments[4] : null;
          this.parentView = parentView;
          this.templateElement = templateElement;
          this.defaultProtoView = defaultProtoView;
          this.elementInjector = elementInjector;
          this._lightDom = lightDom;
          this._views = [];
          this.appInjector = null;
          this.hostElementInjector = null;
        };
        return ($traceurRuntime.createClass)(ViewPort, {
          hydrate: function(appInjector, hostElementInjector) {
            this.appInjector = appInjector;
            this.hostElementInjector = hostElementInjector;
          },
          dehydrate: function() {
            this.appInjector = null;
            this.hostElementInjector = null;
            this.clear();
          },
          clear: function() {
            for (var i = this._views.length - 1; i >= 0; i--) {
              this.remove(i);
            }
          },
          get: function(index) {
            return this._views[index];
          },
          get length() {
            return this._views.length;
          },
          _siblingToInsertAfter: function(index) {
            if (index == 0)
              return this.templateElement;
            return ListWrapper.last(this._views[index - 1].nodes);
          },
          hydrated: function() {
            return isPresent(this.appInjector);
          },
          create: function() {
            var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
            if (!this.hydrated())
              throw new BaseException('Cannot create views on a dehydrated view port');
            var newView = this.defaultProtoView.instantiate(this.hostElementInjector);
            newView.hydrate(this.appInjector, this.hostElementInjector, this.parentView.context);
            return this.insert(newView, atIndex);
          },
          insert: function(view) {
            var atIndex = arguments[1] !== (void 0) ? arguments[1] : -1;
            if (atIndex == -1)
              atIndex = this._views.length;
            ListWrapper.insert(this._views, atIndex, view);
            if (isBlank(this._lightDom)) {
              ViewPort.moveViewNodesAfterSibling(this._siblingToInsertAfter(atIndex), view);
            } else {
              this._lightDom.redistribute();
            }
            this.parentView.recordRange.addRange(view.recordRange);
            this._linkElementInjectors(view);
            return view;
          },
          remove: function() {
            var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
            if (atIndex == -1)
              atIndex = this._views.length - 1;
            var removedView = this.get(atIndex);
            ListWrapper.removeAt(this._views, atIndex);
            if (isBlank(this._lightDom)) {
              ViewPort.removeViewNodesFromParent(this.templateElement.parentNode, removedView);
            } else {
              this._lightDom.redistribute();
            }
            removedView.recordRange.remove();
            this._unlinkElementInjectors(removedView);
            return removedView;
          },
          contentTagContainers: function() {
            return this._views;
          },
          nodes: function() {
            var r = [];
            for (var i = 0; i < this._views.length; ++i) {
              r = ListWrapper.concat(r, this._views[i].nodes);
            }
            return r;
          },
          _linkElementInjectors: function(view) {
            for (var i = 0; i < view.rootElementInjectors.length; ++i) {
              view.rootElementInjectors[i].parent = this.elementInjector;
            }
          },
          _unlinkElementInjectors: function(view) {
            for (var i = 0; i < view.rootElementInjectors.length; ++i) {
              view.rootElementInjectors[i].parent = null;
            }
          }
        }, {
          moveViewNodesAfterSibling: function(sibling, view) {
            for (var i = view.nodes.length - 1; i >= 0; --i) {
              DOM.insertAfter(sibling, view.nodes[i]);
            }
          },
          removeViewNodesFromParent: function(parent, view) {
            for (var i = view.nodes.length - 1; i >= 0; --i) {
              DOM.removeChild(parent, view.nodes[i]);
            }
          }
        });
      }()));
      Object.defineProperty(ViewPort, "parameters", {get: function() {
          return [[View], [Element], [ProtoView], [ElementInjector], []];
        }});
      Object.defineProperty(ViewPort.prototype.hydrate, "parameters", {get: function() {
          return [[Injector], [ElementInjector]];
        }});
      Object.defineProperty(ViewPort.prototype.get, "parameters", {get: function() {
          return [[$traceurRuntime.type.number]];
        }});
      Object.defineProperty(ViewPort.prototype._siblingToInsertAfter, "parameters", {get: function() {
          return [[$traceurRuntime.type.number]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/viewport.map

//# sourceMappingURL=./viewport.map