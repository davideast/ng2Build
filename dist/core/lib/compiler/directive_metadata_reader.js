System.register("core/compiler/directive_metadata_reader", ["facade/lang", "facade/collection", "../annotations/annotations", "./directive_metadata", "reflection/reflection", "./shadow_dom"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/directive_metadata_reader";
  var Type,
      isPresent,
      BaseException,
      stringify,
      List,
      ListWrapper,
      Directive,
      Component,
      DirectiveMetadata,
      reflector,
      ShadowDom,
      ShadowDomStrategy,
      ShadowDomNative,
      DirectiveMetadataReader;
  return {
    setters: [function(m) {
      Type = m.Type;
      isPresent = m.isPresent;
      BaseException = m.BaseException;
      stringify = m.stringify;
    }, function(m) {
      List = m.List;
      ListWrapper = m.ListWrapper;
    }, function(m) {
      Directive = m.Directive;
      Component = m.Component;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }, function(m) {
      reflector = m.reflector;
    }, function(m) {
      ShadowDom = m.ShadowDom;
      ShadowDomStrategy = m.ShadowDomStrategy;
      ShadowDomNative = m.ShadowDomNative;
    }],
    execute: function() {
      DirectiveMetadataReader = $__export("DirectiveMetadataReader", (function() {
        var DirectiveMetadataReader = function DirectiveMetadataReader() {};
        return ($traceurRuntime.createClass)(DirectiveMetadataReader, {
          read: function(type) {
            var annotations = reflector.annotations(type);
            if (isPresent(annotations)) {
              for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation instanceof Component) {
                  var shadowDomStrategy = this.parseShadowDomStrategy(annotation);
                  return new DirectiveMetadata(type, annotation, shadowDomStrategy, this.componentDirectivesMetadata(annotation, shadowDomStrategy));
                }
                if (annotation instanceof Directive) {
                  return new DirectiveMetadata(type, annotation, null, null);
                }
              }
            }
            throw new BaseException(("No Directive annotation found on " + stringify(type)));
          },
          parseShadowDomStrategy: function(annotation) {
            return isPresent(annotation.shadowDom) ? annotation.shadowDom : ShadowDomNative;
          },
          componentDirectivesMetadata: function(annotation, shadowDomStrategy) {
            var polyDirs = shadowDomStrategy.polyfillDirectives();
            var template = annotation.template;
            var templateDirs = isPresent(template) && isPresent(template.directives) ? template.directives : [];
            var res = [];
            res = ListWrapper.concat(res, templateDirs);
            res = ListWrapper.concat(res, polyDirs);
            return res;
          }
        }, {});
      }()));
      Object.defineProperty(DirectiveMetadataReader.prototype.read, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(DirectiveMetadataReader.prototype.parseShadowDomStrategy, "parameters", {get: function() {
          return [[Component]];
        }});
      Object.defineProperty(DirectiveMetadataReader.prototype.componentDirectivesMetadata, "parameters", {get: function() {
          return [[Component], [ShadowDomStrategy]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/directive_metadata_reader.map

//# sourceMappingURL=./directive_metadata_reader.map