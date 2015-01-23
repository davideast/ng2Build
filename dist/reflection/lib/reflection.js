System.register("reflection/reflection", ["facade/lang", "facade/collection", "./reflector", "./reflection_capabilities"], function($__export) {
  "use strict";
  var __moduleName = "reflection/reflection";
  var Type,
      isPresent,
      List,
      ListWrapper,
      Reflector,
      ReflectionCapabilities,
      reflector;
  return {
    setters: [function(m) {
      Type = m.Type;
      isPresent = m.isPresent;
    }, function(m) {
      List = m.List;
      ListWrapper = m.ListWrapper;
    }, function(m) {
      Reflector = m.Reflector;
      $__export("Reflector", m.Reflector);
    }, function(m) {
      ReflectionCapabilities = m.ReflectionCapabilities;
    }],
    execute: function() {
      reflector = $__export("reflector", new Reflector(new ReflectionCapabilities()));
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/reflection/src/reflection.map

//# sourceMappingURL=./reflection.map