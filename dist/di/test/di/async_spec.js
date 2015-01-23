System.register("di/test/di/async_spec", ["test_lib/test_lib", "di/di", "facade/async"], function($__export) {
  "use strict";
  var __moduleName = "di/test/di/async_spec";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      Injector,
      Inject,
      InjectPromise,
      bind,
      Key,
      Promise,
      PromiseWrapper,
      UserList,
      SynchronousUserList,
      UserController,
      AsyncUserController;
  function fetchUsers() {
    return PromiseWrapper.resolve(new UserList());
  }
  function main() {
    describe("async injection", function() {
      describe("asyncGet", function() {
        it('should return a promise', function() {
          var injector = new Injector([bind(UserList).toAsyncFactory(fetchUsers)]);
          var p = injector.asyncGet(UserList);
          expect(p).toBePromise();
        });
        it('should return a promise when the binding is sync', function() {
          var injector = new Injector([SynchronousUserList]);
          var p = injector.asyncGet(SynchronousUserList);
          expect(p).toBePromise();
        });
        it("should return a promise when the binding is sync (from cache)", function() {
          var injector = new Injector([UserList]);
          expect(injector.get(UserList)).toBeAnInstanceOf(UserList);
          expect(injector.asyncGet(UserList)).toBePromise();
        });
        it('should return the injector', function(done) {
          var injector = new Injector([]);
          var p = injector.asyncGet(Injector);
          p.then(function(injector) {
            expect(injector).toBe(injector);
            done();
          });
        });
        it('should return a promise when instantiating a sync binding ' + 'with an async dependency', function(done) {
          var injector = new Injector([bind(UserList).toAsyncFactory(fetchUsers), UserController]);
          injector.asyncGet(UserController).then(function(userController) {
            expect(userController).toBeAnInstanceOf(UserController);
            expect(userController.list).toBeAnInstanceOf(UserList);
            done();
          });
        });
        it("should create only one instance (async + async)", function(done) {
          var injector = new Injector([bind(UserList).toAsyncFactory(fetchUsers)]);
          var ul1 = injector.asyncGet(UserList);
          var ul2 = injector.asyncGet(UserList);
          PromiseWrapper.all([ul1, ul2]).then(function(uls) {
            expect(uls[0]).toBe(uls[1]);
            done();
          });
        });
        it("should create only one instance (sync + async)", function(done) {
          var injector = new Injector([UserList]);
          var promise = injector.asyncGet(UserList);
          var ul = injector.get(UserList);
          expect(promise).toBePromise();
          expect(ul).toBeAnInstanceOf(UserList);
          promise.then(function(ful) {
            expect(ful).toBe(ul);
            done();
          });
        });
        it('should show the full path when error happens in a constructor', function(done) {
          var injector = new Injector([UserController, bind(UserList).toAsyncFactory(function() {
            throw "Broken UserList";
          })]);
          var promise = injector.asyncGet(UserController);
          PromiseWrapper.then(promise, null, function(e) {
            expect(e.message).toContain("Error during instantiation of UserList! (UserController -> UserList)");
            done();
          });
        });
      });
      describe("get", function() {
        it('should throw when instantiating an async binding', function() {
          var injector = new Injector([bind(UserList).toAsyncFactory(fetchUsers)]);
          expect((function() {
            return injector.get(UserList);
          })).toThrowError('Cannot instantiate UserList synchronously. It is provided as a promise!');
        });
        it('should throw when instantiating a sync binding with an dependency', function() {
          var injector = new Injector([bind(UserList).toAsyncFactory(fetchUsers), UserController]);
          expect((function() {
            return injector.get(UserController);
          })).toThrowError('Cannot instantiate UserList synchronously. It is provided as a promise! (UserController -> UserList)');
        });
        it('should resolve synchronously when an async dependency requested as a promise', function() {
          var injector = new Injector([bind(UserList).toAsyncFactory(fetchUsers), AsyncUserController]);
          var controller = injector.get(AsyncUserController);
          expect(controller).toBeAnInstanceOf(AsyncUserController);
          expect(controller.userList).toBePromise();
        });
        it('should wrap sync dependencies into promises if required', function() {
          var injector = new Injector([bind(UserList).toFactory((function() {
            return new UserList();
          })), AsyncUserController]);
          var controller = injector.get(AsyncUserController);
          expect(controller).toBeAnInstanceOf(AsyncUserController);
          expect(controller.userList).toBePromise();
        });
      });
    });
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
      Injector = m.Injector;
      Inject = m.Inject;
      InjectPromise = m.InjectPromise;
      bind = m.bind;
      Key = m.Key;
    }, function(m) {
      Promise = m.Promise;
      PromiseWrapper = m.PromiseWrapper;
    }],
    execute: function() {
      UserList = (function() {
        var UserList = function UserList() {};
        return ($traceurRuntime.createClass)(UserList, {}, {});
      }());
      SynchronousUserList = (function() {
        var SynchronousUserList = function SynchronousUserList() {};
        return ($traceurRuntime.createClass)(SynchronousUserList, {}, {});
      }());
      UserController = (function() {
        var UserController = function UserController(list) {
          this.list = list;
        };
        return ($traceurRuntime.createClass)(UserController, {}, {});
      }());
      Object.defineProperty(UserController, "parameters", {get: function() {
          return [[UserList]];
        }});
      AsyncUserController = (function() {
        var AsyncUserController = function AsyncUserController(userList) {
          this.userList = userList;
        };
        return ($traceurRuntime.createClass)(AsyncUserController, {}, {});
      }());
      Object.defineProperty(AsyncUserController, "parameters", {get: function() {
          return [[new InjectPromise(UserList)]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/di/test/di/async_spec.map

//# sourceMappingURL=./async_spec.map