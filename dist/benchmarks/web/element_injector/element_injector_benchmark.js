System.register("benchmarks/element_injector/element_injector_benchmark", ["reflection/reflection", "di/di", "core/compiler/element_injector", "e2e_test_lib/benchmark_util"], function($__export) {
  "use strict";
  var __moduleName = "benchmarks/element_injector/element_injector_benchmark";
  var reflector,
      Injector,
      ProtoElementInjector,
      getIntParameter,
      bindAction,
      count,
      A,
      B,
      C;
  function setupReflector() {
    reflector.registerType(A, {
      'factory': (function() {
        return new A();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(B, {
      'factory': (function() {
        return new B();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(C, {
      'factory': (function(a, b) {
        return new C(a, b);
      }),
      'parameters': [[A], [B]],
      'annotations': []
    });
  }
  function main() {
    var iterations = getIntParameter('iterations');
    setupReflector();
    var appInjector = new Injector([]);
    var bindings = [A, B, C];
    var proto = new ProtoElementInjector(null, 0, bindings);
    var elementInjector = proto.instantiate(null, null);
    function instantiate() {
      for (var i = 0; i < iterations; ++i) {
        var ei = proto.instantiate(null, null);
        ei.instantiateDirectives(appInjector, null, null);
      }
    }
    function instantiateDirectives() {
      for (var i = 0; i < iterations; ++i) {
        elementInjector.clearDirectives();
        elementInjector.instantiateDirectives(appInjector, null, null);
      }
    }
    bindAction('#instantiate', instantiate);
    bindAction('#instantiateDirectives', instantiateDirectives);
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      reflector = m.reflector;
    }, function(m) {
      Injector = m.Injector;
    }, function(m) {
      ProtoElementInjector = m.ProtoElementInjector;
    }, function(m) {
      getIntParameter = m.getIntParameter;
      bindAction = m.bindAction;
    }],
    execute: function() {
      count = 0;
      A = (function() {
        var A = function A() {
          count++;
        };
        return ($traceurRuntime.createClass)(A, {}, {});
      }());
      B = (function() {
        var B = function B() {
          count++;
        };
        return ($traceurRuntime.createClass)(B, {}, {});
      }());
      C = (function() {
        var C = function C(a, b) {
          count++;
        };
        return ($traceurRuntime.createClass)(C, {}, {});
      }());
      Object.defineProperty(C, "parameters", {get: function() {
          return [[A], [B]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/benchmarks/src/element_injector/element_injector_benchmark.map

//# sourceMappingURL=./element_injector_benchmark.map