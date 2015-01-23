System.register("change_detection/record", ["./record_range", "facade/lang", "facade/collection", "./array_changes", "./keyvalue_changes"], function($__export) {
  "use strict";
  var __moduleName = "change_detection/record";
  var ProtoRecordRange,
      RecordRange,
      FIELD,
      isPresent,
      isBlank,
      int,
      StringWrapper,
      FunctionWrapper,
      BaseException,
      List,
      Map,
      ListWrapper,
      MapWrapper,
      ArrayChanges,
      KeyValueChanges,
      _fresh,
      RECORD_TYPE_MASK,
      RECORD_TYPE_CONST,
      RECORD_TYPE_INVOKE_CLOSURE,
      RECORD_TYPE_INVOKE_FORMATTER,
      RECORD_TYPE_INVOKE_METHOD,
      RECORD_TYPE_INVOKE_PURE_FUNCTION,
      RECORD_TYPE_ARRAY,
      RECORD_TYPE_KEY_VALUE,
      RECORD_TYPE_MARKER,
      RECORD_TYPE_PROPERTY,
      RECORD_TYPE_NULL,
      RECORD_FLAG_DISABLED,
      RECORD_FLAG_IMPLICIT_RECEIVER,
      RECORD_FLAG_COLLECTION,
      ProtoRecord,
      Record,
      _RecordInspect,
      ChangeDetectionError;
  function _inspect(record) {
    function mode() {
      switch (record.getType()) {
        case RECORD_TYPE_PROPERTY:
          return "property";
        case RECORD_TYPE_INVOKE_METHOD:
          return "invoke_method";
        case RECORD_TYPE_INVOKE_CLOSURE:
          return "invoke_closure";
        case RECORD_TYPE_INVOKE_PURE_FUNCTION:
          return "pure_function";
        case RECORD_TYPE_INVOKE_FORMATTER:
          return "invoke_formatter";
        case RECORD_TYPE_CONST:
          return "const";
        case RECORD_TYPE_KEY_VALUE:
          return "key_value";
        case RECORD_TYPE_ARRAY:
          return "array";
        case RECORD_TYPE_NULL:
          return "null";
        case RECORD_TYPE_MARKER:
          return "marker";
        default:
          return "unexpected type!";
      }
    }
    function disabled() {
      return record.isDisabled() ? "disabled" : "enabled";
    }
    function description() {
      var name = isPresent(record.protoRecord) ? record.protoRecord.name : "";
      var exp = isPresent(record.protoRecord) ? record.protoRecord.expressionAsString : "";
      var currValue = record.currentValue;
      var context = record.context;
      return (mode() + ", " + name + ", " + disabled() + " ") + (" Current: " + currValue + ", Context: " + context + " in [" + exp + "]");
    }
    if (isBlank(record))
      return null;
    if (!(record instanceof Record))
      return record;
    return new _RecordInspect(description(), record);
  }
  function isSame(a, b) {
    if (a === b)
      return true;
    if ((a !== a) && (b !== b))
      return true;
    return false;
  }
  return {
    setters: [function(m) {
      ProtoRecordRange = m.ProtoRecordRange;
      RecordRange = m.RecordRange;
    }, function(m) {
      FIELD = m.FIELD;
      isPresent = m.isPresent;
      isBlank = m.isBlank;
      int = m.int;
      StringWrapper = m.StringWrapper;
      FunctionWrapper = m.FunctionWrapper;
      BaseException = m.BaseException;
    }, function(m) {
      List = m.List;
      Map = m.Map;
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
    }, function(m) {
      ArrayChanges = m.ArrayChanges;
    }, function(m) {
      KeyValueChanges = m.KeyValueChanges;
    }],
    execute: function() {
      _fresh = new Object();
      RECORD_TYPE_MASK = 0x000f;
      RECORD_TYPE_CONST = $__export("RECORD_TYPE_CONST", 0x0000);
      RECORD_TYPE_INVOKE_CLOSURE = $__export("RECORD_TYPE_INVOKE_CLOSURE", 0x0001);
      RECORD_TYPE_INVOKE_FORMATTER = $__export("RECORD_TYPE_INVOKE_FORMATTER", 0x0002);
      RECORD_TYPE_INVOKE_METHOD = $__export("RECORD_TYPE_INVOKE_METHOD", 0x0003);
      RECORD_TYPE_INVOKE_PURE_FUNCTION = $__export("RECORD_TYPE_INVOKE_PURE_FUNCTION", 0x0004);
      RECORD_TYPE_ARRAY = 0x0005;
      RECORD_TYPE_KEY_VALUE = 0x0006;
      RECORD_TYPE_MARKER = 0x0007;
      RECORD_TYPE_PROPERTY = $__export("RECORD_TYPE_PROPERTY", 0x0008);
      RECORD_TYPE_NULL = 0x0009;
      RECORD_FLAG_DISABLED = 0x0100;
      RECORD_FLAG_IMPLICIT_RECEIVER = $__export("RECORD_FLAG_IMPLICIT_RECEIVER", 0x0200);
      RECORD_FLAG_COLLECTION = $__export("RECORD_FLAG_COLLECTION", 0x0400);
      ProtoRecord = $__export("ProtoRecord", (function() {
        var ProtoRecord = function ProtoRecord(recordRange, mode, funcOrValue, arity, name, dest, groupMemento, expressionAsString) {
          this.recordRange = recordRange;
          this._mode = mode;
          this.funcOrValue = funcOrValue;
          this.arity = arity;
          this.name = name;
          this.dest = dest;
          this.groupMemento = groupMemento;
          this.expressionAsString = expressionAsString;
          this.next = null;
          this.recordInConstruction = null;
        };
        return ($traceurRuntime.createClass)(ProtoRecord, {setIsImplicitReceiver: function() {
            this._mode |= RECORD_FLAG_IMPLICIT_RECEIVER;
          }}, {});
      }()));
      Object.defineProperty(ProtoRecord, "parameters", {get: function() {
          return [[ProtoRecordRange], [int], [], [int], [$traceurRuntime.type.string], [], [], [$traceurRuntime.type.string]];
        }});
      Record = $__export("Record", (function() {
        var Record = function Record(recordRange, protoRecord, formatters) {
          this.recordRange = recordRange;
          this.protoRecord = protoRecord;
          this.next = null;
          this.prev = null;
          this.nextEnabled = null;
          this.prevEnabled = null;
          this.dest = null;
          this.previousValue = null;
          this.context = null;
          this.funcOrValue = null;
          this.args = null;
          if (isBlank(protoRecord)) {
            this._mode = RECORD_TYPE_MARKER | RECORD_FLAG_DISABLED;
            return ;
          }
          this._mode = protoRecord._mode;
          if (this.isCollection())
            return ;
          this.currentValue = _fresh;
          var type = this.getType();
          if (type === RECORD_TYPE_CONST) {
            this.funcOrValue = protoRecord.funcOrValue;
          } else if (type === RECORD_TYPE_INVOKE_PURE_FUNCTION) {
            this.funcOrValue = protoRecord.funcOrValue;
            this.args = ListWrapper.createFixedSize(protoRecord.arity);
          } else if (type === RECORD_TYPE_INVOKE_FORMATTER) {
            this.funcOrValue = MapWrapper.get(formatters, protoRecord.funcOrValue);
            this.args = ListWrapper.createFixedSize(protoRecord.arity);
          } else if (type === RECORD_TYPE_INVOKE_METHOD) {
            this.funcOrValue = protoRecord.funcOrValue;
            this.args = ListWrapper.createFixedSize(protoRecord.arity);
          } else if (type === RECORD_TYPE_INVOKE_CLOSURE) {
            this.args = ListWrapper.createFixedSize(protoRecord.arity);
          } else if (type === RECORD_TYPE_PROPERTY) {
            this.funcOrValue = protoRecord.funcOrValue;
          }
        };
        return ($traceurRuntime.createClass)(Record, {
          getType: function() {
            return this._mode & RECORD_TYPE_MASK;
          },
          setType: function(value) {
            this._mode = (this._mode & ~RECORD_TYPE_MASK) | value;
          },
          isDisabled: function() {
            return (this._mode & RECORD_FLAG_DISABLED) === RECORD_FLAG_DISABLED;
          },
          isEnabled: function() {
            return !this.isDisabled();
          },
          _setDisabled: function(value) {
            if (value) {
              this._mode |= RECORD_FLAG_DISABLED;
            } else {
              this._mode &= ~RECORD_FLAG_DISABLED;
            }
          },
          enable: function() {
            if (this.isEnabled())
              return ;
            var prevEnabled = this.findPrevEnabled();
            var nextEnabled = this.findNextEnabled();
            this.prevEnabled = prevEnabled;
            this.nextEnabled = nextEnabled;
            if (isPresent(prevEnabled))
              prevEnabled.nextEnabled = this;
            if (isPresent(nextEnabled))
              nextEnabled.prevEnabled = this;
            this._setDisabled(false);
          },
          disable: function() {
            var prevEnabled = this.prevEnabled;
            var nextEnabled = this.nextEnabled;
            if (isPresent(prevEnabled))
              prevEnabled.nextEnabled = nextEnabled;
            if (isPresent(nextEnabled))
              nextEnabled.prevEnabled = prevEnabled;
            this._setDisabled(true);
          },
          isImplicitReceiver: function() {
            return (this._mode & RECORD_FLAG_IMPLICIT_RECEIVER) === RECORD_FLAG_IMPLICIT_RECEIVER;
          },
          isCollection: function() {
            return (this._mode & RECORD_FLAG_COLLECTION) === RECORD_FLAG_COLLECTION;
          },
          check: function() {
            if (this.isCollection()) {
              return this._checkCollection();
            } else {
              return this._checkSingleRecord();
            }
          },
          _checkSingleRecord: function() {
            this.previousValue = this.currentValue;
            this.currentValue = this._calculateNewValue();
            if (isSame(this.previousValue, this.currentValue))
              return false;
            this._updateDestination();
            return true;
          },
          _updateDestination: function() {
            if (this.dest instanceof Record) {
              if (isPresent(this.protoRecord.dest.position)) {
                this.dest.updateArg(this.currentValue, this.protoRecord.dest.position);
              } else {
                this.dest.updateContext(this.currentValue);
              }
            }
          },
          _checkCollection: function() {
            switch (this.getType()) {
              case RECORD_TYPE_KEY_VALUE:
                var kvChangeDetector = this.currentValue;
                return kvChangeDetector.check(this.context);
              case RECORD_TYPE_ARRAY:
                var arrayChangeDetector = this.currentValue;
                return arrayChangeDetector.check(this.context);
              case RECORD_TYPE_NULL:
                this.disable();
                this.currentValue = null;
                return true;
              default:
                throw new BaseException(("Unsupported record type (" + this.getType() + ")"));
            }
          },
          _calculateNewValue: function() {
            try {
              return this.__calculateNewValue();
            } catch (e) {
              throw new ChangeDetectionError(this, e);
            }
          },
          __calculateNewValue: function() {
            switch (this.getType()) {
              case RECORD_TYPE_PROPERTY:
                var propertyGetter = this.funcOrValue;
                return propertyGetter(this.context);
              case RECORD_TYPE_INVOKE_METHOD:
                var methodInvoker = this.funcOrValue;
                return methodInvoker(this.context, this.args);
              case RECORD_TYPE_INVOKE_CLOSURE:
                return FunctionWrapper.apply(this.context, this.args);
              case RECORD_TYPE_INVOKE_PURE_FUNCTION:
              case RECORD_TYPE_INVOKE_FORMATTER:
                this.disable();
                return FunctionWrapper.apply(this.funcOrValue, this.args);
              case RECORD_TYPE_CONST:
                this.disable();
                return this.funcOrValue;
              default:
                throw new BaseException(("Unsupported record type (" + this.getType() + ")"));
            }
          },
          updateArg: function(value, position) {
            this.args[position] = value;
            this.enable();
          },
          updateContext: function(value) {
            this.context = value;
            this.enable();
            if (this.isCollection()) {
              if (ArrayChanges.supports(value)) {
                if (this.getType() != RECORD_TYPE_ARRAY) {
                  this.setType(RECORD_TYPE_ARRAY);
                  this.currentValue = new ArrayChanges();
                }
                return ;
              }
              if (KeyValueChanges.supports(value)) {
                if (this.getType() != RECORD_TYPE_KEY_VALUE) {
                  this.setType(RECORD_TYPE_KEY_VALUE);
                  this.currentValue = new KeyValueChanges();
                }
                return ;
              }
              if (isBlank(value)) {
                this.setType(RECORD_TYPE_NULL);
              } else {
                throw new BaseException("Collection records must be array like, map like or null");
              }
            }
          },
          terminatesExpression: function() {
            return !(this.dest instanceof Record);
          },
          isMarkerRecord: function() {
            return this.getType() == RECORD_TYPE_MARKER;
          },
          expressionMemento: function() {
            return this.protoRecord.dest;
          },
          expressionAsString: function() {
            return this.protoRecord.expressionAsString;
          },
          groupMemento: function() {
            return isPresent(this.protoRecord) ? this.protoRecord.groupMemento : null;
          },
          findNextEnabled: function() {
            if (this.isEnabled())
              return this.nextEnabled;
            var record = this.next;
            while (isPresent(record) && record.isDisabled()) {
              if (record.isMarkerRecord() && record.recordRange.disabled) {
                record = record.recordRange.tailRecord.next;
              } else {
                record = record.next;
              }
            }
            return record;
          },
          findPrevEnabled: function() {
            if (this.isEnabled())
              return this.prevEnabled;
            var record = this.prev;
            while (isPresent(record) && record.isDisabled()) {
              if (record.isMarkerRecord() && record.recordRange.disabled) {
                record = record.recordRange.headRecord.prev;
              } else {
                record = record.prev;
              }
            }
            return record;
          },
          inspect: function() {
            return _inspect(this);
          },
          inspectRange: function() {
            return this.recordRange.inspect();
          }
        }, {createMarker: function(rr) {
            return new Record(rr, null, null);
          }});
      }()));
      Object.defineProperty(Record, "parameters", {get: function() {
          return [[RecordRange], [ProtoRecord], [Map]];
        }});
      Object.defineProperty(Record.prototype.setType, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(Record.prototype._setDisabled, "parameters", {get: function() {
          return [[$traceurRuntime.type.boolean]];
        }});
      Object.defineProperty(Record.createMarker, "parameters", {get: function() {
          return [[RecordRange]];
        }});
      Object.defineProperty(Record.prototype.updateArg, "parameters", {get: function() {
          return [[], [int]];
        }});
      Object.defineProperty(_inspect, "parameters", {get: function() {
          return [[Record]];
        }});
      _RecordInspect = (function() {
        var _RecordInspect = function _RecordInspect(description, record) {
          this.description = description;
          this.record = record;
        };
        return ($traceurRuntime.createClass)(_RecordInspect, {
          get next() {
            return _inspect(this.record.next);
          },
          get nextEnabled() {
            return _inspect(this.record.nextEnabled);
          },
          get dest() {
            return _inspect(this.record.dest);
          }
        }, {});
      }());
      Object.defineProperty(_RecordInspect, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], [Record]];
        }});
      ChangeDetectionError = $__export("ChangeDetectionError", (function($__super) {
        var ChangeDetectionError = function ChangeDetectionError(record, originalException) {
          this.originalException = originalException;
          this.location = record.protoRecord.expressionAsString;
          this.message = (this.originalException + " in [" + this.location + "]");
        };
        return ($traceurRuntime.createClass)(ChangeDetectionError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(Error)));
      Object.defineProperty(ChangeDetectionError, "parameters", {get: function() {
          return [[Record], [$traceurRuntime.type.any]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/change_detection/src/record.map

//# sourceMappingURL=./record.map