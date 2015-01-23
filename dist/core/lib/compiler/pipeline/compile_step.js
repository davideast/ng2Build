System.register("core/compiler/pipeline/compile_step", ["./compile_element", "./compile_control", "../directive_metadata"], function($__export) {
  "use strict";
  var __moduleName = "core/compiler/pipeline/compile_step";
  var CompileElement,
      CompileControl,
      DirectiveMetadata,
      CompileStep;
  return {
    setters: [function(m) {
      CompileElement = m.CompileElement;
    }, function(m) {
      CompileControl = m.CompileControl;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }],
    execute: function() {
      CompileStep = $__export("CompileStep", (function() {
        var CompileStep = function CompileStep() {};
        return ($traceurRuntime.createClass)(CompileStep, {process: function(parent, current, control) {}}, {});
      }()));
      Object.defineProperty(CompileStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/compiler/pipeline/compile_step.map

//# sourceMappingURL=./compile_step.map