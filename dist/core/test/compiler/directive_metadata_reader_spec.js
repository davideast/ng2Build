System.register("core/test/compiler/directive_metadata_reader_spec", ["test_lib/test_lib", "core/compiler/directive_metadata_reader", "core/annotations/annotations", "core/annotations/template_config", "core/compiler/directive_metadata", "core/compiler/shadow_dom", "facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/directive_metadata_reader_spec";
  var ddescribe,
      describe,
      it,
      iit,
      expect,
      beforeEach,
      DirectiveMetadataReader,
      Decorator,
      Component,
      TemplateConfig,
      DirectiveMetadata,
      ShadowDomStrategy,
      ShadowDomNative,
      CONST,
      FakeShadowDomStrategy,
      SomeDirective,
      ComponentWithoutExplicitShadowDomStrategy,
      ComponentWithExplicitShadowDomStrategy,
      SomeDirectiveWithoutAnnotation,
      ComponentWithoutDirectives,
      ComponentWithDirectives;
  function main() {
    describe("DirectiveMetadataReader", (function() {
      var reader;
      beforeEach((function() {
        reader = new DirectiveMetadataReader();
      }));
      it('should read out the annotation', (function() {
        var directiveMetadata = reader.read(SomeDirective);
        expect(directiveMetadata).toEqual(new DirectiveMetadata(SomeDirective, new Decorator({selector: 'someSelector'}), null, null));
      }));
      it('should throw if not matching annotation is found', (function() {
        expect((function() {
          reader.read(SomeDirectiveWithoutAnnotation);
        })).toThrowError('No Directive annotation found on SomeDirectiveWithoutAnnotation');
      }));
      describe("shadow dom strategy", (function() {
        it('should return the provided shadow dom strategy when it is present', (function() {
          var directiveMetadata = reader.read(ComponentWithExplicitShadowDomStrategy);
          expect(directiveMetadata.shadowDomStrategy).toBeAnInstanceOf(FakeShadowDomStrategy);
        }));
        it('should return Native otherwise', (function() {
          var directiveMetadata = reader.read(ComponentWithoutExplicitShadowDomStrategy);
          expect(directiveMetadata.shadowDomStrategy).toEqual(ShadowDomNative);
        }));
      }));
      describe("componentDirectives", (function() {
        it("should return an empty list when no directives specified", (function() {
          var cmp = reader.read(ComponentWithoutDirectives);
          expect(cmp.componentDirectives).toEqual([]);
        }));
        it("should return a list of directives specified in the template config", (function() {
          var cmp = reader.read(ComponentWithDirectives);
          expect(cmp.componentDirectives).toEqual([ComponentWithoutDirectives]);
        }));
        it("should include directives required by the shadow DOM strategy", (function() {
          var cmp = reader.read(ComponentWithExplicitShadowDomStrategy);
          expect(cmp.componentDirectives).toEqual([SomeDirective]);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      ddescribe = m.ddescribe;
      describe = m.describe;
      it = m.it;
      iit = m.iit;
      expect = m.expect;
      beforeEach = m.beforeEach;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      Decorator = m.Decorator;
      Component = m.Component;
    }, function(m) {
      TemplateConfig = m.TemplateConfig;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }, function(m) {
      ShadowDomStrategy = m.ShadowDomStrategy;
      ShadowDomNative = m.ShadowDomNative;
    }, function(m) {
      CONST = m.CONST;
    }],
    execute: function() {
      FakeShadowDomStrategy = (function($__super) {
        var FakeShadowDomStrategy = function FakeShadowDomStrategy() {};
        return ($traceurRuntime.createClass)(FakeShadowDomStrategy, {polyfillDirectives: function() {
            return [SomeDirective];
          }}, {}, $__super);
      }(ShadowDomStrategy));
      Object.defineProperty(FakeShadowDomStrategy, "annotations", {get: function() {
          return [new CONST()];
        }});
      SomeDirective = (function() {
        var SomeDirective = function SomeDirective() {};
        return ($traceurRuntime.createClass)(SomeDirective, {}, {});
      }());
      Object.defineProperty(SomeDirective, "annotations", {get: function() {
          return [new Decorator({selector: 'someSelector'})];
        }});
      ComponentWithoutExplicitShadowDomStrategy = (function() {
        var ComponentWithoutExplicitShadowDomStrategy = function ComponentWithoutExplicitShadowDomStrategy() {};
        return ($traceurRuntime.createClass)(ComponentWithoutExplicitShadowDomStrategy, {}, {});
      }());
      Object.defineProperty(ComponentWithoutExplicitShadowDomStrategy, "annotations", {get: function() {
          return [new Component({selector: 'someSelector'})];
        }});
      ComponentWithExplicitShadowDomStrategy = (function() {
        var ComponentWithExplicitShadowDomStrategy = function ComponentWithExplicitShadowDomStrategy() {};
        return ($traceurRuntime.createClass)(ComponentWithExplicitShadowDomStrategy, {}, {});
      }());
      Object.defineProperty(ComponentWithExplicitShadowDomStrategy, "annotations", {get: function() {
          return [new Component({
            selector: 'someSelector',
            shadowDom: new FakeShadowDomStrategy()
          })];
        }});
      SomeDirectiveWithoutAnnotation = (function() {
        var SomeDirectiveWithoutAnnotation = function SomeDirectiveWithoutAnnotation() {};
        return ($traceurRuntime.createClass)(SomeDirectiveWithoutAnnotation, {}, {});
      }());
      ComponentWithoutDirectives = (function() {
        var ComponentWithoutDirectives = function ComponentWithoutDirectives() {};
        return ($traceurRuntime.createClass)(ComponentWithoutDirectives, {}, {});
      }());
      Object.defineProperty(ComponentWithoutDirectives, "annotations", {get: function() {
          return [new Component({selector: 'withoutDirectives'})];
        }});
      ComponentWithDirectives = (function() {
        var ComponentWithDirectives = function ComponentWithDirectives() {};
        return ($traceurRuntime.createClass)(ComponentWithDirectives, {}, {});
      }());
      Object.defineProperty(ComponentWithDirectives, "annotations", {get: function() {
          return [new Component({
            selector: 'withDirectives',
            template: new TemplateConfig({directives: [ComponentWithoutDirectives]})
          })];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/directive_metadata_reader_spec.map

//# sourceMappingURL=./directive_metadata_reader_spec.map