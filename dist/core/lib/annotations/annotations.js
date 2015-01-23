System.register("core/annotations/annotations", ["facade/lang", "facade/collection", "./template_config", "../compiler/shadow_dom"], function($__export) {
  "use strict";
  var __moduleName = "core/annotations/annotations";
  var ABSTRACT,
      CONST,
      normalizeBlank,
      List,
      TemplateConfig,
      ShadowDomStrategy,
      Directive,
      Component,
      Decorator,
      Template;
  return {
    setters: [function(m) {
      ABSTRACT = m.ABSTRACT;
      CONST = m.CONST;
      normalizeBlank = m.normalizeBlank;
    }, function(m) {
      List = m.List;
    }, function(m) {
      TemplateConfig = m.TemplateConfig;
    }, function(m) {
      ShadowDomStrategy = m.ShadowDomStrategy;
    }],
    execute: function() {
      Directive = $__export("Directive", (function() {
        var Directive = function Directive() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              bind = $__1.bind,
              lightDomServices = $__1.lightDomServices,
              implementsTypes = $__1.implementsTypes;
          this.selector = selector;
          this.lightDomServices = lightDomServices;
          this.implementsTypes = implementsTypes;
          this.bind = bind;
        };
        return ($traceurRuntime.createClass)(Directive, {}, {});
      }()));
      Object.defineProperty(Directive, "annotations", {get: function() {
          return [new ABSTRACT(), new CONST()];
        }});
      Component = $__export("Component", (function($__super) {
        var Component = function Component() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              bind = $__1.bind,
              template = $__1.template,
              lightDomServices = $__1.lightDomServices,
              shadowDomServices = $__1.shadowDomServices,
              componentServices = $__1.componentServices,
              implementsTypes = $__1.implementsTypes,
              shadowDom = $__1.shadowDom;
          $traceurRuntime.superConstructor(Component).call(this, {
            selector: selector,
            bind: bind,
            lightDomServices: lightDomServices,
            implementsTypes: implementsTypes
          });
          this.template = template;
          this.lightDomServices = lightDomServices;
          this.shadowDomServices = shadowDomServices;
          this.componentServices = componentServices;
          this.shadowDom = shadowDom;
        };
        return ($traceurRuntime.createClass)(Component, {}, {}, $__super);
      }(Directive)));
      Object.defineProperty(Component, "annotations", {get: function() {
          return [new CONST()];
        }});
      Decorator = $__export("Decorator", (function($__super) {
        var Decorator = function Decorator() {
          var $__2;
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              bind = $__1.bind,
              lightDomServices = $__1.lightDomServices,
              implementsTypes = $__1.implementsTypes,
              compileChildren = ($__2 = $__1.compileChildren) === void 0 ? true : $__2;
          this.compileChildren = compileChildren;
          $traceurRuntime.superConstructor(Decorator).call(this, {
            selector: selector,
            bind: bind,
            lightDomServices: lightDomServices,
            implementsTypes: implementsTypes
          });
        };
        return ($traceurRuntime.createClass)(Decorator, {}, {}, $__super);
      }(Directive)));
      Object.defineProperty(Decorator, "annotations", {get: function() {
          return [new CONST()];
        }});
      Template = $__export("Template", (function($__super) {
        var Template = function Template() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              bind = $__1.bind,
              lightDomServices = $__1.lightDomServices,
              implementsTypes = $__1.implementsTypes;
          $traceurRuntime.superConstructor(Template).call(this, {
            selector: selector,
            bind: bind,
            lightDomServices: lightDomServices,
            implementsTypes: implementsTypes
          });
        };
        return ($traceurRuntime.createClass)(Template, {}, {}, $__super);
      }(Directive)));
      Object.defineProperty(Template, "annotations", {get: function() {
          return [new CONST()];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/annotations/annotations.map

//# sourceMappingURL=./annotations.map