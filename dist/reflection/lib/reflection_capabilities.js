System.register("reflection/reflection_capabilities", ["facade/lang", "facade/collection", "./types"], function($__export) {
  "use strict";
  var __moduleName = "reflection/reflection_capabilities";
  var Type,
      isPresent,
      List,
      ListWrapper,
      GetterFn,
      SetterFn,
      MethodFn,
      ReflectionCapabilities;
  return {
    setters: [function(m) {
      Type = m.Type;
      isPresent = m.isPresent;
    }, function(m) {
      List = m.List;
      ListWrapper = m.ListWrapper;
    }, function(m) {
      GetterFn = m.GetterFn;
      SetterFn = m.SetterFn;
      MethodFn = m.MethodFn;
    }],
    execute: function() {
      ReflectionCapabilities = $__export("ReflectionCapabilities", (function() {
        var ReflectionCapabilities = function ReflectionCapabilities() {};
        return ($traceurRuntime.createClass)(ReflectionCapabilities, {
          factory: function(type) {
            switch (type.length) {
              case 0:
                return function() {
                  return new type();
                };
              case 1:
                return function(a1) {
                  return new type(a1);
                };
              case 2:
                return function(a1, a2) {
                  return new type(a1, a2);
                };
              case 3:
                return function(a1, a2, a3) {
                  return new type(a1, a2, a3);
                };
              case 4:
                return function(a1, a2, a3, a4) {
                  return new type(a1, a2, a3, a4);
                };
              case 5:
                return function(a1, a2, a3, a4, a5) {
                  return new type(a1, a2, a3, a4, a5);
                };
              case 6:
                return function(a1, a2, a3, a4, a5, a6) {
                  return new type(a1, a2, a3, a4, a5, a6);
                };
              case 7:
                return function(a1, a2, a3, a4, a5, a6, a7) {
                  return new type(a1, a2, a3, a4, a5, a6, a7);
                };
              case 8:
                return function(a1, a2, a3, a4, a5, a6, a7, a8) {
                  return new type(a1, a2, a3, a4, a5, a6, a7, a8);
                };
              case 9:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                  return new type(a1, a2, a3, a4, a5, a6, a7, a8, a9);
                };
              case 10:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
                  return new type(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
                };
            }
            ;
            throw new Error("Factory cannot take more than 10 arguments");
          },
          parameters: function(typeOfFunc) {
            return isPresent(typeOfFunc.parameters) ? typeOfFunc.parameters : ListWrapper.createFixedSize(typeOfFunc.length);
          },
          annotations: function(typeOfFunc) {
            return isPresent(typeOfFunc.annotations) ? typeOfFunc.annotations : [];
          },
          getter: function(name) {
            return new Function('o', 'return o.' + name + ';');
          },
          setter: function(name) {
            return new Function('o', 'v', 'return o.' + name + ' = v;');
          },
          method: function(name) {
            var method = ("o." + name);
            return new Function('o', 'args', ("if (!" + method + ") throw new Error('\"" + name + "\" is undefined');") + ("return " + method + ".apply(o, args);"));
          }
        }, {});
      }()));
      Object.defineProperty(ReflectionCapabilities.prototype.factory, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(ReflectionCapabilities.prototype.getter, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
      Object.defineProperty(ReflectionCapabilities.prototype.setter, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
      Object.defineProperty(ReflectionCapabilities.prototype.method, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/reflection/src/reflection_capabilities.map

//# sourceMappingURL=./reflection_capabilities.map