System.register("change_detection/record_range", ["./record", "facade/lang", "facade/collection", "./parser/context_with_variable_bindings", "./parser/ast"], function($__export) {
  "use strict";
  var __moduleName = "change_detection/record_range";
  var ProtoRecord,
      Record,
      RECORD_FLAG_COLLECTION,
      RECORD_FLAG_IMPLICIT_RECEIVER,
      RECORD_TYPE_CONST,
      RECORD_TYPE_INVOKE_CLOSURE,
      RECORD_TYPE_INVOKE_FORMATTER,
      RECORD_TYPE_INVOKE_METHOD,
      RECORD_TYPE_INVOKE_PURE_FUNCTION,
      RECORD_TYPE_PROPERTY,
      FIELD,
      IMPLEMENTS,
      isBlank,
      isPresent,
      int,
      autoConvertAdd,
      BaseException,
      NumberWrapper,
      List,
      Map,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      ContextWithVariableBindings,
      AccessMember,
      Assignment,
      AST,
      AstVisitor,
      Binary,
      Chain,
      Collection,
      Conditional,
      Formatter,
      FunctionCall,
      ImplicitReceiver,
      KeyedAccess,
      LiteralArray,
      LiteralMap,
      LiteralPrimitive,
      MethodCall,
      PrefixNot,
      ProtoRecordRange,
      RecordRange,
      ChangeDispatcher,
      Destination,
      ProtoRecordCreator;
  function _inspect(recordRange) {
    var res = [];
    for (var r = recordRange.headRecord.next; r != recordRange.tailRecord; r = r.next) {
      ListWrapper.push(res, r.inspect().description);
    }
    return res;
  }
  function _link(a, b) {
    a.next = b;
    b.prev = a;
  }
  function _linkEnabled(a, b) {
    a.nextEnabled = b;
    b.prevEnabled = a;
  }
  function _operationToFunction(operation) {
    switch (operation) {
      case '+':
        return _operation_add;
      case '-':
        return _operation_subtract;
      case '*':
        return _operation_multiply;
      case '/':
        return _operation_divide;
      case '%':
        return _operation_remainder;
      case '==':
        return _operation_equals;
      case '!=':
        return _operation_not_equals;
      case '<':
        return _operation_less_then;
      case '>':
        return _operation_greater_then;
      case '<=':
        return _operation_less_or_equals_then;
      case '>=':
        return _operation_greater_or_equals_then;
      case '&&':
        return _operation_logical_and;
      case '||':
        return _operation_logical_or;
      default:
        throw new BaseException(("Unsupported operation " + operation));
    }
  }
  function _operation_negate(value) {
    return !value;
  }
  function _operation_add(left, right) {
    return left + right;
  }
  function _operation_subtract(left, right) {
    return left - right;
  }
  function _operation_multiply(left, right) {
    return left * right;
  }
  function _operation_divide(left, right) {
    return left / right;
  }
  function _operation_remainder(left, right) {
    return left % right;
  }
  function _operation_equals(left, right) {
    return left == right;
  }
  function _operation_not_equals(left, right) {
    return left != right;
  }
  function _operation_less_then(left, right) {
    return left < right;
  }
  function _operation_greater_then(left, right) {
    return left > right;
  }
  function _operation_less_or_equals_then(left, right) {
    return left <= right;
  }
  function _operation_greater_or_equals_then(left, right) {
    return left >= right;
  }
  function _operation_logical_and(left, right) {
    return left && right;
  }
  function _operation_logical_or(left, right) {
    return left || right;
  }
  function _cond(cond, trueVal, falseVal) {
    return cond ? trueVal : falseVal;
  }
  function _arrayFn(length) {
    switch (length) {
      case 0:
        return (function() {
          return [];
        });
      case 1:
        return (function(a1) {
          return [a1];
        });
      case 2:
        return (function(a1, a2) {
          return [a1, a2];
        });
      case 3:
        return (function(a1, a2, a3) {
          return [a1, a2, a3];
        });
      case 4:
        return (function(a1, a2, a3, a4) {
          return [a1, a2, a3, a4];
        });
      case 5:
        return (function(a1, a2, a3, a4, a5) {
          return [a1, a2, a3, a4, a5];
        });
      case 6:
        return (function(a1, a2, a3, a4, a5, a6) {
          return [a1, a2, a3, a4, a5, a6];
        });
      case 7:
        return (function(a1, a2, a3, a4, a5, a6, a7) {
          return [a1, a2, a3, a4, a5, a6, a7];
        });
      case 8:
        return (function(a1, a2, a3, a4, a5, a6, a7, a8) {
          return [a1, a2, a3, a4, a5, a6, a7, a8];
        });
      case 9:
        return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
          return [a1, a2, a3, a4, a5, a6, a7, a8, a9];
        });
      default:
        throw new BaseException("Does not support literal arrays with more than 9 elements");
    }
  }
  function _mapFn(keys, length) {
    function buildMap(values) {
      var res = StringMapWrapper.create();
      for (var i = 0; i < keys.length; ++i) {
        StringMapWrapper.set(res, keys[i], values[i]);
      }
      return res;
    }
    switch (length) {
      case 0:
        return (function() {
          return [];
        });
      case 1:
        return (function(a1) {
          return buildMap([a1]);
        });
      case 2:
        return (function(a1, a2) {
          return buildMap([a1, a2]);
        });
      case 3:
        return (function(a1, a2, a3) {
          return buildMap([a1, a2, a3]);
        });
      case 4:
        return (function(a1, a2, a3, a4) {
          return buildMap([a1, a2, a3, a4]);
        });
      case 5:
        return (function(a1, a2, a3, a4, a5) {
          return buildMap([a1, a2, a3, a4, a5]);
        });
      case 6:
        return (function(a1, a2, a3, a4, a5, a6) {
          return buildMap([a1, a2, a3, a4, a5, a6]);
        });
      case 7:
        return (function(a1, a2, a3, a4, a5, a6, a7) {
          return buildMap([a1, a2, a3, a4, a5, a6, a7]);
        });
      case 8:
        return (function(a1, a2, a3, a4, a5, a6, a7, a8) {
          return buildMap([a1, a2, a3, a4, a5, a6, a7, a8]);
        });
      case 9:
        return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
          return buildMap([a1, a2, a3, a4, a5, a6, a7, a8, a9]);
        });
      default:
        throw new BaseException("Does not support literal maps with more than 9 elements");
    }
  }
  function _mapGetter(key) {
    return function(map) {
      return MapWrapper.get(map, key);
    };
  }
  function _keyedAccess(obj, args) {
    return obj[args[0]];
  }
  return {
    setters: [function(m) {
      ProtoRecord = m.ProtoRecord;
      Record = m.Record;
      RECORD_FLAG_COLLECTION = m.RECORD_FLAG_COLLECTION;
      RECORD_FLAG_IMPLICIT_RECEIVER = m.RECORD_FLAG_IMPLICIT_RECEIVER;
      RECORD_TYPE_CONST = m.RECORD_TYPE_CONST;
      RECORD_TYPE_INVOKE_CLOSURE = m.RECORD_TYPE_INVOKE_CLOSURE;
      RECORD_TYPE_INVOKE_FORMATTER = m.RECORD_TYPE_INVOKE_FORMATTER;
      RECORD_TYPE_INVOKE_METHOD = m.RECORD_TYPE_INVOKE_METHOD;
      RECORD_TYPE_INVOKE_PURE_FUNCTION = m.RECORD_TYPE_INVOKE_PURE_FUNCTION;
      RECORD_TYPE_PROPERTY = m.RECORD_TYPE_PROPERTY;
    }, function(m) {
      FIELD = m.FIELD;
      IMPLEMENTS = m.IMPLEMENTS;
      isBlank = m.isBlank;
      isPresent = m.isPresent;
      int = m.int;
      autoConvertAdd = m.autoConvertAdd;
      BaseException = m.BaseException;
      NumberWrapper = m.NumberWrapper;
    }, function(m) {
      List = m.List;
      Map = m.Map;
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
      StringMapWrapper = m.StringMapWrapper;
    }, function(m) {
      ContextWithVariableBindings = m.ContextWithVariableBindings;
    }, function(m) {
      AccessMember = m.AccessMember;
      Assignment = m.Assignment;
      AST = m.AST;
      AstVisitor = m.AstVisitor;
      Binary = m.Binary;
      Chain = m.Chain;
      Collection = m.Collection;
      Conditional = m.Conditional;
      Formatter = m.Formatter;
      FunctionCall = m.FunctionCall;
      ImplicitReceiver = m.ImplicitReceiver;
      KeyedAccess = m.KeyedAccess;
      LiteralArray = m.LiteralArray;
      LiteralMap = m.LiteralMap;
      LiteralPrimitive = m.LiteralPrimitive;
      MethodCall = m.MethodCall;
      PrefixNot = m.PrefixNot;
    }],
    execute: function() {
      ProtoRecordRange = $__export("ProtoRecordRange", (function() {
        var ProtoRecordRange = function ProtoRecordRange() {
          this.recordCreator = null;
        };
        return ($traceurRuntime.createClass)(ProtoRecordRange, {
          addRecordsFromAST: function(ast, expressionMemento, groupMemento) {
            var content = arguments[3] !== (void 0) ? arguments[3] : false;
            if (this.recordCreator === null) {
              this.recordCreator = new ProtoRecordCreator(this);
            }
            if (content) {
              ast = new Collection(ast);
            }
            this.recordCreator.createRecordsFromAST(ast, expressionMemento, groupMemento);
          },
          instantiate: function(dispatcher, formatters) {
            var recordRange = new RecordRange(this, dispatcher);
            if (this.recordCreator !== null) {
              this._createRecords(recordRange, formatters);
              this._setDestination();
            }
            return recordRange;
          },
          _createRecords: function(recordRange, formatters) {
            for (var proto = this.recordCreator.headRecord; proto != null; proto = proto.next) {
              var record = new Record(recordRange, proto, formatters);
              proto.recordInConstruction = record;
              recordRange.addRecord(record);
            }
          },
          _setDestination: function() {
            for (var proto = this.recordCreator.headRecord; proto != null; proto = proto.next) {
              if (proto.dest instanceof Destination) {
                proto.recordInConstruction.dest = proto.dest.record.recordInConstruction;
              } else {
                proto.recordInConstruction.dest = proto.dest;
              }
              proto.recordInConstruction = null;
            }
          }
        }, {});
      }()));
      Object.defineProperty(ProtoRecordRange.prototype.addRecordsFromAST, "parameters", {get: function() {
          return [[AST], [], [], [$traceurRuntime.type.boolean]];
        }});
      Object.defineProperty(ProtoRecordRange.prototype.instantiate, "parameters", {get: function() {
          return [[], [Map]];
        }});
      Object.defineProperty(ProtoRecordRange.prototype._createRecords, "parameters", {get: function() {
          return [[RecordRange], [Map]];
        }});
      RecordRange = $__export("RecordRange", (function() {
        var RecordRange = function RecordRange(protoRecordRange, dispatcher) {
          this.protoRecordRange = protoRecordRange;
          this.dispatcher = dispatcher;
          this.disabled = false;
          this.headRecord = Record.createMarker(this);
          this.tailRecord = Record.createMarker(this);
          _link(this.headRecord, this.tailRecord);
        };
        return ($traceurRuntime.createClass)(RecordRange, {
          addRecord: function(record) {
            var lastRecord = this.tailRecord.prev;
            _link(lastRecord, record);
            if (!lastRecord.isDisabled()) {
              _linkEnabled(lastRecord, record);
            }
            _link(record, this.tailRecord);
          },
          addRange: function(child) {
            var lastRecord = this.tailRecord.prev;
            var prevEnabledRecord = this.tailRecord.findPrevEnabled();
            var nextEnabledRerord = this.tailRecord.findNextEnabled();
            var firstEnabledChildRecord = child.findFirstEnabledRecord();
            var lastEnabledChildRecord = child.findLastEnabledRecord();
            _link(lastRecord, child.headRecord);
            _link(child.tailRecord, this.tailRecord);
            if (isPresent(prevEnabledRecord) && isPresent(firstEnabledChildRecord)) {
              _linkEnabled(prevEnabledRecord, firstEnabledChildRecord);
            }
            if (isPresent(nextEnabledRerord) && isPresent(lastEnabledChildRecord)) {
              _linkEnabled(lastEnabledChildRecord, nextEnabledRerord);
            }
          },
          remove: function() {
            var firstEnabledChildRecord = this.findFirstEnabledRecord();
            var next = this.tailRecord.next;
            var prev = this.headRecord.prev;
            _link(prev, next);
            if (isPresent(firstEnabledChildRecord)) {
              var lastEnabledChildRecord = this.findLastEnabledRecord();
              var nextEnabled = lastEnabledChildRecord.nextEnabled;
              var prevEnabled = firstEnabledChildRecord.prevEnabled;
              if (isPresent(nextEnabled))
                nextEnabled.prevEnabled = prevEnabled;
              if (isPresent(prevEnabled))
                prevEnabled.nextEnabled = nextEnabled;
            }
          },
          disable: function() {
            var firstEnabledChildRecord = this.findFirstEnabledRecord();
            if (isPresent(firstEnabledChildRecord)) {
              var lastEnabledChildRecord = this.findLastEnabledRecord();
              var nextEnabled = lastEnabledChildRecord.nextEnabled;
              var prevEnabled = firstEnabledChildRecord.prevEnabled;
              if (isPresent(nextEnabled))
                nextEnabled.prevEnabled = prevEnabled;
              if (isPresent(prevEnabled))
                prevEnabled.nextEnabled = nextEnabled;
            }
            this.disabled = true;
          },
          enable: function() {
            var prevEnabledRecord = this.headRecord.findPrevEnabled();
            var nextEnabledRecord = this.tailRecord.findNextEnabled();
            var firstEnabledthisRecord = this.findFirstEnabledRecord();
            var lastEnabledthisRecord = this.findLastEnabledRecord();
            if (isPresent(firstEnabledthisRecord) && isPresent(prevEnabledRecord)) {
              _linkEnabled(prevEnabledRecord, firstEnabledthisRecord);
            }
            if (isPresent(lastEnabledthisRecord) && isPresent(nextEnabledRecord)) {
              _linkEnabled(lastEnabledthisRecord, nextEnabledRecord);
            }
            this.disabled = false;
          },
          findFirstEnabledRecord: function() {
            var record = this.headRecord.next;
            while (record !== this.tailRecord && record.isDisabled()) {
              if (record.isMarkerRecord() && record.recordRange.disabled) {
                record = record.recordRange.tailRecord.next;
              } else {
                record = record.next;
              }
            }
            return record === this.tailRecord ? null : record;
          },
          findLastEnabledRecord: function() {
            var record = this.tailRecord.prev;
            while (record !== this.headRecord && record.isDisabled()) {
              if (record.isMarkerRecord() && record.recordRange.disabled) {
                record = record.recordRange.headRecord.prev;
              } else {
                record = record.prev;
              }
            }
            return record === this.headRecord ? null : record;
          },
          setContext: function(context) {
            for (var record = this.headRecord; record != null; record = record.next) {
              if (record.isImplicitReceiver()) {
                this._setContextForRecord(context, record);
              }
            }
          },
          _setContextForRecord: function(context, record) {
            var proto = record.protoRecord;
            while (context instanceof ContextWithVariableBindings) {
              if (context.hasBinding(proto.name)) {
                this._setVarBindingGetter(context, record, proto);
                return ;
              }
              context = context.parent;
            }
            this._setRegularGetter(context, record, proto);
          },
          _setVarBindingGetter: function(context, record, proto) {
            record.funcOrValue = _mapGetter(proto.name);
            record.updateContext(context.varBindings);
          },
          _setRegularGetter: function(context, record, proto) {
            record.funcOrValue = proto.funcOrValue;
            record.updateContext(context);
          },
          inspect: function() {
            return _inspect(this);
          }
        }, {});
      }()));
      Object.defineProperty(RecordRange, "parameters", {get: function() {
          return [[ProtoRecordRange], []];
        }});
      Object.defineProperty(RecordRange.prototype.addRecord, "parameters", {get: function() {
          return [[Record]];
        }});
      Object.defineProperty(RecordRange.prototype.addRange, "parameters", {get: function() {
          return [[RecordRange]];
        }});
      Object.defineProperty(RecordRange.prototype._setContextForRecord, "parameters", {get: function() {
          return [[], [Record]];
        }});
      Object.defineProperty(RecordRange.prototype._setVarBindingGetter, "parameters", {get: function() {
          return [[], [Record], [ProtoRecord]];
        }});
      Object.defineProperty(RecordRange.prototype._setRegularGetter, "parameters", {get: function() {
          return [[], [Record], [ProtoRecord]];
        }});
      Object.defineProperty(_inspect, "parameters", {get: function() {
          return [[RecordRange]];
        }});
      Object.defineProperty(_link, "parameters", {get: function() {
          return [[Record], [Record]];
        }});
      Object.defineProperty(_linkEnabled, "parameters", {get: function() {
          return [[Record], [Record]];
        }});
      ChangeDispatcher = $__export("ChangeDispatcher", (function() {
        var ChangeDispatcher = function ChangeDispatcher() {};
        return ($traceurRuntime.createClass)(ChangeDispatcher, {onRecordChange: function(groupMemento, records) {}}, {});
      }()));
      Object.defineProperty(ChangeDispatcher.prototype.onRecordChange, "parameters", {get: function() {
          return [[], [List]];
        }});
      Destination = (function() {
        var Destination = function Destination(record, position) {
          this.record = record;
          this.position = position;
        };
        return ($traceurRuntime.createClass)(Destination, {}, {});
      }());
      Object.defineProperty(Destination, "parameters", {get: function() {
          return [[ProtoRecord], [int]];
        }});
      ProtoRecordCreator = (function() {
        var ProtoRecordCreator = function ProtoRecordCreator(protoRecordRange) {
          this.protoRecordRange = protoRecordRange;
          this.headRecord = null;
          this.tailRecord = null;
          this.expressionAsString = null;
        };
        return ($traceurRuntime.createClass)(ProtoRecordCreator, {
          visitImplicitReceiver: function(ast, args) {
            throw new BaseException('Should never visit an implicit receiver');
          },
          visitLiteralPrimitive: function(ast, dest) {
            this.add(this.construct(RECORD_TYPE_CONST, ast.value, 0, null, dest));
          },
          visitBinary: function(ast, dest) {
            var record = this.construct(RECORD_TYPE_INVOKE_PURE_FUNCTION, _operationToFunction(ast.operation), 2, ast.operation, dest);
            ast.left.visit(this, new Destination(record, 0));
            ast.right.visit(this, new Destination(record, 1));
            this.add(record);
          },
          visitPrefixNot: function(ast, dest) {
            var record = this.construct(RECORD_TYPE_INVOKE_PURE_FUNCTION, _operation_negate, 1, "-", dest);
            ast.expression.visit(this, new Destination(record, 0));
            this.add(record);
          },
          visitAccessMember: function(ast, dest) {
            var record = this.construct(RECORD_TYPE_PROPERTY, ast.getter, 0, ast.name, dest);
            if (ast.receiver instanceof ImplicitReceiver) {
              record.setIsImplicitReceiver();
            } else {
              ast.receiver.visit(this, new Destination(record, null));
            }
            this.add(record);
          },
          visitFormatter: function(ast, dest) {
            var record = this.construct(RECORD_TYPE_INVOKE_FORMATTER, ast.name, ast.allArgs.length, ast.name, dest);
            for (var i = 0; i < ast.allArgs.length; ++i) {
              ast.allArgs[i].visit(this, new Destination(record, i));
            }
            this.add(record);
          },
          visitMethodCall: function(ast, dest) {
            var record = this.construct(RECORD_TYPE_INVOKE_METHOD, ast.fn, ast.args.length, ast.name, dest);
            for (var i = 0; i < ast.args.length; ++i) {
              ast.args[i].visit(this, new Destination(record, i));
            }
            if (ast.receiver instanceof ImplicitReceiver) {
              record.setIsImplicitReceiver();
            } else {
              ast.receiver.visit(this, new Destination(record, null));
            }
            this.add(record);
          },
          visitFunctionCall: function(ast, dest) {
            var record = this.construct(RECORD_TYPE_INVOKE_CLOSURE, null, ast.args.length, null, dest);
            ast.target.visit(this, new Destination(record, null));
            for (var i = 0; i < ast.args.length; ++i) {
              ast.args[i].visit(this, new Destination(record, i));
            }
            this.add(record);
          },
          visitCollection: function(ast, dest) {
            var record = this.construct(RECORD_FLAG_COLLECTION, null, null, null, dest);
            ast.value.visit(this, new Destination(record, null));
            this.add(record);
          },
          visitConditional: function(ast, dest) {
            var record = this.construct(RECORD_TYPE_INVOKE_PURE_FUNCTION, _cond, 3, "?:", dest);
            ast.condition.visit(this, new Destination(record, 0));
            ast.trueExp.visit(this, new Destination(record, 1));
            ast.falseExp.visit(this, new Destination(record, 2));
            this.add(record);
          },
          visitKeyedAccess: function(ast, dest) {
            var record = this.construct(RECORD_TYPE_INVOKE_METHOD, _keyedAccess, 1, "[]", dest);
            ast.obj.visit(this, new Destination(record, null));
            ast.key.visit(this, new Destination(record, 0));
            this.add(record);
          },
          visitLiteralArray: function(ast, dest) {
            var length = ast.expressions.length;
            var record = this.construct(RECORD_TYPE_INVOKE_PURE_FUNCTION, _arrayFn(length), length, "Array()", dest);
            for (var i = 0; i < length; ++i) {
              ast.expressions[i].visit(this, new Destination(record, i));
            }
            this.add(record);
          },
          visitLiteralMap: function(ast, dest) {
            var length = ast.values.length;
            var record = this.construct(RECORD_TYPE_INVOKE_PURE_FUNCTION, _mapFn(ast.keys, length), length, "Map()", dest);
            for (var i = 0; i < length; ++i) {
              ast.values[i].visit(this, new Destination(record, i));
            }
            this.add(record);
          },
          visitChain: function(ast, dest) {
            this._unsupported();
          },
          visitAssignment: function(ast, dest) {
            this._unsupported();
          },
          visitTemplateBindings: function(ast, dest) {
            this._unsupported();
          },
          createRecordsFromAST: function(ast, expressionMemento, groupMemento) {
            this.groupMemento = groupMemento;
            this.expressionAsString = ast.toString();
            ast.visit(this, expressionMemento);
          },
          construct: function(recordType, funcOrValue, arity, name, dest) {
            return new ProtoRecord(this.protoRecordRange, recordType, funcOrValue, arity, name, dest, this.groupMemento, this.expressionAsString);
          },
          add: function(protoRecord) {
            if (this.headRecord === null) {
              this.headRecord = this.tailRecord = protoRecord;
            } else {
              this.tailRecord.next = protoRecord;
              this.tailRecord = protoRecord;
            }
          },
          _unsupported: function() {
            throw new BaseException("Unsupported");
          }
        }, {});
      }());
      Object.defineProperty(ProtoRecordCreator, "annotations", {get: function() {
          return [new IMPLEMENTS(AstVisitor)];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitImplicitReceiver, "parameters", {get: function() {
          return [[ImplicitReceiver], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitLiteralPrimitive, "parameters", {get: function() {
          return [[LiteralPrimitive], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitBinary, "parameters", {get: function() {
          return [[Binary], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitPrefixNot, "parameters", {get: function() {
          return [[PrefixNot], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitAccessMember, "parameters", {get: function() {
          return [[AccessMember], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitFormatter, "parameters", {get: function() {
          return [[Formatter], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitMethodCall, "parameters", {get: function() {
          return [[MethodCall], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitFunctionCall, "parameters", {get: function() {
          return [[FunctionCall], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitCollection, "parameters", {get: function() {
          return [[Collection], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitConditional, "parameters", {get: function() {
          return [[Conditional], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitKeyedAccess, "parameters", {get: function() {
          return [[KeyedAccess], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitLiteralArray, "parameters", {get: function() {
          return [[LiteralArray], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitLiteralMap, "parameters", {get: function() {
          return [[LiteralMap], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitChain, "parameters", {get: function() {
          return [[Chain], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.visitAssignment, "parameters", {get: function() {
          return [[Assignment], []];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.createRecordsFromAST, "parameters", {get: function() {
          return [[AST], [$traceurRuntime.type.any], [$traceurRuntime.type.any]];
        }});
      Object.defineProperty(ProtoRecordCreator.prototype.add, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(_operationToFunction, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
      Object.defineProperty(_arrayFn, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(_mapFn, "parameters", {get: function() {
          return [[List], [int]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/change_detection/src/record_range.map

//# sourceMappingURL=./record_range.map