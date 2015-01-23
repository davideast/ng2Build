System.register("core/compiler/pipeline/property_binding_parser", ["facade/lang", "facade/collection", "facade/dom", "change_detection/change_detection", "./compile_step", "./compile_element", "./compile_control", "./text_interpolation_parser"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/pipeline/property_binding_parser";
  var isPresent,
      isBlank,
      RegExpWrapper,
      BaseException,
      MapWrapper,
      TemplateElement,
      Parser,
      AST,
      ExpressionWithSource,
      CompileStep,
      CompileElement,
      CompileControl,
      interpolationToExpression,
      BIND_NAME_REGEXP,
      PropertyBindingParser;
  return {
    setters: [function(m) {
      isPresent = m.isPresent;
      isBlank = m.isBlank;
      RegExpWrapper = m.RegExpWrapper;
      BaseException = m.BaseException;
    }, function(m) {
      MapWrapper = m.MapWrapper;
    }, function(m) {
      TemplateElement = m.TemplateElement;
    }, function(m) {
      Parser = m.Parser;
      AST = m.AST;
      ExpressionWithSource = m.ExpressionWithSource;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileControl = m.CompileControl;
    }, function(m) {
      interpolationToExpression = m.interpolationToExpression;
    }],
    execute: function() {
      BIND_NAME_REGEXP = RegExpWrapper.create('^(?:(?:(bind)|(let)|(on))-(.+))|\\[([^\\]]+)\\]|\\(([^\\)]+)\\)');
      PropertyBindingParser = $__export("PropertyBindingParser", (function($__super) {
        var PropertyBindingParser = function PropertyBindingParser(parser, compilationUnit) {
          this._parser = parser;
          this._compilationUnit = compilationUnit;
        };
        return ($traceurRuntime.createClass)(PropertyBindingParser, {
          process: function(parent, current, control) {
            var $__0 = this;
            var attrs = current.attrs();
            MapWrapper.forEach(attrs, (function(attrValue, attrName) {
              var bindParts = RegExpWrapper.firstMatch(BIND_NAME_REGEXP, attrName);
              if (isPresent(bindParts)) {
                if (isPresent(bindParts[1])) {
                  current.addPropertyBinding(bindParts[4], $__0._parseBinding(attrValue));
                } else if (isPresent(bindParts[2])) {
                  if (!(current.element instanceof TemplateElement)) {
                    throw new BaseException('let-* is only allowed on <template> elements!');
                  }
                  current.addVariableBinding(bindParts[4], attrValue);
                } else if (isPresent(bindParts[3])) {
                  current.addEventBinding(bindParts[4], $__0._parseAction(attrValue));
                } else if (isPresent(bindParts[5])) {
                  current.addPropertyBinding(bindParts[5], $__0._parseBinding(attrValue));
                } else if (isPresent(bindParts[6])) {
                  current.addEventBinding(bindParts[6], $__0._parseBinding(attrValue));
                }
              } else {
                var expression = interpolationToExpression(attrValue);
                if (isPresent(expression)) {
                  current.addPropertyBinding(attrName, $__0._parseBinding(expression));
                }
              }
            }));
          },
          _parseBinding: function(input) {
            return this._parser.parseBinding(input, this._compilationUnit);
          },
          _parseAction: function(input) {
            return this._parser.parseAction(input, this._compilationUnit);
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(PropertyBindingParser, "parameters", {get: function() {
          return [[Parser], [$traceurRuntime.type.any]];
        }});
      Object.defineProperty(PropertyBindingParser.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      Object.defineProperty(PropertyBindingParser.prototype._parseBinding, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
      Object.defineProperty(PropertyBindingParser.prototype._parseAction, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/pipeline/property_binding_parser.map

//# sourceMappingURL=./property_binding_parser.map