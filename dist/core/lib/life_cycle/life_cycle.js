System.register("core/life_cycle/life_cycle", ["facade/lang", "change_detection/change_detection", "core/zone/vm_turn_zone", "facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "core/life_cycle/life_cycle";
  var FIELD,
      print,
      ChangeDetector,
      VmTurnZone,
      ListWrapper,
      LifeCycle;
  return {
    setters: [function(m) {
      FIELD = m.FIELD;
      print = m.print;
    }, function(m) {
      ChangeDetector = m.ChangeDetector;
    }, function(m) {
      VmTurnZone = m.VmTurnZone;
    }, function(m) {
      ListWrapper = m.ListWrapper;
    }],
    execute: function() {
      LifeCycle = $__export("LifeCycle", (function() {
        var LifeCycle = function LifeCycle(changeDetector) {
          this._changeDetector = changeDetector;
        };
        return ($traceurRuntime.createClass)(LifeCycle, {
          registerWith: function(zone) {
            var $__0 = this;
            var errorHandler = (function(exception, stackTrace) {
              var longStackTrace = ListWrapper.join(stackTrace, "\n\n-----async gap-----\n");
              print((exception + "\n\n" + longStackTrace));
              throw exception;
            });
            zone.initCallbacks({
              onErrorHandler: errorHandler,
              onTurnDone: (function() {
                return $__0.tick();
              })
            });
          },
          tick: function() {
            this._changeDetector.detectChanges();
          }
        }, {});
      }()));
      Object.defineProperty(LifeCycle, "parameters", {get: function() {
          return [[ChangeDetector]];
        }});
      Object.defineProperty(LifeCycle.prototype.registerWith, "parameters", {get: function() {
          return [[VmTurnZone]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/life_cycle/life_cycle.map

//# sourceMappingURL=./life_cycle.map