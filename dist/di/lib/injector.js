System.register("di/injector", ["facade/collection", "./binding", "./exceptions", "facade/lang", "facade/async", "./key"], function($__export) {
  "use strict";
  var __moduleName = "di/injector";
  var Map,
      List,
      MapWrapper,
      ListWrapper,
      Binding,
      BindingBuilder,
      bind,
      ProviderError,
      NoProviderError,
      InvalidBindingError,
      AsyncBindingError,
      CyclicDependencyError,
      InstantiationError,
      FunctionWrapper,
      Type,
      isPresent,
      isBlank,
      Promise,
      PromiseWrapper,
      Key,
      _constructing,
      _Waiting,
      Injector,
      _SyncInjectorStrategy,
      _AsyncInjectorStrategy;
  function _isWaiting(obj) {
    return obj instanceof _Waiting;
  }
  function _flattenBindings(bindings, res) {
    ListWrapper.forEach(bindings, function(b) {
      if (b instanceof Binding) {
        MapWrapper.set(res, b.key.id, b);
      } else if (b instanceof Type) {
        var s = bind(b).toClass(b);
        MapWrapper.set(res, s.key.id, s);
      } else if (b instanceof List) {
        _flattenBindings(b, res);
      } else if (b instanceof BindingBuilder) {
        throw new InvalidBindingError(b.token);
      } else {
        throw new InvalidBindingError(b);
      }
    });
    return res;
  }
  return {
    setters: [function(m) {
      Map = m.Map;
      List = m.List;
      MapWrapper = m.MapWrapper;
      ListWrapper = m.ListWrapper;
    }, function(m) {
      Binding = m.Binding;
      BindingBuilder = m.BindingBuilder;
      bind = m.bind;
    }, function(m) {
      ProviderError = m.ProviderError;
      NoProviderError = m.NoProviderError;
      InvalidBindingError = m.InvalidBindingError;
      AsyncBindingError = m.AsyncBindingError;
      CyclicDependencyError = m.CyclicDependencyError;
      InstantiationError = m.InstantiationError;
    }, function(m) {
      FunctionWrapper = m.FunctionWrapper;
      Type = m.Type;
      isPresent = m.isPresent;
      isBlank = m.isBlank;
    }, function(m) {
      Promise = m.Promise;
      PromiseWrapper = m.PromiseWrapper;
    }, function(m) {
      Key = m.Key;
    }],
    execute: function() {
      _constructing = new Object();
      _Waiting = (function() {
        var _Waiting = function _Waiting(promise) {
          this.promise = promise;
        };
        return ($traceurRuntime.createClass)(_Waiting, {}, {});
      }());
      Object.defineProperty(_Waiting, "parameters", {get: function() {
          return [[Promise]];
        }});
      Injector = $__export("Injector", (function() {
        var Injector = function Injector(bindings) {
          var $__3,
              $__4;
          var $__2 = arguments[1] !== (void 0) ? arguments[1] : {},
              parent = ($__3 = $__2.parent) === void 0 ? null : $__3,
              defaultBindings = ($__4 = $__2.defaultBindings) === void 0 ? false : $__4;
          var flatten = _flattenBindings(bindings, MapWrapper.create());
          this._bindings = this._createListOfBindings(flatten);
          this._instances = this._createInstances();
          this._parent = parent;
          this._defaultBindings = defaultBindings;
          this._asyncStrategy = new _AsyncInjectorStrategy(this);
          this._syncStrategy = new _SyncInjectorStrategy(this);
        };
        return ($traceurRuntime.createClass)(Injector, {
          get: function(token) {
            return this._getByKey(Key.get(token), false, false);
          },
          asyncGet: function(token) {
            return this._getByKey(Key.get(token), true, false);
          },
          createChild: function(bindings) {
            return new Injector(bindings, {parent: this});
          },
          _createListOfBindings: function(flattenBindings) {
            var bindings = ListWrapper.createFixedSize(Key.numberOfKeys + 1);
            MapWrapper.forEach(flattenBindings, (function(v, keyId) {
              return bindings[keyId] = v;
            }));
            return bindings;
          },
          _createInstances: function() {
            return ListWrapper.createFixedSize(Key.numberOfKeys + 1);
          },
          _getByKey: function(key, returnPromise, returnLazy) {
            var $__0 = this;
            if (returnLazy) {
              return (function() {
                return $__0._getByKey(key, returnPromise, false);
              });
            }
            var strategy = returnPromise ? this._asyncStrategy : this._syncStrategy;
            var instance = strategy.readFromCache(key);
            if (isPresent(instance))
              return instance;
            instance = strategy.instantiate(key);
            if (isPresent(instance))
              return instance;
            if (isPresent(this._parent)) {
              return this._parent._getByKey(key, returnPromise, returnLazy);
            }
            throw new NoProviderError(key);
          },
          _resolveDependencies: function(key, binding, forceAsync) {
            var $__0 = this;
            try {
              var getDependency = (function(d) {
                return $__0._getByKey(d.key, forceAsync || d.asPromise, d.lazy);
              });
              return ListWrapper.map(binding.dependencies, getDependency);
            } catch (e) {
              this._clear(key);
              if (e instanceof ProviderError)
                e.addKey(key);
              throw e;
            }
          },
          _getInstance: function(key) {
            if (this._instances.length <= key.id)
              return null;
            return ListWrapper.get(this._instances, key.id);
          },
          _setInstance: function(key, obj) {
            ListWrapper.set(this._instances, key.id, obj);
          },
          _getBinding: function(key) {
            var binding = this._bindings.length <= key.id ? null : ListWrapper.get(this._bindings, key.id);
            if (isBlank(binding) && this._defaultBindings) {
              return bind(key.token).toClass(key.token);
            } else {
              return binding;
            }
          },
          _markAsConstructing: function(key) {
            this._setInstance(key, _constructing);
          },
          _clear: function(key) {
            this._setInstance(key, null);
          }
        }, {});
      }()));
      Object.defineProperty(Injector, "parameters", {get: function() {
          return [[List], []];
        }});
      Object.defineProperty(Injector.prototype.createChild, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(Injector.prototype._getByKey, "parameters", {get: function() {
          return [[Key], [$traceurRuntime.type.boolean], [$traceurRuntime.type.boolean]];
        }});
      Object.defineProperty(Injector.prototype._resolveDependencies, "parameters", {get: function() {
          return [[Key], [Binding], [$traceurRuntime.type.boolean]];
        }});
      Object.defineProperty(Injector.prototype._getInstance, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(Injector.prototype._setInstance, "parameters", {get: function() {
          return [[Key], []];
        }});
      Object.defineProperty(Injector.prototype._getBinding, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(Injector.prototype._markAsConstructing, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(Injector.prototype._clear, "parameters", {get: function() {
          return [[Key]];
        }});
      _SyncInjectorStrategy = (function() {
        var _SyncInjectorStrategy = function _SyncInjectorStrategy(injector) {
          this.injector = injector;
        };
        return ($traceurRuntime.createClass)(_SyncInjectorStrategy, {
          readFromCache: function(key) {
            if (key.token === Injector) {
              return this.injector;
            }
            var instance = this.injector._getInstance(key);
            if (instance === _constructing) {
              throw new CyclicDependencyError(key);
            } else if (isPresent(instance) && !_isWaiting(instance)) {
              return instance;
            } else {
              return null;
            }
          },
          instantiate: function(key) {
            var binding = this.injector._getBinding(key);
            if (isBlank(binding))
              return null;
            if (binding.providedAsPromise)
              throw new AsyncBindingError(key);
            this.injector._markAsConstructing(key);
            var deps = this.injector._resolveDependencies(key, binding, false);
            return this._createInstance(key, binding, deps);
          },
          _createInstance: function(key, binding, deps) {
            try {
              var instance = FunctionWrapper.apply(binding.factory, deps);
              this.injector._setInstance(key, instance);
              return instance;
            } catch (e) {
              this.injector._clear(key);
              throw new InstantiationError(e, key);
            }
          }
        }, {});
      }());
      Object.defineProperty(_SyncInjectorStrategy, "parameters", {get: function() {
          return [[Injector]];
        }});
      Object.defineProperty(_SyncInjectorStrategy.prototype.readFromCache, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(_SyncInjectorStrategy.prototype.instantiate, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(_SyncInjectorStrategy.prototype._createInstance, "parameters", {get: function() {
          return [[Key], [Binding], [List]];
        }});
      _AsyncInjectorStrategy = (function() {
        var _AsyncInjectorStrategy = function _AsyncInjectorStrategy(injector) {
          this.injector = injector;
        };
        return ($traceurRuntime.createClass)(_AsyncInjectorStrategy, {
          readFromCache: function(key) {
            if (key.token === Injector) {
              return PromiseWrapper.resolve(this.injector);
            }
            var instance = this.injector._getInstance(key);
            if (instance === _constructing) {
              throw new CyclicDependencyError(key);
            } else if (_isWaiting(instance)) {
              return instance.promise;
            } else if (isPresent(instance)) {
              return PromiseWrapper.resolve(instance);
            } else {
              return null;
            }
          },
          instantiate: function(key) {
            var $__0 = this;
            var binding = this.injector._getBinding(key);
            if (isBlank(binding))
              return null;
            this.injector._markAsConstructing(key);
            var deps = this.injector._resolveDependencies(key, binding, true);
            var depsPromise = PromiseWrapper.all(deps);
            var promise = PromiseWrapper.then(depsPromise, null, (function(e) {
              return $__0._errorHandler(key, e);
            })).then((function(deps) {
              return $__0._findOrCreate(key, binding, deps);
            })).then((function(instance) {
              return $__0._cacheInstance(key, instance);
            }));
            this.injector._setInstance(key, new _Waiting(promise));
            return promise;
          },
          _errorHandler: function(key, e) {
            if (e instanceof ProviderError)
              e.addKey(key);
            return PromiseWrapper.reject(e);
          },
          _findOrCreate: function(key, binding, deps) {
            try {
              var instance = this.injector._getInstance(key);
              if (!_isWaiting(instance))
                return instance;
              return FunctionWrapper.apply(binding.factory, deps);
            } catch (e) {
              this.injector._clear(key);
              throw new InstantiationError(e, key);
            }
          },
          _cacheInstance: function(key, instance) {
            this.injector._setInstance(key, instance);
            return instance;
          }
        }, {});
      }());
      Object.defineProperty(_AsyncInjectorStrategy, "parameters", {get: function() {
          return [[Injector]];
        }});
      Object.defineProperty(_AsyncInjectorStrategy.prototype.readFromCache, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(_AsyncInjectorStrategy.prototype.instantiate, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(_AsyncInjectorStrategy.prototype._errorHandler, "parameters", {get: function() {
          return [[Key], []];
        }});
      Object.defineProperty(_AsyncInjectorStrategy.prototype._findOrCreate, "parameters", {get: function() {
          return [[Key], [Binding], [List]];
        }});
      Object.defineProperty(_flattenBindings, "parameters", {get: function() {
          return [[List], [Map]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/di/src/injector.map

//# sourceMappingURL=./injector.map