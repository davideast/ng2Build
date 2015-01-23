System.register("core/compiler/shadow_dom", ["./shadow_dom_strategy"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/shadow_dom";
  var EmulatedShadowDomStrategy,
      NativeShadowDomStrategy,
      ShadowDomEmulated,
      ShadowDomNative;
  var $__exportNames = {
    ShadowDomEmulated: true,
    ShadowDomNative: true
  };
  return {
    setters: [function(m) {
      EmulatedShadowDomStrategy = m.EmulatedShadowDomStrategy;
      NativeShadowDomStrategy = m.NativeShadowDomStrategy;
      Object.keys(m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, m[p]);
      });
    }],
    execute: function() {
      ShadowDomEmulated = $__export("ShadowDomEmulated", new EmulatedShadowDomStrategy());
      ShadowDomNative = $__export("ShadowDomNative", new NativeShadowDomStrategy());
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/shadow_dom.map

//# sourceMappingURL=./shadow_dom.map