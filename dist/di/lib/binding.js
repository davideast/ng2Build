System.register("di/binding", ["facade/lang", "facade/collection", "reflection/reflection", "./key", "./annotations", "./exceptions"], function($__export) {
  "use strict";
  var __moduleName = "di/binding";
  var FIELD,
      Type,
      isBlank,
      isPresent,
      List,
      MapWrapper,
      ListWrapper,
      reflector,
      Key,
      Inject,
      InjectLazy,
      InjectPromise,
      DependencyAnnotation,
      NoAnnotationError,
      Dependency,
      Binding,
      BindingBuilder;
  function bind(token) {
    return new BindingBuilder(token);
  }
  function _dependenciesFor(typeOrFunc) {
    var params = reflector.parameters(typeOrFunc);
    if (isBlank(params))
      return [];
    if (ListWrapper.any(params, (function(p) {
      return isBlank(p);
    })))
      throw new NoAnnotationError(typeOrFunc);
    return ListWrapper.map(params, (function(p) {
      return _extractToken(typeOrFunc, p);
    }));
  }
  function _extractToken(typeOrFunc, annotations) {
    var type;
    var depProps = [];
    for (var i = 0; i < annotations.length; ++i) {
      var paramAnnotation = annotations[i];
      if (paramAnnotation instanceof Type) {
        type = paramAnnotation;
      } else if (paramAnnotation instanceof Inject) {
        return _createDependency(paramAnnotation.token, false, false, []);
      } else if (paramAnnotation instanceof InjectPromise) {
        return _createDependency(paramAnnotation.token, true, false, []);
      } else if (paramAnnotation instanceof InjectLazy) {
        return _createDependency(paramAnnotation.token, false, true, []);
      } else if (paramAnnotation instanceof DependencyAnnotation) {
        ListWrapper.push(depProps, paramAnnotation);
      }
    }
    if (isPresent(type)) {
      return _createDependency(type, false, false, depProps);
    } else {
      throw new NoAnnotationError(typeOrFunc);
    }
  }
  function _createDependency(token, asPromise, lazy, depProps) {
    return new Dependency(Key.get(token), asPromise, lazy, depProps);
  }
  $__export("bind", bind);
  return {
    setters: [function(m) {
      FIELD = m.FIELD;
      Type = m.Type;
      isBlank = m.isBlank;
      isPresent = m.isPresent;
    }, function(m) {
      List = m.List;
      MapWrapper = m.MapWrapper;
      ListWrapper = m.ListWrapper;
    }, function(m) {
      reflector = m.reflector;
    }, function(m) {
      Key = m.Key;
    }, function(m) {
      Inject = m.Inject;
      InjectLazy = m.InjectLazy;
      InjectPromise = m.InjectPromise;
      DependencyAnnotation = m.DependencyAnnotation;
    }, function(m) {
      NoAnnotationError = m.NoAnnotationError;
    }],
    execute: function() {
      Dependency = $__export("Dependency", (function() {
        var Dependency = function Dependency(key, asPromise, lazy, properties) {
          this.key = key;
          this.asPromise = asPromise;
          this.lazy = lazy;
          this.properties = properties;
        };
        return ($traceurRuntime.createClass)(Dependency, {}, {});
      }()));
      Object.defineProperty(Dependency, "parameters", {get: function() {
          return [[Key], [$traceurRuntime.type.boolean], [$traceurRuntime.type.boolean], [List]];
        }});
      Binding = $__export("Binding", (function() {
        var Binding = function Binding(key, factory, dependencies, providedAsPromise) {
          this.key = key;
          this.factory = factory;
          this.dependencies = dependencies;
          this.providedAsPromise = providedAsPromise;
        };
        return ($traceurRuntime.createClass)(Binding, {}, {});
      }()));
      Object.defineProperty(Binding, "parameters", {get: function() {
          return [[Key], [Function], [List], [$traceurRuntime.type.boolean]];
        }});
      BindingBuilder = $__export("BindingBuilder", (function() {
        var BindingBuilder = function BindingBuilder(token) {
          this.token = token;
        };
        return ($traceurRuntime.createClass)(BindingBuilder, {
          toClass: function(type) {
            return new Binding(Key.get(this.token), reflector.factory(type), _dependenciesFor(type), false);
          },
          toValue: function(value) {
            return new Binding(Key.get(this.token), (function() {
              return value;
            }), [], false);
          },
          toFactory: function(factoryFunction) {
            var dependencies = arguments[1] !== (void 0) ? arguments[1] : null;
            return new Binding(Key.get(this.token), factoryFunction, this._constructDependencies(factoryFunction, dependencies), false);
          },
          toAsyncFactory: function(factoryFunction) {
            var dependencies = arguments[1] !== (void 0) ? arguments[1] : null;
            return new Binding(Key.get(this.token), factoryFunction, this._constructDependencies(factoryFunction, dependencies), true);
          },
          _constructDependencies: function(factoryFunction, dependencies) {
            return isBlank(dependencies) ? _dependenciesFor(factoryFunction) : ListWrapper.map(dependencies, (function(t) {
              return new Dependency(Key.get(t), false, false, []);
            }));
          }
        }, {});
      }()));
      Object.defineProperty(BindingBuilder.prototype.toClass, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(BindingBuilder.prototype.toFactory, "parameters", {get: function() {
          return [[Function], [List]];
        }});
      Object.defineProperty(BindingBuilder.prototype.toAsyncFactory, "parameters", {get: function() {
          return [[Function], [List]];
        }});
      Object.defineProperty(BindingBuilder.prototype._constructDependencies, "parameters", {get: function() {
          return [[Function], [List]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/di/src/binding.map

//# sourceMappingURL=./binding.map