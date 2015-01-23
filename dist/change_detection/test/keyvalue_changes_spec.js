System.register("change_detection/test/keyvalue_changes_spec", ["test_lib/test_lib", "change_detection/keyvalue_changes", "facade/lang", "facade/collection", "./util"], function($__export) {
  "use strict";
  var __moduleName = "change_detection/test/keyvalue_changes_spec";
  var describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      KeyValueChanges,
      NumberWrapper,
      isJsObject,
      MapWrapper,
      kvChangesAsString;
  function main() {
    describe('keyvalue_changes', function() {
      describe('KeyValueChanges', function() {
        var changes;
        var m;
        beforeEach((function() {
          changes = new KeyValueChanges();
          m = MapWrapper.create();
        }));
        afterEach((function() {
          changes = null;
        }));
        it('should detect additions', (function() {
          changes.check(m);
          MapWrapper.set(m, 'a', 1);
          changes.check(m);
          expect(changes.toString()).toEqual(kvChangesAsString({
            map: ['a[null->1]'],
            additions: ['a[null->1]']
          }));
          MapWrapper.set(m, 'b', 2);
          changes.check(m);
          expect(changes.toString()).toEqual(kvChangesAsString({
            map: ['a', 'b[null->2]'],
            previous: ['a'],
            additions: ['b[null->2]']
          }));
        }));
        it('should handle changing key/values correctly', (function() {
          MapWrapper.set(m, 1, 10);
          MapWrapper.set(m, 2, 20);
          changes.check(m);
          MapWrapper.set(m, 2, 10);
          MapWrapper.set(m, 1, 20);
          changes.check(m);
          expect(changes.toString()).toEqual(kvChangesAsString({
            map: ['1[10->20]', '2[20->10]'],
            previous: ['1[10->20]', '2[20->10]'],
            changes: ['1[10->20]', '2[20->10]']
          }));
        }));
        it('should do basic map watching', (function() {
          changes.check(m);
          MapWrapper.set(m, 'a', 'A');
          changes.check(m);
          expect(changes.toString()).toEqual(kvChangesAsString({
            map: ['a[null->A]'],
            additions: ['a[null->A]']
          }));
          MapWrapper.set(m, 'b', 'B');
          changes.check(m);
          expect(changes.toString()).toEqual(kvChangesAsString({
            map: ['a', 'b[null->B]'],
            previous: ['a'],
            additions: ['b[null->B]']
          }));
          MapWrapper.set(m, 'b', 'BB');
          MapWrapper.set(m, 'd', 'D');
          changes.check(m);
          expect(changes.toString()).toEqual(kvChangesAsString({
            map: ['a', 'b[B->BB]', 'd[null->D]'],
            previous: ['a', 'b[B->BB]'],
            additions: ['d[null->D]'],
            changes: ['b[B->BB]']
          }));
          MapWrapper.delete(m, 'b');
          changes.check(m);
          expect(changes.toString()).toEqual(kvChangesAsString({
            map: ['a', 'd'],
            previous: ['a', 'b[BB->null]', 'd'],
            removals: ['b[BB->null]']
          }));
          MapWrapper.clear(m);
          changes.check(m);
          expect(changes.toString()).toEqual(kvChangesAsString({
            previous: ['a[A->null]', 'd[D->null]'],
            removals: ['a[A->null]', 'd[D->null]']
          }));
        }));
        it('should test string by value rather than by reference (DART)', (function() {
          MapWrapper.set(m, 'foo', 'bar');
          changes.check(m);
          var f = 'f';
          var oo = 'oo';
          var b = 'b';
          var ar = 'ar';
          MapWrapper.set(m, f + oo, b + ar);
          changes.check(m);
          expect(changes.toString()).toEqual(kvChangesAsString({
            map: ['foo'],
            previous: ['foo']
          }));
        }));
        it('should not see a NaN value as a change (JS)', (function() {
          MapWrapper.set(m, 'foo', NumberWrapper.NaN);
          changes.check(m);
          changes.check(m);
          expect(changes.toString()).toEqual(kvChangesAsString({
            map: ['foo'],
            previous: ['foo']
          }));
        }));
        if (isJsObject({})) {
          describe('JsObject changes', (function() {
            it('should support JS Object', (function() {
              expect(KeyValueChanges.supports({})).toBeTruthy();
              expect(KeyValueChanges.supports("not supported")).toBeFalsy();
              expect(KeyValueChanges.supports(0)).toBeFalsy();
              expect(KeyValueChanges.supports(null)).toBeFalsy();
            }));
            it('should do basic object watching', (function() {
              m = {};
              changes.check(m);
              m['a'] = 'A';
              changes.check(m);
              expect(changes.toString()).toEqual(kvChangesAsString({
                map: ['a[null->A]'],
                additions: ['a[null->A]']
              }));
              m['b'] = 'B';
              changes.check(m);
              expect(changes.toString()).toEqual(kvChangesAsString({
                map: ['a', 'b[null->B]'],
                previous: ['a'],
                additions: ['b[null->B]']
              }));
              m['b'] = 'BB';
              m['d'] = 'D';
              changes.check(m);
              expect(changes.toString()).toEqual(kvChangesAsString({
                map: ['a', 'b[B->BB]', 'd[null->D]'],
                previous: ['a', 'b[B->BB]'],
                additions: ['d[null->D]'],
                changes: ['b[B->BB]']
              }));
              m = {};
              m['a'] = 'A';
              m['d'] = 'D';
              changes.check(m);
              expect(changes.toString()).toEqual(kvChangesAsString({
                map: ['a', 'd'],
                previous: ['a', 'b[BB->null]', 'd'],
                removals: ['b[BB->null]']
              }));
              m = {};
              changes.check(m);
              expect(changes.toString()).toEqual(kvChangesAsString({
                previous: ['a[A->null]', 'd[D->null]'],
                removals: ['a[A->null]', 'd[D->null]']
              }));
            }));
          }));
        }
      });
    });
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      describe = m.describe;
      it = m.it;
      iit = m.iit;
      xit = m.xit;
      expect = m.expect;
      beforeEach = m.beforeEach;
      afterEach = m.afterEach;
    }, function(m) {
      KeyValueChanges = m.KeyValueChanges;
    }, function(m) {
      NumberWrapper = m.NumberWrapper;
      isJsObject = m.isJsObject;
    }, function(m) {
      MapWrapper = m.MapWrapper;
    }, function(m) {
      kvChangesAsString = m.kvChangesAsString;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/change_detection/test/keyvalue_changes_spec.map

//# sourceMappingURL=./keyvalue_changes_spec.map