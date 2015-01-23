System.register("benchmarks/compiler/compiler_benchmark", ["facade/dom", "facade/lang", "facade/collection", "core/compiler/directive_metadata", "change_detection/change_detection", "core/compiler/compiler", "core/compiler/directive_metadata_reader", "core/annotations/annotations", "core/annotations/template_config", "reflection/reflection", "e2e_test_lib/benchmark_util"], function($__export) {
  "use strict";
  var __moduleName = "benchmarks/compiler/compiler_benchmark";
  var DOM,
      document,
      isBlank,
      Type,
      MapWrapper,
      DirectiveMetadata,
      Parser,
      Lexer,
      ProtoRecordRange,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      Component,
      Decorator,
      TemplateConfig,
      reflector,
      getIntParameter,
      bindAction,
      Dir0,
      Dir1,
      Dir2,
      Dir3,
      Dir4,
      BenchmarkComponent;
  function setupReflector() {
    reflector.registerType(BenchmarkComponent, {
      "factory": (function() {
        return new BenchmarkComponent();
      }),
      "parameters": [],
      "annotations": [new Component({template: new TemplateConfig({directives: [Dir0, Dir1, Dir2, Dir3, Dir4]})})]
    });
    reflector.registerType(Dir0, {
      "factory": (function() {
        return new Dir0();
      }),
      "parameters": [],
      "annotations": [new Decorator({
        selector: '[dir0]',
        bind: {'attr0': 'prop'}
      })]
    });
    reflector.registerType(Dir1, {
      "factory": (function(dir0) {
        return new Dir1(dir0);
      }),
      "parameters": [[Dir0]],
      "annotations": [new Decorator({
        selector: '[dir1]',
        bind: {'attr1': 'prop'}
      })]
    });
    reflector.registerType(Dir2, {
      "factory": (function(dir1) {
        return new Dir2(dir1);
      }),
      "parameters": [[Dir1]],
      "annotations": [new Decorator({
        selector: '[dir2]',
        bind: {'attr2': 'prop'}
      })]
    });
    reflector.registerType(Dir3, {
      "factory": (function(dir2) {
        return new Dir3(dir2);
      }),
      "parameters": [[Dir2]],
      "annotations": [new Decorator({
        selector: '[dir3]',
        bind: {'attr3': 'prop'}
      })]
    });
    reflector.registerType(Dir4, {
      "factory": (function(dir3) {
        return new Dir4(dir3);
      }),
      "parameters": [[Dir3]],
      "annotations": [new Decorator({
        selector: '[dir4]',
        bind: {'attr4': 'prop'}
      })]
    });
    reflector.registerGetters({
      "inter0": (function(a) {
        return a.inter0;
      }),
      "inter1": (function(a) {
        return a.inter1;
      }),
      "inter2": (function(a) {
        return a.inter2;
      }),
      "inter3": (function(a) {
        return a.inter3;
      }),
      "inter4": (function(a) {
        return a.inter4;
      }),
      "value0": (function(a) {
        return a.value0;
      }),
      "value1": (function(a) {
        return a.value1;
      }),
      "value2": (function(a) {
        return a.value2;
      }),
      "value3": (function(a) {
        return a.value3;
      }),
      "value4": (function(a) {
        return a.value4;
      }),
      "prop": (function(a) {
        return a.prop;
      })
    });
    reflector.registerSetters({
      "inter0": (function(a, v) {
        return a.inter0 = v;
      }),
      "inter1": (function(a, v) {
        return a.inter1 = v;
      }),
      "inter2": (function(a, v) {
        return a.inter2 = v;
      }),
      "inter3": (function(a, v) {
        return a.inter3 = v;
      }),
      "inter4": (function(a, v) {
        return a.inter4 = v;
      }),
      "value0": (function(a, v) {
        return a.value0 = v;
      }),
      "value1": (function(a, v) {
        return a.value1 = v;
      }),
      "value2": (function(a, v) {
        return a.value2 = v;
      }),
      "value3": (function(a, v) {
        return a.value3 = v;
      }),
      "value4": (function(a, v) {
        return a.value4 = v;
      }),
      "prop": (function(a, v) {
        return a.prop = v;
      })
    });
  }
  function main() {
    var count = getIntParameter('elements');
    setupReflector();
    var reader = new DirectiveMetadataReader();
    var cache = new CompilerCache();
    var compiler = new Compiler(null, reader, new Parser(new Lexer()), cache);
    var annotatedComponent = reader.read(BenchmarkComponent);
    var templateNoBindings = loadTemplate('templateNoBindings', count);
    var templateWithBindings = loadTemplate('templateWithBindings', count);
    function compileNoBindings() {
      var cloned = DOM.clone(templateNoBindings);
      cache.clear();
      compiler.compileAllLoaded(null, annotatedComponent, cloned);
    }
    function compileWithBindings() {
      var cloned = DOM.clone(templateWithBindings);
      cache.clear();
      compiler.compileAllLoaded(null, annotatedComponent, cloned);
    }
    bindAction('#compileNoBindings', compileNoBindings);
    bindAction('#compileWithBindings', compileWithBindings);
  }
  function loadTemplate(templateId, repeatCount) {
    var template = DOM.querySelectorAll(document, ("#" + templateId))[0];
    var content = DOM.getInnerHTML(template);
    var result = '';
    for (var i = 0; i < repeatCount; i++) {
      result += content;
    }
    return DOM.createTemplate(result);
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      DOM = m.DOM;
      document = m.document;
    }, function(m) {
      isBlank = m.isBlank;
      Type = m.Type;
    }, function(m) {
      MapWrapper = m.MapWrapper;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }, function(m) {
      Parser = m.Parser;
      Lexer = m.Lexer;
      ProtoRecordRange = m.ProtoRecordRange;
    }, function(m) {
      Compiler = m.Compiler;
      CompilerCache = m.CompilerCache;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      Component = m.Component;
      Decorator = m.Decorator;
    }, function(m) {
      TemplateConfig = m.TemplateConfig;
    }, function(m) {
      reflector = m.reflector;
    }, function(m) {
      getIntParameter = m.getIntParameter;
      bindAction = m.bindAction;
    }],
    execute: function() {
      Dir0 = (function() {
        var Dir0 = function Dir0() {};
        return ($traceurRuntime.createClass)(Dir0, {}, {});
      }());
      Object.defineProperty(Dir0, "annotations", {get: function() {
          return [new Decorator({
            selector: '[dir0]',
            bind: {'attr0': 'prop'}
          })];
        }});
      Dir1 = (function() {
        var Dir1 = function Dir1(dir0) {};
        return ($traceurRuntime.createClass)(Dir1, {}, {});
      }());
      Object.defineProperty(Dir1, "annotations", {get: function() {
          return [new Decorator({
            selector: '[dir1]',
            bind: {'attr1': 'prop'}
          })];
        }});
      Object.defineProperty(Dir1, "parameters", {get: function() {
          return [[Dir0]];
        }});
      Dir2 = (function() {
        var Dir2 = function Dir2(dir1) {};
        return ($traceurRuntime.createClass)(Dir2, {}, {});
      }());
      Object.defineProperty(Dir2, "annotations", {get: function() {
          return [new Decorator({
            selector: '[dir2]',
            bind: {'attr2': 'prop'}
          })];
        }});
      Object.defineProperty(Dir2, "parameters", {get: function() {
          return [[Dir1]];
        }});
      Dir3 = (function() {
        var Dir3 = function Dir3(dir2) {};
        return ($traceurRuntime.createClass)(Dir3, {}, {});
      }());
      Object.defineProperty(Dir3, "annotations", {get: function() {
          return [new Decorator({
            selector: '[dir3]',
            bind: {'attr3': 'prop'}
          })];
        }});
      Object.defineProperty(Dir3, "parameters", {get: function() {
          return [[Dir2]];
        }});
      Dir4 = (function() {
        var Dir4 = function Dir4(dir3) {};
        return ($traceurRuntime.createClass)(Dir4, {}, {});
      }());
      Object.defineProperty(Dir4, "annotations", {get: function() {
          return [new Decorator({
            selector: '[dir4]',
            bind: {'attr4': 'prop'}
          })];
        }});
      Object.defineProperty(Dir4, "parameters", {get: function() {
          return [[Dir3]];
        }});
      BenchmarkComponent = (function() {
        var BenchmarkComponent = function BenchmarkComponent() {};
        return ($traceurRuntime.createClass)(BenchmarkComponent, {}, {});
      }());
      Object.defineProperty(BenchmarkComponent, "annotations", {get: function() {
          return [new Component({template: new TemplateConfig({directives: [Dir0, Dir1, Dir2, Dir3, Dir4]})})];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/benchmarks/src/compiler/compiler_benchmark.map

//# sourceMappingURL=./compiler_benchmark.map