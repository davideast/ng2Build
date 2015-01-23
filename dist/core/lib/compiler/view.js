System.register("core/compiler/view", ["facade/dom", "facade/collection", "change_detection/change_detection", "./element_injector", "./element_binder", "./directive_metadata", "reflection/types", "facade/lang", "di/di", "core/dom/element", "./viewport", "./interfaces", "./shadow_dom_emulation/content_tag", "./shadow_dom_emulation/light_dom"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/view";
  var DOM,
      Element,
      Node,
      Text,
      DocumentFragment,
      TemplateElement,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      List,
      ProtoRecordRange,
      RecordRange,
      Record,
      ChangeDispatcher,
      AST,
      ContextWithVariableBindings,
      ProtoElementInjector,
      ElementInjector,
      PreBuiltObjects,
      ElementBinder,
      DirectiveMetadata,
      SetterFn,
      FIELD,
      IMPLEMENTS,
      int,
      isPresent,
      isBlank,
      BaseException,
      Injector,
      NgElement,
      ViewPort,
      OnChange,
      Content,
      LightDom,
      DestinationLightDom,
      NG_BINDING_CLASS,
      NG_BINDING_CLASS_SELECTOR,
      NO_FORMATTERS,
      View,
      ProtoView,
      ElementPropertyMemento,
      DirectivePropertyMemento,
      _groups,
      DirectivePropertyGroupMemento,
      PropertyUpdate;
  return {
    setters: [function(m) {
      DOM = m.DOM;
      Element = m.Element;
      Node = m.Node;
      Text = m.Text;
      DocumentFragment = m.DocumentFragment;
      TemplateElement = m.TemplateElement;
    }, function(m) {
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
      StringMapWrapper = m.StringMapWrapper;
      List = m.List;
    }, function(m) {
      ProtoRecordRange = m.ProtoRecordRange;
      RecordRange = m.RecordRange;
      Record = m.Record;
      ChangeDispatcher = m.ChangeDispatcher;
      AST = m.AST;
      ContextWithVariableBindings = m.ContextWithVariableBindings;
    }, function(m) {
      ProtoElementInjector = m.ProtoElementInjector;
      ElementInjector = m.ElementInjector;
      PreBuiltObjects = m.PreBuiltObjects;
    }, function(m) {
      ElementBinder = m.ElementBinder;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }, function(m) {
      SetterFn = m.SetterFn;
    }, function(m) {
      FIELD = m.FIELD;
      IMPLEMENTS = m.IMPLEMENTS;
      int = m.int;
      isPresent = m.isPresent;
      isBlank = m.isBlank;
      BaseException = m.BaseException;
    }, function(m) {
      Injector = m.Injector;
    }, function(m) {
      NgElement = m.NgElement;
    }, function(m) {
      ViewPort = m.ViewPort;
    }, function(m) {
      OnChange = m.OnChange;
    }, function(m) {
      Content = m.Content;
    }, function(m) {
      LightDom = m.LightDom;
      DestinationLightDom = m.DestinationLightDom;
    }],
    execute: function() {
      NG_BINDING_CLASS = 'ng-binding';
      NG_BINDING_CLASS_SELECTOR = '.ng-binding';
      NO_FORMATTERS = MapWrapper.create();
      View = $__export("View", (function() {
        var View = function View(proto, nodes, protoRecordRange, protoContextLocals) {
          this.proto = proto;
          this.nodes = nodes;
          this.recordRange = protoRecordRange.instantiate(this, NO_FORMATTERS);
          this.elementInjectors = null;
          this.rootElementInjectors = null;
          this.textNodes = null;
          this.bindElements = null;
          this.componentChildViews = null;
          this.viewPorts = null;
          this.preBuiltObjects = null;
          this.context = null;
          this.contextWithLocals = (MapWrapper.size(protoContextLocals) > 0) ? new ContextWithVariableBindings(null, MapWrapper.clone(protoContextLocals)) : null;
        };
        return ($traceurRuntime.createClass)(View, {
          init: function(elementInjectors, rootElementInjectors, textNodes, bindElements, viewPorts, preBuiltObjects, componentChildViews) {
            this.elementInjectors = elementInjectors;
            this.rootElementInjectors = rootElementInjectors;
            this.textNodes = textNodes;
            this.bindElements = bindElements;
            this.viewPorts = viewPorts;
            this.preBuiltObjects = preBuiltObjects;
            this.componentChildViews = componentChildViews;
          },
          setLocal: function(contextName, value) {
            if (!this.hydrated())
              throw new BaseException('Cannot set locals on dehydrated view.');
            if (!MapWrapper.contains(this.proto.variableBindings, contextName)) {
              throw new BaseException(("Local binding " + contextName + " not defined in the view template."));
            }
            var templateName = MapWrapper.get(this.proto.variableBindings, contextName);
            this.context.set(templateName, value);
          },
          hydrated: function() {
            return isPresent(this.context);
          },
          _hydrateContext: function(newContext) {
            if (isPresent(this.contextWithLocals)) {
              this.contextWithLocals.parent = newContext;
              this.context = this.contextWithLocals;
            } else {
              this.context = newContext;
            }
            this.recordRange.setContext(this.context);
          },
          _dehydrateContext: function() {
            if (isPresent(this.contextWithLocals)) {
              this.contextWithLocals.clearValues();
            }
            this.context = null;
          },
          hydrate: function(appInjector, hostElementInjector, context) {
            if (this.hydrated())
              throw new BaseException('The view is already hydrated.');
            this._hydrateContext(context);
            for (var i = 0; i < this.viewPorts.length; i++) {
              this.viewPorts[i].hydrate(appInjector, hostElementInjector);
            }
            var binders = this.proto.elementBinders;
            var componentChildViewIndex = 0;
            for (var i = 0; i < binders.length; ++i) {
              var componentDirective = binders[i].componentDirective;
              var shadowDomAppInjector = null;
              if (isPresent(componentDirective)) {
                var services = componentDirective.annotation.componentServices;
                if (isPresent(services))
                  shadowDomAppInjector = appInjector.createChild(services);
                else {
                  shadowDomAppInjector = appInjector;
                }
              } else {
                shadowDomAppInjector = null;
              }
              var elementInjector = this.elementInjectors[i];
              if (isPresent(elementInjector)) {
                elementInjector.instantiateDirectives(appInjector, shadowDomAppInjector, this.preBuiltObjects[i]);
              }
              if (isPresent(componentDirective)) {
                this.componentChildViews[componentChildViewIndex++].hydrate(shadowDomAppInjector, elementInjector, elementInjector.getComponent());
                var lightDom = this.preBuiltObjects[i].lightDom;
                if (isPresent(lightDom))
                  lightDom.redistribute();
              }
            }
          },
          dehydrate: function() {
            for (var i = 0; i < this.componentChildViews.length; i++) {
              this.componentChildViews[i].dehydrate();
            }
            for (var i = 0; i < this.elementInjectors.length; i++) {
              this.elementInjectors[i].clearDirectives();
            }
            if (isPresent(this.viewPorts)) {
              for (var i = 0; i < this.viewPorts.length; i++) {
                this.viewPorts[i].dehydrate();
              }
            }
            this._dehydrateContext();
          },
          onRecordChange: function(groupMemento, records) {
            this._invokeMementoForRecords(records);
            if (groupMemento instanceof DirectivePropertyGroupMemento) {
              this._notifyDirectiveAboutChanges(groupMemento, records);
            }
          },
          getViewPortByTemplateElement: function(node) {
            if (!(node instanceof Element))
              return null;
            for (var i = 0; i < this.viewPorts.length; ++i) {
              if (this.viewPorts[i].templateElement === node)
                return this.viewPorts[i];
            }
            return null;
          },
          _invokeMementoForRecords: function(records) {
            for (var i = 0; i < records.length; ++i) {
              this._invokeMementoFor(records[i]);
            }
          },
          _notifyDirectiveAboutChanges: function(groupMemento, records) {
            var dir = groupMemento.directive(this.elementInjectors);
            if (dir instanceof OnChange) {
              dir.onChange(this._collectChanges(records));
            }
          },
          _invokeMementoFor: function(record) {
            var memento = record.expressionMemento();
            if (memento instanceof DirectivePropertyMemento) {
              var directiveMemento = memento;
              directiveMemento.invoke(record, this.elementInjectors);
            } else if (memento instanceof ElementPropertyMemento) {
              var elementMemento = memento;
              elementMemento.invoke(record, this.bindElements);
            } else {
              var textNodeIndex = memento;
              DOM.setText(this.textNodes[textNodeIndex], record.currentValue);
            }
          },
          _collectChanges: function(records) {
            var changes = StringMapWrapper.create();
            for (var i = 0; i < records.length; ++i) {
              var record = records[i];
              var propertyUpdate = new PropertyUpdate(record.currentValue, record.previousValue);
              StringMapWrapper.set(changes, record.expressionMemento()._setterName, propertyUpdate);
            }
            return changes;
          }
        }, {});
      }()));
      Object.defineProperty(View, "annotations", {get: function() {
          return [new IMPLEMENTS(ChangeDispatcher)];
        }});
      Object.defineProperty(View, "parameters", {get: function() {
          return [[ProtoView], [List], [ProtoRecordRange], [Map]];
        }});
      Object.defineProperty(View.prototype.init, "parameters", {get: function() {
          return [[List], [List], [List], [List], [List], [List], [List]];
        }});
      Object.defineProperty(View.prototype.setLocal, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], []];
        }});
      Object.defineProperty(View.prototype.hydrate, "parameters", {get: function() {
          return [[Injector], [ElementInjector], [Object]];
        }});
      Object.defineProperty(View.prototype.onRecordChange, "parameters", {get: function() {
          return [[], [List]];
        }});
      Object.defineProperty(View.prototype._invokeMementoForRecords, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(View.prototype._notifyDirectiveAboutChanges, "parameters", {get: function() {
          return [[], [List]];
        }});
      Object.defineProperty(View.prototype._invokeMementoFor, "parameters", {get: function() {
          return [[Record]];
        }});
      Object.defineProperty(View.prototype._collectChanges, "parameters", {get: function() {
          return [[List]];
        }});
      ProtoView = $__export("ProtoView", (function() {
        var ProtoView = function ProtoView(template, protoRecordRange) {
          this.element = template;
          this.elementBinders = [];
          this.variableBindings = MapWrapper.create();
          this.protoContextLocals = MapWrapper.create();
          this.protoRecordRange = protoRecordRange;
          this.textNodesWithBindingCount = 0;
          this.elementsWithBindingCount = 0;
          this.instantiateInPlace = false;
          this.rootBindingOffset = (isPresent(this.element) && DOM.hasClass(this.element, NG_BINDING_CLASS)) ? 1 : 0;
          this.isTemplateElement = this.element instanceof TemplateElement;
        };
        return ($traceurRuntime.createClass)(ProtoView, {
          instantiate: function(hostElementInjector) {
            var rootElementClone = this.instantiateInPlace ? this.element : DOM.clone(this.element);
            var elementsWithBindingsDynamic;
            if (this.isTemplateElement) {
              elementsWithBindingsDynamic = DOM.querySelectorAll(rootElementClone.content, NG_BINDING_CLASS_SELECTOR);
            } else {
              elementsWithBindingsDynamic = DOM.getElementsByClassName(rootElementClone, NG_BINDING_CLASS);
            }
            var elementsWithBindings = ListWrapper.createFixedSize(elementsWithBindingsDynamic.length);
            for (var i = 0; i < elementsWithBindingsDynamic.length; ++i) {
              elementsWithBindings[i] = elementsWithBindingsDynamic[i];
            }
            var viewNodes;
            if (this.isTemplateElement) {
              var childNode = DOM.firstChild(rootElementClone.content);
              viewNodes = [];
              while (childNode != null) {
                ListWrapper.push(viewNodes, childNode);
                childNode = DOM.nextSibling(childNode);
              }
            } else {
              viewNodes = [rootElementClone];
            }
            var view = new View(this, viewNodes, this.protoRecordRange, this.protoContextLocals);
            var binders = this.elementBinders;
            var elementInjectors = ListWrapper.createFixedSize(binders.length);
            var rootElementInjectors = [];
            var textNodes = [];
            var elementsWithPropertyBindings = [];
            var preBuiltObjects = ListWrapper.createFixedSize(binders.length);
            var viewPorts = [];
            var componentChildViews = [];
            for (var i = 0; i < binders.length; i++) {
              var binder = binders[i];
              var element = void 0;
              if (i === 0 && this.rootBindingOffset === 1) {
                element = rootElementClone;
              } else {
                element = elementsWithBindings[i - this.rootBindingOffset];
              }
              var elementInjector = null;
              var protoElementInjector = binder.protoElementInjector;
              if (isPresent(protoElementInjector)) {
                if (isPresent(protoElementInjector.parent)) {
                  var parentElementInjector = elementInjectors[protoElementInjector.parent.index];
                  elementInjector = protoElementInjector.instantiate(parentElementInjector, null);
                } else {
                  elementInjector = protoElementInjector.instantiate(null, hostElementInjector);
                  ListWrapper.push(rootElementInjectors, elementInjector);
                }
              }
              elementInjectors[i] = elementInjector;
              if (binder.hasElementPropertyBindings) {
                ListWrapper.push(elementsWithPropertyBindings, element);
              }
              var textNodeIndices = binder.textNodeIndices;
              if (isPresent(textNodeIndices)) {
                var childNode = DOM.firstChild(DOM.templateAwareRoot(element));
                for (var j = 0,
                    k = 0; j < textNodeIndices.length; j++) {
                  for (var index = textNodeIndices[j]; k < index; k++) {
                    childNode = DOM.nextSibling(childNode);
                  }
                  ListWrapper.push(textNodes, childNode);
                }
              }
              var lightDom = null;
              if (isPresent(binder.componentDirective)) {
                var childView = binder.nestedProtoView.instantiate(elementInjector);
                view.recordRange.addRange(childView.recordRange);
                lightDom = binder.componentDirective.shadowDomStrategy.constructLightDom(view, childView, element);
                binder.componentDirective.shadowDomStrategy.attachTemplate(element, childView);
                ListWrapper.push(componentChildViews, childView);
              }
              var viewPort = null;
              if (isPresent(binder.templateDirective)) {
                var destLightDom = this._parentElementLightDom(protoElementInjector, preBuiltObjects);
                viewPort = new ViewPort(view, element, binder.nestedProtoView, elementInjector, destLightDom);
                ListWrapper.push(viewPorts, viewPort);
              }
              if (isPresent(elementInjector)) {
                preBuiltObjects[i] = new PreBuiltObjects(view, new NgElement(element), viewPort, lightDom);
              }
              if (isPresent(binder.events)) {
                MapWrapper.forEach(binder.events, (function(expr, eventName) {
                  DOM.on(element, eventName, (function(event) {
                    if (event.target === element) {
                      expr.eval(view.context);
                    }
                  }));
                }));
              }
            }
            view.init(elementInjectors, rootElementInjectors, textNodes, elementsWithPropertyBindings, viewPorts, preBuiltObjects, componentChildViews);
            return view;
          },
          _parentElementLightDom: function(protoElementInjector, preBuiltObjects) {
            var p = protoElementInjector.parent;
            return isPresent(p) ? preBuiltObjects[p.index].lightDom : null;
          },
          bindVariable: function(contextName, templateName) {
            MapWrapper.set(this.variableBindings, contextName, templateName);
            MapWrapper.set(this.protoContextLocals, templateName, null);
          },
          bindElement: function(protoElementInjector) {
            var componentDirective = arguments[1] !== (void 0) ? arguments[1] : null;
            var templateDirective = arguments[2] !== (void 0) ? arguments[2] : null;
            var elBinder = new ElementBinder(protoElementInjector, componentDirective, templateDirective);
            ListWrapper.push(this.elementBinders, elBinder);
            return elBinder;
          },
          bindTextNode: function(indexInParent, expression) {
            var elBinder = this.elementBinders[this.elementBinders.length - 1];
            if (isBlank(elBinder.textNodeIndices)) {
              elBinder.textNodeIndices = ListWrapper.create();
            }
            ListWrapper.push(elBinder.textNodeIndices, indexInParent);
            var memento = this.textNodesWithBindingCount++;
            this.protoRecordRange.addRecordsFromAST(expression, memento, memento);
          },
          bindElementProperty: function(expression, setterName, setter) {
            var elBinder = this.elementBinders[this.elementBinders.length - 1];
            if (!elBinder.hasElementPropertyBindings) {
              elBinder.hasElementPropertyBindings = true;
              this.elementsWithBindingCount++;
            }
            var memento = new ElementPropertyMemento(this.elementsWithBindingCount - 1, setterName, setter);
            this.protoRecordRange.addRecordsFromAST(expression, memento, memento);
          },
          bindEvent: function(eventName, expression) {
            var elBinder = this.elementBinders[this.elementBinders.length - 1];
            if (isBlank(elBinder.events)) {
              elBinder.events = MapWrapper.create();
            }
            MapWrapper.set(elBinder.events, eventName, expression);
          },
          bindDirectiveProperty: function(directiveIndex, expression, setterName, setter, isContentWatch) {
            var expMemento = new DirectivePropertyMemento(this.elementBinders.length - 1, directiveIndex, setterName, setter);
            var groupMemento = DirectivePropertyGroupMemento.get(expMemento);
            this.protoRecordRange.addRecordsFromAST(expression, expMemento, groupMemento, isContentWatch);
          }
        }, {createRootProtoView: function(protoView, insertionElement, rootComponentAnnotatedType) {
            DOM.addClass(insertionElement, 'ng-binding');
            var rootProtoView = new ProtoView(insertionElement, new ProtoRecordRange());
            rootProtoView.instantiateInPlace = true;
            var binder = rootProtoView.bindElement(new ProtoElementInjector(null, 0, [rootComponentAnnotatedType.type], true));
            binder.componentDirective = rootComponentAnnotatedType;
            binder.nestedProtoView = protoView;
            return rootProtoView;
          }});
      }()));
      Object.defineProperty(ProtoView, "parameters", {get: function() {
          return [[Element], [ProtoRecordRange]];
        }});
      Object.defineProperty(ProtoView.prototype.instantiate, "parameters", {get: function() {
          return [[ElementInjector]];
        }});
      Object.defineProperty(ProtoView.prototype._parentElementLightDom, "parameters", {get: function() {
          return [[ProtoElementInjector], [List]];
        }});
      Object.defineProperty(ProtoView.prototype.bindVariable, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], [$traceurRuntime.type.string]];
        }});
      Object.defineProperty(ProtoView.prototype.bindElement, "parameters", {get: function() {
          return [[ProtoElementInjector], [DirectiveMetadata], [DirectiveMetadata]];
        }});
      Object.defineProperty(ProtoView.prototype.bindTextNode, "parameters", {get: function() {
          return [[int], [AST]];
        }});
      Object.defineProperty(ProtoView.prototype.bindElementProperty, "parameters", {get: function() {
          return [[AST], [$traceurRuntime.type.string], [SetterFn]];
        }});
      Object.defineProperty(ProtoView.prototype.bindEvent, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], [AST]];
        }});
      Object.defineProperty(ProtoView.prototype.bindDirectiveProperty, "parameters", {get: function() {
          return [[$traceurRuntime.type.number], [AST], [$traceurRuntime.type.string], [SetterFn], [$traceurRuntime.type.boolean]];
        }});
      Object.defineProperty(ProtoView.createRootProtoView, "parameters", {get: function() {
          return [[ProtoView], [], [DirectiveMetadata]];
        }});
      ElementPropertyMemento = $__export("ElementPropertyMemento", (function() {
        var ElementPropertyMemento = function ElementPropertyMemento(elementIndex, setterName, setter) {
          this._elementIndex = elementIndex;
          this._setterName = setterName;
          this._setter = setter;
        };
        return ($traceurRuntime.createClass)(ElementPropertyMemento, {invoke: function(record, bindElements) {
            var element = bindElements[this._elementIndex];
            this._setter(element, record.currentValue);
          }}, {});
      }()));
      Object.defineProperty(ElementPropertyMemento, "parameters", {get: function() {
          return [[int], [$traceurRuntime.type.string], [SetterFn]];
        }});
      Object.defineProperty(ElementPropertyMemento.prototype.invoke, "parameters", {get: function() {
          return [[Record], [List]];
        }});
      DirectivePropertyMemento = $__export("DirectivePropertyMemento", (function() {
        var DirectivePropertyMemento = function DirectivePropertyMemento(elementInjectorIndex, directiveIndex, setterName, setter) {
          this._elementInjectorIndex = elementInjectorIndex;
          this._directiveIndex = directiveIndex;
          this._setterName = setterName;
          this._setter = setter;
        };
        return ($traceurRuntime.createClass)(DirectivePropertyMemento, {invoke: function(record, elementInjectors) {
            var elementInjector = elementInjectors[this._elementInjectorIndex];
            var directive = elementInjector.getAtIndex(this._directiveIndex);
            this._setter(directive, record.currentValue);
          }}, {});
      }()));
      Object.defineProperty(DirectivePropertyMemento, "parameters", {get: function() {
          return [[$traceurRuntime.type.number], [$traceurRuntime.type.number], [$traceurRuntime.type.string], [SetterFn]];
        }});
      Object.defineProperty(DirectivePropertyMemento.prototype.invoke, "parameters", {get: function() {
          return [[Record], [List]];
        }});
      _groups = MapWrapper.create();
      DirectivePropertyGroupMemento = (function() {
        var DirectivePropertyGroupMemento = function DirectivePropertyGroupMemento(elementInjectorIndex, directiveIndex) {
          this._elementInjectorIndex = elementInjectorIndex;
          this._directiveIndex = directiveIndex;
        };
        return ($traceurRuntime.createClass)(DirectivePropertyGroupMemento, {directive: function(elementInjectors) {
            var elementInjector = elementInjectors[this._elementInjectorIndex];
            return elementInjector.getAtIndex(this._directiveIndex);
          }}, {get: function(memento) {
            var elementInjectorIndex = memento._elementInjectorIndex;
            var directiveIndex = memento._directiveIndex;
            var id = elementInjectorIndex * 100 + directiveIndex;
            if (!MapWrapper.contains(_groups, id)) {
              MapWrapper.set(_groups, id, new DirectivePropertyGroupMemento(elementInjectorIndex, directiveIndex));
            }
            return MapWrapper.get(_groups, id);
          }});
      }());
      Object.defineProperty(DirectivePropertyGroupMemento, "parameters", {get: function() {
          return [[$traceurRuntime.type.number], [$traceurRuntime.type.number]];
        }});
      Object.defineProperty(DirectivePropertyGroupMemento.get, "parameters", {get: function() {
          return [[DirectivePropertyMemento]];
        }});
      Object.defineProperty(DirectivePropertyGroupMemento.prototype.directive, "parameters", {get: function() {
          return [[List]];
        }});
      PropertyUpdate = (function() {
        var PropertyUpdate = function PropertyUpdate(currentValue, previousValue) {
          this.currentValue = currentValue;
          this.previousValue = previousValue;
        };
        return ($traceurRuntime.createClass)(PropertyUpdate, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/view.map

//# sourceMappingURL=./view.map