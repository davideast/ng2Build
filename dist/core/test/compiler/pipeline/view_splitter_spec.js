System.register("core/test/compiler/pipeline/view_splitter_spec", ["test_lib/test_lib", "facade/lang", "facade/collection", "core/compiler/pipeline/view_splitter", "core/compiler/pipeline/compile_pipeline", "facade/dom", "change_detection/change_detection"], function($__export) {
  "use strict";
  var __moduleName = "core/test/compiler/pipeline/view_splitter_spec";
  var describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      isPresent,
      MapWrapper,
      ViewSplitter,
      CompilePipeline,
      DOM,
      TemplateElement,
      Lexer,
      Parser;
  function main() {
    describe('ViewSplitter', (function() {
      function createPipeline() {
        return new CompilePipeline([new ViewSplitter(new Parser(new Lexer()), null)]);
      }
      it('should mark root elements as viewRoot', (function() {
        var rootElement = el('<div></div>');
        var results = createPipeline().process(rootElement);
        expect(results[0].isViewRoot).toBe(true);
      }));
      describe('<template> elements', (function() {
        it('should move the content into a new <template> element and mark that as viewRoot', (function() {
          var rootElement = el('<div><template if="true">a</template></div>');
          var results = createPipeline().process(rootElement);
          expect(DOM.getOuterHTML(results[1].element)).toEqual('<template if="true"></template>');
          expect(results[1].isViewRoot).toBe(false);
          expect(DOM.getOuterHTML(results[2].element)).toEqual('<template>a</template>');
          expect(results[2].isViewRoot).toBe(true);
        }));
        it('should not wrap a root <template> element', (function() {
          var rootElement = el('<div></div>');
          var results = createPipeline().process(rootElement);
          expect(results.length).toBe(1);
          expect(DOM.getOuterHTML(rootElement)).toEqual('<div></div>');
        }));
      }));
      describe('elements with template attribute', (function() {
        it('should replace the element with an empty <template> element', (function() {
          var rootElement = el('<div><span template=""></span></div>');
          var originalChild = rootElement.childNodes[0];
          var results = createPipeline().process(rootElement);
          expect(results[0].element).toBe(rootElement);
          expect(DOM.getOuterHTML(results[0].element)).toEqual('<div><template></template></div>');
          expect(DOM.getOuterHTML(results[2].element)).toEqual('<span template=""></span>');
          expect(results[2].element).toBe(originalChild);
        }));
        it('should mark the element as viewRoot', (function() {
          var rootElement = el('<div><div template></div></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].isViewRoot).toBe(true);
        }));
        it('should add property bindings from the template attribute', (function() {
          var rootElement = el('<div><div template="prop:expr"></div></div>');
          var results = createPipeline().process(rootElement);
          expect(MapWrapper.get(results[1].propertyBindings, 'prop').source).toEqual('expr');
        }));
        it('should add variable mappings from the template attribute', (function() {
          var rootElement = el('<div><div template="varName #mapName"></div></div>');
          var results = createPipeline().process(rootElement);
          expect(results[1].variableBindings).toEqual(MapWrapper.createFromStringMap({'varName': 'mapName'}));
        }));
        it('should add entries without value as attribute to the element', (function() {
          var rootElement = el('<div><div template="varname"></div></div>');
          var results = createPipeline().process(rootElement);
          expect(results[1].attrs()).toEqual(MapWrapper.createFromStringMap({'varname': ''}));
          expect(results[1].propertyBindings).toBe(null);
          expect(results[1].variableBindings).toBe(null);
        }));
        it('should iterate properly after a template dom modification', (function() {
          var rootElement = el('<div><div template></div><after></after></div>');
          var results = createPipeline().process(rootElement);
          expect(results.length).toEqual(4);
        }));
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
      isPresent = m.isPresent;
    }, function(m) {
      MapWrapper = m.MapWrapper;
    }, function(m) {
      ViewSplitter = m.ViewSplitter;
    }, function(m) {
      CompilePipeline = m.CompilePipeline;
    }, function(m) {
      DOM = m.DOM;
      TemplateElement = m.TemplateElement;
    }, function(m) {
      Lexer = m.Lexer;
      Parser = m.Parser;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/compiler/pipeline/view_splitter_spec.map

//# sourceMappingURL=./view_splitter_spec.map