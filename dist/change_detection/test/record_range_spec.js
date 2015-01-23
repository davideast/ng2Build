System.register("change_detection/test/record_range_spec", ["test_lib/test_lib", "change_detection/parser/parser", "change_detection/parser/lexer", "facade/collection", "facade/lang", "change_detection/change_detector", "change_detection/record"], function($__export) {
  "use strict";
  var __moduleName = "change_detection/test/record_range_spec";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      Parser,
      Lexer,
      List,
      ListWrapper,
      MapWrapper,
      isPresent,
      ChangeDetector,
      ProtoRecordRange,
      RecordRange,
      ProtoRecord,
      RECORD_TYPE_CONST,
      Record;
  function main() {
    var lookupName = (function(names, item) {
      return ListWrapper.last(ListWrapper.find(names, (function(pair) {
        return pair[0] === item;
      })));
    });
    function enabledRecordsInReverseOrder(rr, names) {
      var reversed = [];
      var record = rr.findLastEnabledRecord();
      while (isPresent(record)) {
        ListWrapper.push(reversed, lookupName(names, record));
        record = record.prevEnabled;
      }
      return reversed;
    }
    Object.defineProperty(enabledRecordsInReverseOrder, "parameters", {get: function() {
        return [[RecordRange], [List]];
      }});
    function enabledRecords(rr, names) {
      var res = [];
      var record = rr.findFirstEnabledRecord();
      while (isPresent(record)) {
        ListWrapper.push(res, lookupName(names, record));
        record = record.nextEnabled;
      }
      var reversed = enabledRecordsInReverseOrder(rr, names);
      expect(res).toEqual(ListWrapper.reversed(reversed));
      return res;
    }
    Object.defineProperty(enabledRecords, "parameters", {get: function() {
        return [[RecordRange], [List]];
      }});
    function createRecord(rr) {
      return new Record(rr, new ProtoRecord(null, 0, null, null, null, null, null, null), null);
    }
    describe('record range', (function() {
      it('should add records', (function() {
        var rr = new RecordRange(null, null);
        var record1 = createRecord(rr);
        var record2 = createRecord(rr);
        rr.addRecord(record1);
        rr.addRecord(record2);
        expect(enabledRecords(rr, [[record1, 'record1'], [record2, 'record2']])).toEqual(['record1', 'record2']);
      }));
      describe('adding/removing record ranges', (function() {
        var parent,
            child1,
            child2,
            child3;
        var childRecord1,
            childRecord2,
            childRecord3;
        var recordNames;
        beforeEach((function() {
          parent = new RecordRange(null, null);
          child1 = new RecordRange(null, null);
          childRecord1 = createRecord(child1);
          child1.addRecord(childRecord1);
          child2 = new RecordRange(null, null);
          childRecord2 = createRecord(child2);
          child2.addRecord(childRecord2);
          child3 = new RecordRange(null, null);
          childRecord3 = createRecord(child3);
          child3.addRecord(childRecord3);
          recordNames = [[childRecord1, 'record1'], [childRecord2, 'record2'], [childRecord3, 'record3']];
        }));
        it('should add record ranges', (function() {
          parent.addRange(child1);
          parent.addRange(child2);
          expect(enabledRecords(parent, recordNames)).toEqual(['record1', 'record2']);
        }));
        it('should handle adding an empty range', (function() {
          var emptyRange = new RecordRange(null, null);
          parent.addRange(child1);
          parent.addRange(child2);
          child1.addRange(emptyRange);
          expect(enabledRecords(parent, recordNames)).toEqual(['record1', 'record2']);
        }));
        it('should handle enabling/disabling an empty range', (function() {
          var emptyRange = new RecordRange(null, null);
          emptyRange.disable();
          emptyRange.enable();
          expect(enabledRecords(emptyRange, recordNames)).toEqual([]);
        }));
        it('should handle adding a range into an empty range', (function() {
          var emptyRange = new RecordRange(null, null);
          parent.addRange(emptyRange);
          parent.addRange(child2);
          emptyRange.addRange(child1);
          expect(enabledRecords(parent, recordNames)).toEqual(['record1', 'record2']);
        }));
        it('should add nested record ranges', (function() {
          parent.addRange(child1);
          child1.addRange(child2);
          expect(enabledRecords(parent, recordNames)).toEqual(['record1', 'record2']);
        }));
        it('should remove record ranges', (function() {
          parent.addRange(child1);
          parent.addRange(child2);
          child1.remove();
          expect(enabledRecords(parent, recordNames)).toEqual(['record2']);
          child2.remove();
          expect(enabledRecords(parent, recordNames)).toEqual([]);
        }));
        it('should remove an empty record range', (function() {
          var emptyRange = new RecordRange(null, null);
          parent.addRange(child1);
          parent.addRange(emptyRange);
          parent.addRange(child2);
          emptyRange.remove();
          expect(enabledRecords(parent, recordNames)).toEqual(['record1', 'record2']);
        }));
        it('should remove a record range surrounded by other ranges', (function() {
          parent.addRange(child1);
          parent.addRange(child2);
          parent.addRange(child3);
          child2.remove();
          expect(enabledRecords(parent, recordNames)).toEqual(['record1', 'record3']);
        }));
      }));
      describe('enabling/disabling records', (function() {
        var rr;
        var record1,
            record2,
            record3,
            record4;
        var recordNames;
        beforeEach((function() {
          rr = new RecordRange(null, null);
          record1 = createRecord(rr);
          record2 = createRecord(rr);
          record3 = createRecord(rr);
          record4 = createRecord(rr);
          recordNames = [[record1, 'record1'], [record2, 'record2'], [record3, 'record3'], [record4, 'record4']];
        }));
        it('should disable a single record', (function() {
          rr.addRecord(record1);
          record1.disable();
          expect(enabledRecords(rr, recordNames)).toEqual([]);
        }));
        it('should enable a single record', (function() {
          rr.addRecord(record1);
          record1.disable();
          record1.enable();
          expect(enabledRecords(rr, recordNames)).toEqual(['record1']);
        }));
        it('should disable a record', (function() {
          rr.addRecord(record1);
          rr.addRecord(record2);
          rr.addRecord(record3);
          rr.addRecord(record4);
          record2.disable();
          record3.disable();
          expect(record2.isDisabled()).toBeTruthy();
          expect(record3.isDisabled()).toBeTruthy();
          expect(enabledRecords(rr, recordNames)).toEqual(['record1', 'record4']);
        }));
        it('should enable a record', (function() {
          rr.addRecord(record1);
          rr.addRecord(record2);
          rr.addRecord(record3);
          rr.addRecord(record4);
          record2.disable();
          record3.disable();
          record2.enable();
          record3.enable();
          expect(enabledRecords(rr, recordNames)).toEqual(['record1', 'record2', 'record3', 'record4']);
        }));
        it('should disable a single record in a range', (function() {
          var rr1 = new RecordRange(null, null);
          rr1.addRecord(record1);
          var rr2 = new RecordRange(null, null);
          rr2.addRecord(record2);
          var rr3 = new RecordRange(null, null);
          rr3.addRecord(record3);
          rr.addRange(rr1);
          rr.addRange(rr2);
          rr.addRange(rr3);
          record2.disable();
          expect(enabledRecords(rr, recordNames)).toEqual(['record1', 'record3']);
          record2.enable();
          expect(enabledRecords(rr, recordNames)).toEqual(['record1', 'record2', 'record3']);
        }));
      }));
      describe('enabling/disabling record ranges', (function() {
        var child1,
            child2,
            child3,
            child4;
        var record1,
            record2,
            record3,
            record4;
        var recordNames;
        beforeEach((function() {
          child1 = new RecordRange(null, null);
          record1 = createRecord(child1);
          child1.addRecord(record1);
          child2 = new RecordRange(null, null);
          record2 = createRecord(child2);
          child2.addRecord(record2);
          child3 = new RecordRange(null, null);
          record3 = createRecord(child3);
          child3.addRecord(record3);
          child4 = new RecordRange(null, null);
          record4 = createRecord(child4);
          child4.addRecord(record4);
          recordNames = [[record1, 'record1'], [record2, 'record2'], [record3, 'record3'], [record4, 'record4']];
        }));
        it('should disable a single record range', (function() {
          var parent = new RecordRange(null, null);
          parent.addRange(child1);
          child1.disable();
          expect(enabledRecords(parent, recordNames)).toEqual([]);
        }));
        it('should enable a single record range', (function() {
          var parent = new RecordRange(null, null);
          parent.addRange(child1);
          child1.disable();
          child1.enable();
          expect(enabledRecords(parent, recordNames)).toEqual(['record1']);
        }));
        it('should disable a record range', (function() {
          var parent = new RecordRange(null, null);
          parent.addRange(child1);
          parent.addRange(child2);
          parent.addRange(child3);
          parent.addRange(child4);
          child2.disable();
          child3.disable();
          expect(enabledRecords(parent, recordNames)).toEqual(['record1', 'record4']);
        }));
        it('should enable a record range', (function() {
          var parent = new RecordRange(null, null);
          parent.addRange(child1);
          parent.addRange(child2);
          parent.addRange(child3);
          parent.addRange(child4);
          child2.disable();
          child2.disable();
          child2.enable();
          child3.enable();
          expect(enabledRecords(parent, recordNames)).toEqual(['record1', 'record2', 'record3', 'record4']);
        }));
      }));
      describe("inspect", (function() {
        it("should return the description of the record", (function() {
          var proto = new ProtoRecord(null, RECORD_TYPE_CONST, 1, 0, "name", null, "group", "expression");
          var record = new Record(null, proto, null);
          var i = record.inspect();
          expect(i.description).toContain("const, name, enabled");
        }));
        it("should return the description of the records in the range", (function() {
          var proto = new ProtoRecord(null, RECORD_TYPE_CONST, 1, 0, "name", null, "group", "expression");
          var record = new Record(null, proto, null);
          var range = new RecordRange(null, null);
          range.addRecord(record);
          var i = range.inspect();
          ;
          expect(i.length).toEqual(1);
          expect(i[0]).toContain("const, name, enabled");
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      ddescribe = m.ddescribe;
      describe = m.describe;
      it = m.it;
      iit = m.iit;
      xit = m.xit;
      expect = m.expect;
      beforeEach = m.beforeEach;
    }, function(m) {
      Parser = m.Parser;
    }, function(m) {
      Lexer = m.Lexer;
    }, function(m) {
      List = m.List;
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
    }, function(m) {
      isPresent = m.isPresent;
    }, function(m) {
      ChangeDetector = m.ChangeDetector;
      ProtoRecordRange = m.ProtoRecordRange;
      RecordRange = m.RecordRange;
      ProtoRecord = m.ProtoRecord;
      RECORD_TYPE_CONST = m.RECORD_TYPE_CONST;
    }, function(m) {
      Record = m.Record;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/change_detection/test/record_range_spec.map

//# sourceMappingURL=./record_range_spec.map