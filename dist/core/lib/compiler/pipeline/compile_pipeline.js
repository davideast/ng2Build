System.register("core/compiler/pipeline/compile_pipeline", ["facade/lang", "facade/collection", "facade/dom", "./compile_element", "./compile_control", "./compile_step", "../directive_metadata"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/pipeline/compile_pipeline";
  var isPresent,
      List,
      ListWrapper,
      Element,
      Node,
      DOM,
      CompileElement,
      CompileControl,
      CompileStep,
      DirectiveMetadata,
      CompilePipeline;
  return {
    setters: [function(m) {
      isPresent = m.isPresent;
    }, function(m) {
      List = m.List;
      ListWrapper = m.ListWrapper;
    }, function(m) {
      Element = m.Element;
      Node = m.Node;
      DOM = m.DOM;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileControl = m.CompileControl;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }],
    execute: function() {
      CompilePipeline = $__export("CompilePipeline", (function() {
        var CompilePipeline = function CompilePipeline(steps) {
          this._control = new CompileControl(steps);
        };
        return ($traceurRuntime.createClass)(CompilePipeline, {
          process: function(rootElement) {
            var results = ListWrapper.create();
            this._process(results, null, new CompileElement(rootElement));
            return results;
          },
          _process: function(results, parent, current) {
            var additionalChildren = this._control.internalProcess(results, 0, parent, current);
            if (current.compileChildren) {
              var node = DOM.templateAwareRoot(current.element).firstChild;
              while (isPresent(node)) {
                var nextNode = DOM.nextSibling(node);
                if (node.nodeType === Node.ELEMENT_NODE) {
                  this._process(results, current, new CompileElement(node));
                }
                node = nextNode;
              }
            }
            if (isPresent(additionalChildren)) {
              for (var i = 0; i < additionalChildren.length; i++) {
                this._process(results, current, additionalChildren[i]);
              }
            }
          }
        }, {});
      }()));
      Object.defineProperty(CompilePipeline, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(CompilePipeline.prototype.process, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(CompilePipeline.prototype._process, "parameters", {get: function() {
          return [[], [CompileElement], [CompileElement]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/pipeline/compile_pipeline.map

//# sourceMappingURL=./compile_pipeline.map