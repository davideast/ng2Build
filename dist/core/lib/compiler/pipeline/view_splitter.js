System.register("core/compiler/pipeline/view_splitter", ["facade/lang", "facade/dom", "facade/collection", "change_detection/change_detection", "./compile_step", "./compile_element", "./compile_control"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/pipeline/view_splitter";
  var isBlank,
      isPresent,
      DOM,
      TemplateElement,
      MapWrapper,
      ListWrapper,
      Parser,
      CompileStep,
      CompileElement,
      CompileControl,
      ViewSplitter;
  return {
    setters: [function(m) {
      isBlank = m.isBlank;
      isPresent = m.isPresent;
    }, function(m) {
      DOM = m.DOM;
      TemplateElement = m.TemplateElement;
    }, function(m) {
      MapWrapper = m.MapWrapper;
      ListWrapper = m.ListWrapper;
    }, function(m) {
      Parser = m.Parser;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileControl = m.CompileControl;
    }],
    execute: function() {
      ViewSplitter = $__export("ViewSplitter", (function($__super) {
        var ViewSplitter = function ViewSplitter(parser, compilationUnit) {
          this._parser = parser;
          this._compilationUnit = compilationUnit;
        };
        return ($traceurRuntime.createClass)(ViewSplitter, {
          process: function(parent, current, control) {
            if (isBlank(parent)) {
              current.isViewRoot = true;
            } else {
              if (current.element instanceof TemplateElement) {
                if (!current.isViewRoot) {
                  var viewRoot = new CompileElement(DOM.createTemplate(''));
                  var currentElement = current.element;
                  var viewRootElement = viewRoot.element;
                  this._moveChildNodes(currentElement.content, viewRootElement.content);
                  viewRoot.isViewRoot = true;
                  control.addChild(viewRoot);
                }
              } else {
                var templateBindings = MapWrapper.get(current.attrs(), 'template');
                if (isPresent(templateBindings)) {
                  var newParent = new CompileElement(DOM.createTemplate(''));
                  current.isViewRoot = true;
                  this._parseTemplateBindings(templateBindings, newParent);
                  this._addParentElement(current.element, newParent.element);
                  control.addParent(newParent);
                  current.element.remove();
                }
              }
            }
          },
          _moveChildNodes: function(source, target) {
            while (isPresent(source.firstChild)) {
              DOM.appendChild(target, source.firstChild);
            }
          },
          _addParentElement: function(currentElement, newParentElement) {
            DOM.parentElement(currentElement).insertBefore(newParentElement, currentElement);
            DOM.appendChild(newParentElement, currentElement);
          },
          _parseTemplateBindings: function(templateBindings, compileElement) {
            var bindings = this._parser.parseTemplateBindings(templateBindings, this._compilationUnit);
            for (var i = 0; i < bindings.length; i++) {
              var binding = bindings[i];
              if (isPresent(binding.name)) {
                compileElement.addVariableBinding(binding.key, binding.name);
              } else if (isPresent(binding.expression)) {
                compileElement.addPropertyBinding(binding.key, binding.expression);
              } else {
                compileElement.element.setAttribute(binding.key, '');
              }
            }
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(ViewSplitter, "parameters", {get: function() {
          return [[Parser], [$traceurRuntime.type.any]];
        }});
      Object.defineProperty(ViewSplitter.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      Object.defineProperty(ViewSplitter.prototype._parseTemplateBindings, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], [CompileElement]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/pipeline/view_splitter.map

//# sourceMappingURL=./view_splitter.map