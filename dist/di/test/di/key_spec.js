System.register("di/test/di/key_spec", ["test_lib/test_lib", "di/di"], function($__export) {
  "use strict";
  var __moduleName = "di/test/di/key_spec";
  var describe,
      iit,
      it,
      expect,
      beforeEach,
      Key,
      KeyRegistry;
  function main() {
    describe("key", function() {
      var registry;
      beforeEach(function() {
        registry = new KeyRegistry();
      });
      it('should be equal to another key if type is the same', function() {
        expect(registry.get('car')).toBe(registry.get('car'));
      });
      it('should not be equal to another key if types are different', function() {
        expect(registry.get('car')).not.toBe(registry.get('porsche'));
      });
      it('should return the passed in key', function() {
        expect(registry.get(registry.get('car'))).toBe(registry.get('car'));
      });
      describe("metadata", function() {
        it("should assign metadata to a key", function() {
          var key = registry.get('car');
          Key.setMetadata(key, "meta");
          expect(key.metadata).toEqual("meta");
        });
        it("should allow assigning the same metadata twice", function() {
          var key = registry.get('car');
          Key.setMetadata(key, "meta");
          Key.setMetadata(key, "meta");
          expect(key.metadata).toEqual("meta");
        });
        it("should throw when assigning different metadata", function() {
          var key = registry.get('car');
          Key.setMetadata(key, "meta1");
          expect((function() {
            return Key.setMetadata(key, "meta2");
          })).toThrowError();
        });
      });
    });
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      describe = m.describe;
      iit = m.iit;
      it = m.it;
      expect = m.expect;
      beforeEach = m.beforeEach;
    }, function(m) {
      Key = m.Key;
      KeyRegistry = m.KeyRegistry;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/di/test/di/key_spec.map

//# sourceMappingURL=./key_spec.map