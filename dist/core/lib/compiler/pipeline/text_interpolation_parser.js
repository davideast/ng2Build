System.register("core/compiler/pipeline/text_interpolation_parser", ["facade/lang", "facade/dom", "change_detection/change_detection", "./compile_step", "./compile_element", "./compile_control"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/pipeline/text_interpolation_parser";
  var RegExpWrapper,
      StringWrapper,
      isPresent,
      Node,
      DOM,
      Parser,
      CompileStep,
      CompileElement,
      CompileControl,
      INTERPOLATION_REGEXP,
      QUOTE_REGEXP,
      TextInterpolationParser;
  function interpolationToExpression(value) {
    var parts = StringWrapper.split(value, INTERPOLATION_REGEXP);
    if (parts.length <= 1) {
      return null;
    }
    var expression = '';
    for (var i = 0; i < parts.length; i++) {
      var expressionPart = null;
      if (i % 2 === 0) {
        if (parts[i].length > 0) {
          expressionPart = "'" + StringWrapper.replaceAll(parts[i], QUOTE_REGEXP, "\\'") + "'";
        }
      } else {
        expressionPart = "(" + parts[i] + ")";
      }
      if (isPresent(expressionPart)) {
        if (expression.length > 0) {
          expression += '+';
        }
        expression += expressionPart;
      }
    }
    return expression;
  }
  $__export("interpolationToExpression", interpolationToExpression);
  return {
    setters: [function(m) {
      RegExpWrapper = m.RegExpWrapper;
      StringWrapper = m.StringWrapper;
      isPresent = m.isPresent;
    }, function(m) {
      Node = m.Node;
      DOM = m.DOM;
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
      INTERPOLATION_REGEXP = RegExpWrapper.create('\\{\\{(.*?)\\}\\}');
      QUOTE_REGEXP = RegExpWrapper.create("'");
      Object.defineProperty(interpolationToExpression, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
      TextInterpolationParser = $__export("TextInterpolationParser", (function($__super) {
        var TextInterpolationParser = function TextInterpolationParser(parser, compilationUnit) {
          this._parser = parser;
          this._compilationUnit = compilationUnit;
        };
        return ($traceurRuntime.createClass)(TextInterpolationParser, {
          process: function(parent, current, control) {
            if (!current.compileChildren) {
              return ;
            }
            var element = current.element;
            var childNodes = DOM.templateAwareRoot(element).childNodes;
            for (var i = 0; i < childNodes.length; i++) {
              var node = childNodes[i];
              if (node.nodeType === Node.TEXT_NODE) {
                this._parseTextNode(current, node, i);
              }
            }
          },
          _parseTextNode: function(pipelineElement, node, nodeIndex) {
            var expression = interpolationToExpression(node.nodeValue);
            if (isPresent(expression)) {
              DOM.setText(node, ' ');
              pipelineElement.addTextNodeBinding(nodeIndex, this._parser.parseBinding(expression, this._compilationUnit));
            }
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(TextInterpolationParser, "parameters", {get: function() {
          return [[Parser], [$traceurRuntime.type.any]];
        }});
      Object.defineProperty(TextInterpolationParser.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/pipeline/text_interpolation_parser.map

//# sourceMappingURL=./text_interpolation_parser.map