System.register("change_detection/change_detection", ["./change_detector", "./parser/ast", "./parser/lexer", "./parser/parser", "./record_range", "./record", "./parser/context_with_variable_bindings"], function($__export) {
  "use strict";
  var __moduleName = "change_detection/change_detection";
  return {
    setters: [function(m) {
      $__export("ChangeDetectionError", m.ChangeDetectionError);
      $__export("ChangeDetector", m.ChangeDetector);
    }, function(m) {
      $__export("AST", m.AST);
      $__export("ASTWithSource", m.ASTWithSource);
    }, function(m) {
      $__export("Lexer", m.Lexer);
    }, function(m) {
      $__export("Parser", m.Parser);
    }, function(m) {
      $__export("ProtoRecordRange", m.ProtoRecordRange);
      $__export("RecordRange", m.RecordRange);
      $__export("ChangeDispatcher", m.ChangeDispatcher);
    }, function(m) {
      $__export("ProtoRecord", m.ProtoRecord);
      $__export("Record", m.Record);
    }, function(m) {
      $__export("ContextWithVariableBindings", m.ContextWithVariableBindings);
    }],
    execute: function() {}
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/change_detection/src/change_detection.map

//# sourceMappingURL=./change_detection.map