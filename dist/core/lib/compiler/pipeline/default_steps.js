System.register("core/compiler/pipeline/default_steps", ["change_detection/change_detection", "facade/collection", "./property_binding_parser", "./text_interpolation_parser", "./directive_parser", "./view_splitter", "./element_binding_marker", "./proto_view_builder", "./proto_element_injector_builder", "./element_binder_builder", "core/compiler/directive_metadata", "facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/pipeline/default_steps";
  var Parser,
      List,
      PropertyBindingParser,
      TextInterpolationParser,
      DirectiveParser,
      ViewSplitter,
      ElementBindingMarker,
      ProtoViewBuilder,
      ProtoElementInjectorBuilder,
      ElementBinderBuilder,
      DirectiveMetadata,
      stringify;
  function createDefaultSteps(parser, compiledComponent, directives) {
    var compilationUnit = stringify(compiledComponent.type);
    return [new ViewSplitter(parser, compilationUnit), new PropertyBindingParser(parser, compilationUnit), new DirectiveParser(directives), new TextInterpolationParser(parser, compilationUnit), new ElementBindingMarker(), new ProtoViewBuilder(), new ProtoElementInjectorBuilder(), new ElementBinderBuilder()];
  }
  $__export("createDefaultSteps", createDefaultSteps);
  return {
    setters: [function(m) {
      Parser = m.Parser;
    }, function(m) {
      List = m.List;
    }, function(m) {
      PropertyBindingParser = m.PropertyBindingParser;
    }, function(m) {
      TextInterpolationParser = m.TextInterpolationParser;
    }, function(m) {
      DirectiveParser = m.DirectiveParser;
    }, function(m) {
      ViewSplitter = m.ViewSplitter;
    }, function(m) {
      ElementBindingMarker = m.ElementBindingMarker;
    }, function(m) {
      ProtoViewBuilder = m.ProtoViewBuilder;
    }, function(m) {
      ProtoElementInjectorBuilder = m.ProtoElementInjectorBuilder;
    }, function(m) {
      ElementBinderBuilder = m.ElementBinderBuilder;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }, function(m) {
      stringify = m.stringify;
    }],
    execute: function() {
      Object.defineProperty(createDefaultSteps, "parameters", {get: function() {
          return [[Parser], [DirectiveMetadata], [List]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/pipeline/default_steps.map

//# sourceMappingURL=./default_steps.map