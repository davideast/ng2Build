System.register("di/di", ["./annotations", "./injector", "./binding", "./key", "./exceptions", "./opaque_token"], function($__export) {
  "use strict";
  var __moduleName = "di/di";
  return {
    setters: [function(m) {
      $__export("Inject", m.Inject);
      $__export("InjectPromise", m.InjectPromise);
      $__export("InjectLazy", m.InjectLazy);
      $__export("DependencyAnnotation", m.DependencyAnnotation);
    }, function(m) {
      $__export("Injector", m.Injector);
    }, function(m) {
      $__export("Binding", m.Binding);
      $__export("Dependency", m.Dependency);
      $__export("bind", m.bind);
    }, function(m) {
      $__export("Key", m.Key);
      $__export("KeyRegistry", m.KeyRegistry);
    }, function(m) {
      $__export("KeyMetadataError", m.KeyMetadataError);
      $__export("NoProviderError", m.NoProviderError);
      $__export("ProviderError", m.ProviderError);
      $__export("AsyncBindingError", m.AsyncBindingError);
      $__export("CyclicDependencyError", m.CyclicDependencyError);
      $__export("InstantiationError", m.InstantiationError);
      $__export("InvalidBindingError", m.InvalidBindingError);
      $__export("NoAnnotationError", m.NoAnnotationError);
    }, function(m) {
      $__export("OpaqueToken", m.OpaqueToken);
    }],
    execute: function() {}
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/di/src/di.map

//# sourceMappingURL=./di.map