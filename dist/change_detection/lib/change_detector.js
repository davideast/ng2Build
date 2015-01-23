System.register("change_detection/change_detector", ["./record_range", "./record", "facade/lang", "facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "change_detection/change_detector";
  var ProtoRecordRange,
      RecordRange,
      ProtoRecord,
      Record,
      int,
      isPresent,
      isBlank,
      ListWrapper,
      List,
      ExpressionChangedAfterItHasBeenChecked,
      ChangeDetector,
      _singleElementList;
  var $__exportNames = {ChangeDetector: true};
  var $__exportNames = {ChangeDetector: true};
  return {
    setters: [function(m) {
      ProtoRecordRange = m.ProtoRecordRange;
      RecordRange = m.RecordRange;
      Object.keys(m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, m[p]);
      });
    }, function(m) {
      ProtoRecord = m.ProtoRecord;
      Record = m.Record;
      Object.keys(m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, m[p]);
      });
    }, function(m) {
      int = m.int;
      isPresent = m.isPresent;
      isBlank = m.isBlank;
    }, function(m) {
      ListWrapper = m.ListWrapper;
      List = m.List;
    }],
    execute: function() {
      ExpressionChangedAfterItHasBeenChecked = (function($__super) {
        var ExpressionChangedAfterItHasBeenChecked = function ExpressionChangedAfterItHasBeenChecked(record) {
          this.message = ("Expression '" + record.expressionAsString() + "' has changed after it was checked. ") + ("Previous value: '" + record.previousValue + "'. Current value: '" + record.currentValue + "'");
        };
        return ($traceurRuntime.createClass)(ExpressionChangedAfterItHasBeenChecked, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(Error));
      Object.defineProperty(ExpressionChangedAfterItHasBeenChecked, "parameters", {get: function() {
          return [[Record]];
        }});
      ChangeDetector = $__export("ChangeDetector", (function() {
        var ChangeDetector = function ChangeDetector(recordRange) {
          var enforceNoNewChanges = arguments[1] !== (void 0) ? arguments[1] : false;
          this._rootRecordRange = recordRange;
          this._enforceNoNewChanges = enforceNoNewChanges;
        };
        return ($traceurRuntime.createClass)(ChangeDetector, {
          detectChanges: function() {
            var count = this._detectChanges(false);
            if (this._enforceNoNewChanges) {
              this._detectChanges(true);
            }
            return count;
          },
          _detectChanges: function(throwOnChange) {
            var count = 0;
            var updatedRecords = null;
            var record = this._rootRecordRange.findFirstEnabledRecord();
            var currentRange,
                currentGroup;
            while (isPresent(record)) {
              if (record.check()) {
                count++;
                if (record.terminatesExpression()) {
                  if (throwOnChange)
                    throw new ExpressionChangedAfterItHasBeenChecked(record);
                  currentRange = record.recordRange;
                  currentGroup = record.groupMemento();
                  updatedRecords = this._addRecord(updatedRecords, record);
                }
              }
              if (isPresent(updatedRecords)) {
                var nextEnabled = record.nextEnabled;
                if (isBlank(nextEnabled) || currentRange !== nextEnabled.recordRange || currentGroup !== nextEnabled.groupMemento()) {
                  currentRange.dispatcher.onRecordChange(currentGroup, updatedRecords);
                  updatedRecords = null;
                }
              }
              record = record.findNextEnabled();
            }
            return count;
          },
          _addRecord: function(updatedRecords, record) {
            if (isBlank(updatedRecords)) {
              updatedRecords = _singleElementList;
              updatedRecords[0] = record;
            } else if (updatedRecords === _singleElementList) {
              updatedRecords = [_singleElementList[0], record];
            } else {
              ListWrapper.push(updatedRecords, record);
            }
            return updatedRecords;
          }
        }, {});
      }()));
      Object.defineProperty(ChangeDetector, "parameters", {get: function() {
          return [[RecordRange], [$traceurRuntime.type.boolean]];
        }});
      Object.defineProperty(ChangeDetector.prototype._detectChanges, "parameters", {get: function() {
          return [[$traceurRuntime.type.boolean]];
        }});
      Object.defineProperty(ChangeDetector.prototype._addRecord, "parameters", {get: function() {
          return [[List], [Record]];
        }});
      _singleElementList = [null];
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/change_detection/src/change_detector.map

//# sourceMappingURL=./change_detector.map