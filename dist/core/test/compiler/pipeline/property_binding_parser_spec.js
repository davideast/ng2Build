System.register("core/test/compiler/pipeline/property_binding_parser_spec", ["test_lib/test_lib", "core/compiler/pipeline/property_binding_parser", "core/compiler/pipeline/compile_pipeline", "facade/dom", "facade/collection", "change_detection/change_detection"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/pipeline/property_binding_parser_spec";
  var describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      PropertyBindingParser,
      CompilePipeline,
      DOM,
      MapWrapper,
      Lexer,
      Parser;
  function main() {
    describe('PropertyBindingParser', (function() {
      function createPipeline() {
        return new CompilePipeline([new PropertyBindingParser(new Parser(new Lexer()), null)]);
      }
      it('should detect [] syntax', (function() {
        var results = createPipeline().process(el('<div [a]="b"></div>'));
        expect(MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('b');
      }));
      it('should detect bind- syntax', (function() {
        var results = createPipeline().process(el('<div bind-a="b"></div>'));
        expect(MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('b');
      }));
      it('should detect interpolation syntax', (function() {
        var results = createPipeline().process(el('<div a="{{b}}"></div>'));
        expect(MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('(b)');
      }));
      it('should detect let- syntax', (function() {
        var results = createPipeline().process(el('<template let-a="b"></template>'));
        expect(MapWrapper.get(results[0].variableBindings, 'a')).toEqual('b');
      }));
      it('should not allow let- syntax on non template elements', (function() {
        expect((function() {
          createPipeline().process(el('<div let-a="b"></div>'));
        })).toThrowError('let-* is only allowed on <template> elements!');
      }));
      it('should detect () syntax', (function() {
        var results = createPipeline().process(el('<div (click)="b()"></div>'));
        expect(MapWrapper.get(results[0].eventBindings, 'click').source).toEqual('b()');
        results = createPipeline().process(el('<div (click[])="b()"></div>'));
        expect(MapWrapper.get(results[0].eventBindings, 'click[]').source).toEqual('b()');
      }));
      it('should detect on- syntax', (function() {
        var results = createPipeline().process(el('<div on-click="b()"></div>'));
        expect(MapWrapper.get(results[0].eventBindings, 'click').source).toEqual('b()');
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      describe = m.describe;
      beforeEach = m.beforeEach;
      it = m.it;
      expect = m.expect;
      iit = m.iit;
      ddescribe = m.ddescribe;
      el = m.el;
    }, function(m) {
      PropertyBindingParser = m.PropertyBindingParser;
    }, function(m) {
      CompilePipeline = m.CompilePipeline;
    }, function(m) {
      DOM = m.DOM;
    }, function(m) {
      MapWrapper = m.MapWrapper;
    }, function(m) {
      Lexer = m.Lexer;
      Parser = m.Parser;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/pipeline/property_binding_parser_spec.map

//# sourceMappingURL=./property_binding_parser_spec.map