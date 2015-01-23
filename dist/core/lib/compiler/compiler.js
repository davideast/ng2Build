System.register("core/compiler/compiler", ["facade/lang", "facade/async", "facade/collection", "facade/dom", "change_detection/change_detection", "./directive_metadata_reader", "./view", "./pipeline/compile_pipeline", "./pipeline/compile_element", "./pipeline/default_steps", "./template_loader", "./directive_metadata", "../annotations/annotations", "./shadow_dom_emulation/content_tag"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/compiler";
  var Type,
      FIELD,
      isBlank,
      isPresent,
      BaseException,
      stringify,
      Promise,
      PromiseWrapper,
      List,
      ListWrapper,
      MapWrapper,
      DOM,
      Element,
      Parser,
      DirectiveMetadataReader,
      ProtoView,
      CompilePipeline,
      CompileElement,
      createDefaultSteps,
      TemplateLoader,
      DirectiveMetadata,
      Component,
      Content,
      CompilerCache,
      Compiler;
  return {
    setters: [function(m) {
      Type = m.Type;
      FIELD = m.FIELD;
      isBlank = m.isBlank;
      isPresent = m.isPresent;
      BaseException = m.BaseException;
      stringify = m.stringify;
    }, function(m) {
      Promise = m.Promise;
      PromiseWrapper = m.PromiseWrapper;
    }, function(m) {
      List = m.List;
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
    }, function(m) {
      DOM = m.DOM;
      Element = m.Element;
    }, function(m) {
      Parser = m.Parser;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      ProtoView = m.ProtoView;
    }, function(m) {
      CompilePipeline = m.CompilePipeline;
    }, function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      createDefaultSteps = m.createDefaultSteps;
    }, function(m) {
      TemplateLoader = m.TemplateLoader;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }, function(m) {
      Component = m.Component;
    }, function(m) {
      Content = m.Content;
    }],
    execute: function() {
      CompilerCache = $__export("CompilerCache", (function() {
        var CompilerCache = function CompilerCache() {
          this._cache = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(CompilerCache, {
          set: function(component, protoView) {
            MapWrapper.set(this._cache, component, protoView);
          },
          get: function(component) {
            var result = MapWrapper.get(this._cache, component);
            if (isBlank(result)) {
              return null;
            }
            return result;
          },
          clear: function() {
            this._cache = MapWrapper.create();
          }
        }, {});
      }()));
      Object.defineProperty(CompilerCache.prototype.set, "parameters", {get: function() {
          return [[Type], [ProtoView]];
        }});
      Object.defineProperty(CompilerCache.prototype.get, "parameters", {get: function() {
          return [[Type]];
        }});
      Compiler = $__export("Compiler", (function() {
        var Compiler = function Compiler(templateLoader, reader, parser, cache) {
          this._templateLoader = templateLoader;
          this._reader = reader;
          this._parser = parser;
          this._compilerCache = cache;
        };
        return ($traceurRuntime.createClass)(Compiler, {
          createSteps: function(component) {
            var $__0 = this;
            var dirs = ListWrapper.map(component.componentDirectives, (function(d) {
              return $__0._reader.read(d);
            }));
            return createDefaultSteps(this._parser, component, dirs);
          },
          compile: function(component) {
            var templateRoot = arguments[1] !== (void 0) ? arguments[1] : null;
            var templateCache = null;
            return PromiseWrapper.resolve(this.compileAllLoaded(templateCache, this._reader.read(component), templateRoot));
          },
          compileAllLoaded: function(templateCache, component) {
            var templateRoot = arguments[2] !== (void 0) ? arguments[2] : null;
            var rootProtoView = this._compilerCache.get(component.type);
            if (isPresent(rootProtoView)) {
              return rootProtoView;
            }
            if (isBlank(templateRoot)) {
              var annotation = component.annotation;
              templateRoot = DOM.createTemplate(annotation.template.inline);
            }
            var pipeline = new CompilePipeline(this.createSteps(component));
            var compileElements = pipeline.process(templateRoot);
            rootProtoView = compileElements[0].inheritedProtoView;
            this._compilerCache.set(component.type, rootProtoView);
            for (var i = 0; i < compileElements.length; i++) {
              var ce = compileElements[i];
              if (isPresent(ce.componentDirective)) {
                ce.inheritedElementBinder.nestedProtoView = this.compileAllLoaded(templateCache, ce.componentDirective, null);
              }
            }
            return rootProtoView;
          }
        }, {});
      }()));
      Object.defineProperty(Compiler, "parameters", {get: function() {
          return [[TemplateLoader], [DirectiveMetadataReader], [Parser], [CompilerCache]];
        }});
      Object.defineProperty(Compiler.prototype.createSteps, "parameters", {get: function() {
          return [[DirectiveMetadata]];
        }});
      Object.defineProperty(Compiler.prototype.compile, "parameters", {get: function() {
          return [[Type], [Element]];
        }});
      Object.defineProperty(Compiler.prototype.compileAllLoaded, "parameters", {get: function() {
          return [[], [DirectiveMetadata], [Element]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/compiler.map

//# sourceMappingURL=./compiler.map