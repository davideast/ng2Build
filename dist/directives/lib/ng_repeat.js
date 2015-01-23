System.register("directives/ng_repeat", ["core/annotations/annotations", "core/compiler/interfaces", "core/compiler/viewport", "core/compiler/view", "facade/lang", "facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "directives/ng_repeat";
  var Template,
      OnChange,
      ViewPort,
      View,
      isPresent,
      isBlank,
      ListWrapper,
      NgRepeat,
      RecordViewTuple;
  return {
    setters: [function(m) {
      Template = m.Template;
    }, function(m) {
      OnChange = m.OnChange;
    }, function(m) {
      ViewPort = m.ViewPort;
    }, function(m) {
      View = m.View;
    }, function(m) {
      isPresent = m.isPresent;
      isBlank = m.isBlank;
    }, function(m) {
      ListWrapper = m.ListWrapper;
    }],
    execute: function() {
      NgRepeat = $__export("NgRepeat", (function($__super) {
        var NgRepeat = function NgRepeat(viewPort) {
          this.viewPort = viewPort;
        };
        return ($traceurRuntime.createClass)(NgRepeat, {
          onChange: function(changes) {
            var iteratorChanges = changes['iterable'];
            if (isBlank(iteratorChanges) || isBlank(iteratorChanges.currentValue)) {
              this.viewPort.clear();
              return ;
            }
            var recordViewTuples = [];
            iteratorChanges.currentValue.forEachRemovedItem((function(removedRecord) {
              return ListWrapper.push(recordViewTuples, new RecordViewTuple(removedRecord, null));
            }));
            iteratorChanges.currentValue.forEachMovedItem((function(movedRecord) {
              return ListWrapper.push(recordViewTuples, new RecordViewTuple(movedRecord, null));
            }));
            var insertTuples = NgRepeat.bulkRemove(recordViewTuples, this.viewPort);
            iteratorChanges.currentValue.forEachAddedItem((function(addedRecord) {
              return ListWrapper.push(insertTuples, new RecordViewTuple(addedRecord, null));
            }));
            NgRepeat.bulkInsert(insertTuples, this.viewPort);
            for (var i = 0; i < insertTuples.length; i++) {
              this.perViewChange(insertTuples[i].view, insertTuples[i].record);
            }
          },
          perViewChange: function(view, record) {
            view.setLocal('ng-repeat', record.item);
          }
        }, {
          bulkRemove: function(tuples, viewPort) {
            tuples.sort((function(a, b) {
              return a.record.previousIndex - b.record.previousIndex;
            }));
            var movedTuples = [];
            for (var i = tuples.length - 1; i >= 0; i--) {
              var tuple = tuples[i];
              var view = viewPort.remove(tuple.record.previousIndex);
              if (isPresent(tuple.record.currentIndex)) {
                tuple.view = view;
                ListWrapper.push(movedTuples, tuple);
              }
            }
            return movedTuples;
          },
          bulkInsert: function(tuples, viewPort) {
            tuples.sort((function(a, b) {
              return a.record.currentIndex - b.record.currentIndex;
            }));
            for (var i = 0; i < tuples.length; i++) {
              var tuple = tuples[i];
              if (isPresent(tuple.view)) {
                viewPort.insert(tuple.view, tuple.record.currentIndex);
              } else {
                tuple.view = viewPort.create(tuple.record.currentIndex);
              }
            }
            return tuples;
          }
        }, $__super);
      }(OnChange)));
      Object.defineProperty(NgRepeat, "annotations", {get: function() {
          return [new Template({
            selector: '[ng-repeat]',
            bind: {'in': 'iterable[]'}
          })];
        }});
      Object.defineProperty(NgRepeat, "parameters", {get: function() {
          return [[ViewPort]];
        }});
      RecordViewTuple = (function() {
        var RecordViewTuple = function RecordViewTuple(record, view) {
          this.record = record;
          this.view = view;
        };
        return ($traceurRuntime.createClass)(RecordViewTuple, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/directives/src/ng_repeat.map

//# sourceMappingURL=./ng_repeat.map