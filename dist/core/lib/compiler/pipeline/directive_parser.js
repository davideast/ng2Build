System.register("core/compiler/pipeline/directive_parser", ["facade/lang", "facade/collection", "facade/dom", "../selector", "../directive_metadata", "../../annotations/annotations", "./compile_step", "./compile_element", "./compile_control"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/pipeline/directive_parser";
  var isPresent,
      BaseException,
      List,
      MapWrapper,
      TemplateElement,
      SelectorMatcher,
      CssSelector,
      DirectiveMetadata,
      Template,
      Component,
      CompileStep,
      CompileElement,
      CompileControl,
      DirectiveParser;
  return {
    setters: [function(m) {
      isPresent = m.isPresent;
      BaseException = m.BaseException;
    }, function(m) {
      List = m.List;
      MapWrapper = m.MapWrapper;
    }, function(m) {
      TemplateElement = m.TemplateElement;
    }, function(m) {
      SelectorMatcher = m.SelectorMatcher;
      CssSelector = m.CssSelector;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }, function(m) {
      Template = m.Template;
      Component = m.Component;
    }, function(m) {
      CompileStep = m.CompileStep;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileControl = m.CompileControl;
    }],
    execute: function() {
      DirectiveParser = $__export("DirectiveParser", (function($__super) {
        var DirectiveParser = function DirectiveParser(directives) {
          this._selectorMatcher = new SelectorMatcher();
          for (var i = 0; i < directives.length; i++) {
            var directiveMetadata = directives[i];
            this._selectorMatcher.addSelectable(CssSelector.parse(directiveMetadata.annotation.selector), directiveMetadata);
          }
        };
        return ($traceurRuntime.createClass)(DirectiveParser, {process: function(parent, current, control) {
            var attrs = current.attrs();
            var classList = current.classList();
            var cssSelector = new CssSelector();
            cssSelector.setElement(current.element.nodeName);
            for (var i = 0; i < classList.length; i++) {
              cssSelector.addClassName(classList[i]);
            }
            MapWrapper.forEach(attrs, (function(attrValue, attrName) {
              cssSelector.addAttribute(attrName, attrValue);
            }));
            if (isPresent(current.propertyBindings)) {
              MapWrapper.forEach(current.propertyBindings, (function(expression, prop) {
                cssSelector.addAttribute(prop, expression.source);
              }));
            }
            if (isPresent(current.variableBindings)) {
              MapWrapper.forEach(current.variableBindings, (function(value, name) {
                cssSelector.addAttribute(name, value);
              }));
            }
            var isTemplateElement = current.element instanceof TemplateElement;
            this._selectorMatcher.match(cssSelector, (function(directive) {
              if (directive.annotation instanceof Template) {
                if (!isTemplateElement) {
                  throw new BaseException('Template directives need to be placed on <template> elements or elements with template attribute!');
                } else if (isPresent(current.templateDirective)) {
                  throw new BaseException('Only one template directive per element is allowed!');
                }
              } else if (isTemplateElement) {
                throw new BaseException('Only template directives are allowed on <template> elements!');
              } else if ((directive.annotation instanceof Component) && isPresent(current.componentDirective)) {
                throw new BaseException('Only one component directive per element is allowed!');
              }
              current.addDirective(directive);
            }));
          }}, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(DirectiveParser, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(DirectiveParser.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/pipeline/directive_parser.map

//# sourceMappingURL=./directive_parser.map