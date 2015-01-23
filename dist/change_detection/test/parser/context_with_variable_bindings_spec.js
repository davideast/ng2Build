System.register("change_detection/test/parser/context_with_variable_bindings_spec", ["test_lib/test_lib", "change_detection/parser/context_with_variable_bindings", "facade/lang", "facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "change_detection/test/parser/context_with_variable_bindings_spec";
  var ddescribe,
      describe,
      it,
      xit,
      iit,
      expect,
      beforeEach,
      ContextWithVariableBindings,
      BaseException,
      isBlank,
      isPresent,
      MapWrapper,
      ListWrapper;
  function main() {
    describe('ContextWithVariableBindings', (function() {
      var locals;
      beforeEach((function() {
        locals = new ContextWithVariableBindings(null, MapWrapper.createFromPairs([['key', 'value'], ['nullKey', null]]));
      }));
      it('should support getting values', (function() {
        expect(locals.get('key')).toBe('value');
        var notPresentValue = locals.get('notPresent');
        expect(isPresent(notPresentValue)).toBe(false);
      }));
      it('should support checking if key is persent', (function() {
        expect(locals.hasBinding('key')).toBe(true);
        expect(locals.hasBinding('nullKey')).toBe(true);
        expect(locals.hasBinding('notPresent')).toBe(false);
      }));
      it('should support setting persent keys', (function() {
        locals.set('key', 'bar');
        expect(locals.get('key')).toBe('bar');
      }));
      it('should not support setting keys that are not present already', (function() {
        expect((function() {
          return locals.set('notPresent', 'bar');
        })).toThrowError();
      }));
      it('should clearValues', (function() {
        locals.clearValues();
        expect(locals.get('key')).toBe(null);
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      ddescribe = m.ddescribe;
      describe = m.describe;
      it = m.it;
      xit = m.xit;
      iit = m.iit;
      expect = m.expect;
      beforeEach = m.beforeEach;
    }, function(m) {
      ContextWithVariableBindings = m.ContextWithVariableBindings;
    }, function(m) {
      BaseException = m.BaseException;
      isBlank = m.isBlank;
      isPresent = m.isPresent;
    }, function(m) {
      MapWrapper = m.MapWrapper;
      ListWrapper = m.ListWrapper;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/change_detection/test/parser/context_with_variable_bindings_spec.map

//# sourceMappingURL=./context_with_variable_bindings_spec.map