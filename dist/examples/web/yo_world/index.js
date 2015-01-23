System.register("examples/yo_world/index", ["./index_common", "reflection/reflection", "reflection/reflection_capabilities"], function($__export) {
  "use strict";
  var __moduleName = "examples/yo_world/index";
  var app,
      reflector,
      ReflectionCapabilities;
  function main() {
    reflector.reflectionCapabilities = new ReflectionCapabilities();
    app.main();
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      app = m;
    }, function(m) {
      reflector = m.reflector;
    }, function(m) {
      ReflectionCapabilities = m.ReflectionCapabilities;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/examples/src/yo_world/index.map

//# sourceMappingURL=./index.map