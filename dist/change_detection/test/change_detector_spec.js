System.register("change_detection/test/change_detector_spec", ["test_lib/test_lib", "facade/lang", "facade/collection", "change_detection/parser/parser", "change_detection/parser/lexer", "change_detection/parser/context_with_variable_bindings", "./util", "change_detection/change_detector", "change_detection/record"], function($__export) {
  "use strict";
  var __moduleName = "change_detection/test/change_detector_spec";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      isPresent,
      isBlank,
      isJsObject,
      BaseException,
      List,
      ListWrapper,
      MapWrapper,
      Parser,
      Lexer,
      ContextWithVariableBindings,
      arrayChangesAsString,
      kvChangesAsString,
      ChangeDetector,
      ProtoRecordRange,
      RecordRange,
      ChangeDispatcher,
      ProtoRecord,
      ChangeDetectionError,
      Record,
      TestRecord,
      Person,
      Address,
      TestData,
      TestDispatcher;
  function main() {
    function ast(exp) {
      var location = arguments[1] !== (void 0) ? arguments[1] : 'location';
      var parser = new Parser(new Lexer());
      return parser.parseBinding(exp, location);
    }
    Object.defineProperty(ast, "parameters", {get: function() {
        return [[$traceurRuntime.type.string], [$traceurRuntime.type.string]];
      }});
    function createChangeDetector(memo, exp) {
      var context = arguments[2] !== (void 0) ? arguments[2] : null;
      var formatters = arguments[3] !== (void 0) ? arguments[3] : null;
      var content = arguments[4] !== (void 0) ? arguments[4] : false;
      var prr = new ProtoRecordRange();
      prr.addRecordsFromAST(ast(exp), memo, memo, content);
      var dispatcher = new TestDispatcher();
      var rr = prr.instantiate(dispatcher, formatters);
      rr.setContext(context);
      var cd = new ChangeDetector(rr);
      return {
        "changeDetector": cd,
        "dispatcher": dispatcher
      };
    }
    Object.defineProperty(createChangeDetector, "parameters", {get: function() {
        return [[$traceurRuntime.type.string], [$traceurRuntime.type.string], [], [], []];
      }});
    function executeWatch(memo, exp) {
      var context = arguments[2] !== (void 0) ? arguments[2] : null;
      var formatters = arguments[3] !== (void 0) ? arguments[3] : null;
      var content = arguments[4] !== (void 0) ? arguments[4] : false;
      var res = createChangeDetector(memo, exp, context, formatters, content);
      res["changeDetector"].detectChanges();
      return res["dispatcher"].log;
    }
    Object.defineProperty(executeWatch, "parameters", {get: function() {
        return [[$traceurRuntime.type.string], [$traceurRuntime.type.string], [], [], []];
      }});
    describe('change_detection', (function() {
      describe('ChangeDetection', (function() {
        function createRange(dispatcher, ast, group) {
          var prr = new ProtoRecordRange();
          prr.addRecordsFromAST(ast, "memo", group);
          return prr.instantiate(dispatcher, null);
        }
        function detectChangesInRange(recordRange) {
          var cd = new ChangeDetector(recordRange);
          cd.detectChanges();
        }
        it('should do simple watching', (function() {
          var person = new Person("misko");
          var c = createChangeDetector('name', 'name', person);
          var cd = c["changeDetector"];
          var dispatcher = c["dispatcher"];
          cd.detectChanges();
          expect(dispatcher.log).toEqual(['name=misko']);
          dispatcher.clear();
          cd.detectChanges();
          expect(dispatcher.log).toEqual([]);
          person.name = "Misko";
          cd.detectChanges();
          expect(dispatcher.log).toEqual(['name=Misko']);
        }));
        it('should support chained properties', (function() {
          var address = new Address('Grenoble');
          var person = new Person('Victor', address);
          expect(executeWatch('address.city', 'address.city', person)).toEqual(['address.city=Grenoble']);
        }));
        it("should support method calls", (function() {
          var person = new Person('Victor');
          expect(executeWatch('m', 'sayHi("Jim")', person)).toEqual(['m=Hi, Jim']);
        }));
        it("should support function calls", (function() {
          var td = new TestData((function() {
            return (function(a) {
              return a;
            });
          }));
          expect(executeWatch('value', 'a()(99)', td)).toEqual(['value=99']);
        }));
        it("should support chained method calls", (function() {
          var person = new Person('Victor');
          var td = new TestData(person);
          expect(executeWatch('m', 'a.sayHi("Jim")', td)).toEqual(['m=Hi, Jim']);
        }));
        it("should support literals", (function() {
          expect(executeWatch('const', '10')).toEqual(['const=10']);
          expect(executeWatch('const', '"str"')).toEqual(['const=str']);
        }));
        it("should support literal array", (function() {
          var c = createChangeDetector('array', '[1,2]');
          c["changeDetector"].detectChanges();
          expect(c["dispatcher"].loggedValues).toEqual([[[1, 2]]]);
          c = createChangeDetector('array', '[1,a]', new TestData(2));
          c["changeDetector"].detectChanges();
          expect(c["dispatcher"].loggedValues).toEqual([[[1, 2]]]);
        }));
        it("should support literal maps", (function() {
          var c = createChangeDetector('map', '{z:1}');
          c["changeDetector"].detectChanges();
          expect(c["dispatcher"].loggedValues[0][0]['z']).toEqual(1);
          c = createChangeDetector('map', '{z:a}', new TestData(1));
          c["changeDetector"].detectChanges();
          expect(c["dispatcher"].loggedValues[0][0]['z']).toEqual(1);
        }));
        it("should support binary operations", (function() {
          expect(executeWatch('exp', '10 + 2')).toEqual(['exp=12']);
          expect(executeWatch('exp', '10 - 2')).toEqual(['exp=8']);
          expect(executeWatch('exp', '10 * 2')).toEqual(['exp=20']);
          expect(executeWatch('exp', '10 / 2')).toEqual([("exp=" + 5.0)]);
          expect(executeWatch('exp', '11 % 2')).toEqual(['exp=1']);
          expect(executeWatch('exp', '1 == 1')).toEqual(['exp=true']);
          expect(executeWatch('exp', '1 != 1')).toEqual(['exp=false']);
          expect(executeWatch('exp', '1 < 2')).toEqual(['exp=true']);
          expect(executeWatch('exp', '2 < 1')).toEqual(['exp=false']);
          expect(executeWatch('exp', '2 > 1')).toEqual(['exp=true']);
          expect(executeWatch('exp', '2 < 1')).toEqual(['exp=false']);
          expect(executeWatch('exp', '1 <= 2')).toEqual(['exp=true']);
          expect(executeWatch('exp', '2 <= 2')).toEqual(['exp=true']);
          expect(executeWatch('exp', '2 <= 1')).toEqual(['exp=false']);
          expect(executeWatch('exp', '2 >= 1')).toEqual(['exp=true']);
          expect(executeWatch('exp', '2 >= 2')).toEqual(['exp=true']);
          expect(executeWatch('exp', '1 >= 2')).toEqual(['exp=false']);
          expect(executeWatch('exp', 'true && true')).toEqual(['exp=true']);
          expect(executeWatch('exp', 'true && false')).toEqual(['exp=false']);
          expect(executeWatch('exp', 'true || false')).toEqual(['exp=true']);
          expect(executeWatch('exp', 'false || false')).toEqual(['exp=false']);
        }));
        it("should support negate", (function() {
          expect(executeWatch('exp', '!true')).toEqual(['exp=false']);
          expect(executeWatch('exp', '!!true')).toEqual(['exp=true']);
        }));
        it("should support conditionals", (function() {
          expect(executeWatch('m', '1 < 2 ? 1 : 2')).toEqual(['m=1']);
          expect(executeWatch('m', '1 > 2 ? 1 : 2')).toEqual(['m=2']);
        }));
        describe("keyed access", (function() {
          it("should support accessing a list item", (function() {
            expect(executeWatch('array[0]', '["foo", "bar"][0]')).toEqual(['array[0]=foo']);
          }));
          it("should support accessing a map item", (function() {
            expect(executeWatch('map[foo]', '{"foo": "bar"}["foo"]')).toEqual(['map[foo]=bar']);
          }));
        }));
        describe("formatters", (function() {
          it("should support formatters", (function() {
            var formatters = MapWrapper.createFromPairs([['uppercase', (function(v) {
              return v.toUpperCase();
            })], ['wrap', (function(v, before, after) {
              return ("" + before + v + after);
            })]]);
            expect(executeWatch('str', '"aBc" | uppercase', null, formatters)).toEqual(['str=ABC']);
            expect(executeWatch('str', '"b" | wrap:"a":"c"', null, formatters)).toEqual(['str=abc']);
          }));
          it("should rerun formatters only when arguments change", (function() {
            var counter = 0;
            var formatters = MapWrapper.createFromPairs([['formatter', (function(_) {
              counter += 1;
              return 'value';
            })]]);
            var person = new Person('Jim');
            var c = createChangeDetector('formatter', 'name | formatter', person, formatters);
            var cd = c['changeDetector'];
            cd.detectChanges();
            expect(counter).toEqual(1);
            cd.detectChanges();
            expect(counter).toEqual(1);
            person.name = 'bob';
            cd.detectChanges();
            expect(counter).toEqual(2);
          }));
        }));
        describe("ContextWithVariableBindings", (function() {
          it('should read a field from ContextWithVariableBindings', (function() {
            var locals = new ContextWithVariableBindings(null, MapWrapper.createFromPairs([["key", "value"]]));
            expect(executeWatch('key', 'key', locals)).toEqual(['key=value']);
          }));
          it('should handle nested ContextWithVariableBindings', (function() {
            var nested = new ContextWithVariableBindings(null, MapWrapper.createFromPairs([["key", "value"]]));
            var locals = new ContextWithVariableBindings(nested, MapWrapper.create());
            expect(executeWatch('key', 'key', locals)).toEqual(['key=value']);
          }));
          it("should fall back to a regular field read when ContextWithVariableBindings " + "does not have the requested field", (function() {
            var locals = new ContextWithVariableBindings(new Person("Jim"), MapWrapper.createFromPairs([["key", "value"]]));
            expect(executeWatch('name', 'name', locals)).toEqual(['name=Jim']);
          }));
        }));
        describe("collections", (function() {
          it("should support null values", (function() {
            var context = new TestData(null);
            var c = createChangeDetector('a', 'a', context, null, true);
            var cd = c["changeDetector"];
            var dsp = c["dispatcher"];
            cd.detectChanges();
            expect(dsp.log).toEqual(['a=null']);
            dsp.clear();
            cd.detectChanges();
            expect(dsp.log).toEqual([]);
            context.a = [0];
            cd.detectChanges();
            expect(dsp.log).toEqual(["a=" + arrayChangesAsString({
              collection: ['0[null->0]'],
              additions: ['0[null->0]']
            })]);
            dsp.clear();
            context.a = null;
            cd.detectChanges();
            expect(dsp.log).toEqual(['a=null']);
          }));
          it("should throw if not collection / null", (function() {
            var context = new TestData("not collection / null");
            var c = createChangeDetector('a', 'a', context, null, true);
            expect((function() {
              return c["changeDetector"].detectChanges();
            })).toThrowError(new RegExp("Collection records must be array like, map like or null"));
          }));
          describe("list", (function() {
            it("should support list changes", (function() {
              var context = new TestData([1, 2]);
              expect(executeWatch("a", "a", context, null, true)).toEqual(["a=" + arrayChangesAsString({
                collection: ['1[null->0]', '2[null->1]'],
                additions: ['1[null->0]', '2[null->1]']
              })]);
            }));
            it("should handle reference changes", (function() {
              var context = new TestData([1, 2]);
              var objs = createChangeDetector("a", "a", context, null, true);
              var cd = objs["changeDetector"];
              var dispatcher = objs["dispatcher"];
              cd.detectChanges();
              dispatcher.clear();
              context.a = [2, 1];
              cd.detectChanges();
              expect(dispatcher.log).toEqual(["a=" + arrayChangesAsString({
                collection: ['2[1->0]', '1[0->1]'],
                previous: ['1[0->1]', '2[1->0]'],
                moves: ['2[1->0]', '1[0->1]']
              })]);
            }));
          }));
          describe("map", (function() {
            it("should support map changes", (function() {
              var map = MapWrapper.create();
              MapWrapper.set(map, "foo", "bar");
              var context = new TestData(map);
              expect(executeWatch("a", "a", context, null, true)).toEqual(["a=" + kvChangesAsString({
                map: ['foo[null->bar]'],
                additions: ['foo[null->bar]']
              })]);
            }));
            it("should handle reference changes", (function() {
              var map = MapWrapper.create();
              MapWrapper.set(map, "foo", "bar");
              var context = new TestData(map);
              var objs = createChangeDetector("a", "a", context, null, true);
              var cd = objs["changeDetector"];
              var dispatcher = objs["dispatcher"];
              cd.detectChanges();
              dispatcher.clear();
              context.a = MapWrapper.create();
              MapWrapper.set(context.a, "bar", "foo");
              cd.detectChanges();
              expect(dispatcher.log).toEqual(["a=" + kvChangesAsString({
                map: ['bar[null->foo]'],
                previous: ['foo[bar->null]'],
                additions: ['bar[null->foo]'],
                removals: ['foo[bar->null]']
              })]);
            }));
          }));
          if (isJsObject({})) {
            describe("js objects", (function() {
              it("should support object changes", (function() {
                var map = {"foo": "bar"};
                var context = new TestData(map);
                expect(executeWatch("a", "a", context, null, true)).toEqual(["a=" + kvChangesAsString({
                  map: ['foo[null->bar]'],
                  additions: ['foo[null->bar]']
                })]);
              }));
            }));
          }
        }));
        describe("adding new ranges", (function() {
          var dispatcher;
          beforeEach((function() {
            dispatcher = new TestDispatcher();
          }));
          it("should work when disabling the last enabled record", (function() {
            var rr = createRange(dispatcher, ast("1"), 1);
            dispatcher.onChange = (function(group, _) {
              if (group === 1) {
                var rangeToAppend = createRange(dispatcher, ast("2"), 2);
                rr.addRange(rangeToAppend);
              }
            });
            detectChangesInRange(rr);
            expect(dispatcher.loggedValues).toEqual([[1], [2]]);
          }));
        }));
        describe("group changes", (function() {
          it("should notify the dispatcher when a group of records changes", (function() {
            var prr = new ProtoRecordRange();
            prr.addRecordsFromAST(ast("1 + 2"), "memo", 1);
            prr.addRecordsFromAST(ast("10 + 20"), "memo", 1);
            prr.addRecordsFromAST(ast("100 + 200"), "memo2", 2);
            var dispatcher = new TestDispatcher();
            var rr = prr.instantiate(dispatcher, null);
            detectChangesInRange(rr);
            expect(dispatcher.loggedValues).toEqual([[3, 30], [300]]);
          }));
          it("should update every instance of a group individually", (function() {
            var prr = new ProtoRecordRange();
            prr.addRecordsFromAST(ast("1 + 2"), "memo", "memo");
            var dispatcher = new TestDispatcher();
            var rr = new RecordRange(null, dispatcher);
            rr.addRange(prr.instantiate(dispatcher, null));
            rr.addRange(prr.instantiate(dispatcher, null));
            detectChangesInRange(rr);
            expect(dispatcher.loggedValues).toEqual([[3], [3]]);
          }));
          it("should notify the dispatcher before switching to the next group", (function() {
            var prr = new ProtoRecordRange();
            prr.addRecordsFromAST(ast("a()"), "a", 1);
            prr.addRecordsFromAST(ast("b()"), "b", 2);
            prr.addRecordsFromAST(ast("c()"), "c", 2);
            var dispatcher = new TestDispatcher();
            var rr = prr.instantiate(dispatcher, null);
            var tr = new TestRecord();
            tr.a = (function() {
              dispatcher.logValue('InvokeA');
              return 'a';
            });
            tr.b = (function() {
              dispatcher.logValue('InvokeB');
              return 'b';
            });
            tr.c = (function() {
              dispatcher.logValue('InvokeC');
              return 'c';
            });
            rr.setContext(tr);
            detectChangesInRange(rr);
            expect(dispatcher.loggedValues).toEqual(['InvokeA', ['a'], 'InvokeB', 'InvokeC', ['b', 'c']]);
          }));
        }));
        describe("enforce no new changes", (function() {
          it("should throw when a record gets changed after it has been checked", (function() {
            var prr = new ProtoRecordRange();
            prr.addRecordsFromAST(ast("a"), "a", 1);
            prr.addRecordsFromAST(ast("b()"), "b", 2);
            var tr = new TestRecord();
            tr.a = "a";
            tr.b = (function() {
              tr.a = "newA";
            });
            var dispatcher = new TestDispatcher();
            var rr = prr.instantiate(dispatcher, null);
            rr.setContext(tr);
            expect((function() {
              var cd = new ChangeDetector(rr, true);
              cd.detectChanges();
            })).toThrowError(new RegExp("Expression 'a in location' has changed after it was checked"));
          }));
        }));
        describe("error handling", (function() {
          it("should wrap exceptions into ChangeDetectionError", (function() {
            try {
              var rr = createRange(new TestDispatcher(), ast("invalidProp", "someComponent"), 1);
              detectChangesInRange(rr);
              throw new BaseException("fail");
            } catch (e) {
              expect(e).toBeAnInstanceOf(ChangeDetectionError);
              expect(e.location).toEqual("invalidProp in someComponent");
            }
          }));
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
      isPresent = m.isPresent;
      isBlank = m.isBlank;
      isJsObject = m.isJsObject;
      BaseException = m.BaseException;
    }, function(m) {
      List = m.List;
      ListWrapper = m.ListWrapper;
      MapWrapper = m.MapWrapper;
    }, function(m) {
      Parser = m.Parser;
    }, function(m) {
      Lexer = m.Lexer;
    }, function(m) {
      ContextWithVariableBindings = m.ContextWithVariableBindings;
    }, function(m) {
      arrayChangesAsString = m.arrayChangesAsString;
      kvChangesAsString = m.kvChangesAsString;
    }, function(m) {
      ChangeDetector = m.ChangeDetector;
      ProtoRecordRange = m.ProtoRecordRange;
      RecordRange = m.RecordRange;
      ChangeDispatcher = m.ChangeDispatcher;
      ProtoRecord = m.ProtoRecord;
      ChangeDetectionError = m.ChangeDetectionError;
    }, function(m) {
      Record = m.Record;
    }],
    execute: function() {
      TestRecord = (function() {
        var TestRecord = function TestRecord() {};
        return ($traceurRuntime.createClass)(TestRecord, {}, {});
      }());
      Person = (function() {
        var Person = function Person(name) {
          var address = arguments[1] !== (void 0) ? arguments[1] : null;
          this.name = name;
          this.address = address;
        };
        return ($traceurRuntime.createClass)(Person, {
          sayHi: function(m) {
            return ("Hi, " + m);
          },
          toString: function() {
            var address = this.address == null ? '' : ' address=' + this.address.toString();
            return 'name=' + this.name + address;
          }
        }, {});
      }());
      Object.defineProperty(Person, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], [Address]];
        }});
      Address = (function() {
        var Address = function Address(city) {
          this.city = city;
        };
        return ($traceurRuntime.createClass)(Address, {toString: function() {
            return this.city;
          }}, {});
      }());
      Object.defineProperty(Address, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
      TestData = (function() {
        var TestData = function TestData(a) {
          this.a = a;
        };
        return ($traceurRuntime.createClass)(TestData, {}, {});
      }());
      TestDispatcher = (function($__super) {
        var TestDispatcher = function TestDispatcher() {
          this.log = null;
          this.loggedValues = null;
          this.onChange = (function(_, __) {});
          this.clear();
        };
        return ($traceurRuntime.createClass)(TestDispatcher, {
          clear: function() {
            this.log = ListWrapper.create();
            this.loggedValues = ListWrapper.create();
          },
          logValue: function(value) {
            ListWrapper.push(this.loggedValues, value);
          },
          onRecordChange: function(group, records) {
            var value = records[0].currentValue;
            var dest = records[0].protoRecord.dest;
            ListWrapper.push(this.log, dest + '=' + this._asString(value));
            var values = ListWrapper.map(records, (function(r) {
              return r.currentValue;
            }));
            ListWrapper.push(this.loggedValues, values);
            this.onChange(group, records);
          },
          _asString: function(value) {
            return (isBlank(value) ? 'null' : value.toString());
          }
        }, {}, $__super);
      }(ChangeDispatcher));
      Object.defineProperty(TestDispatcher.prototype.onRecordChange, "parameters", {get: function() {
          return [[], [List]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/change_detection/test/change_detector_spec.map

//# sourceMappingURL=./change_detector_spec.map