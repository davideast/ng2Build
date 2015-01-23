System.register("examples/hello_world/index_common", ["core/core"], function($__export) {
  "use strict";
  var __moduleName = "examples/hello_world/index_common";
  var bootstrap,
      Component,
      Decorator,
      TemplateConfig,
      NgElement,
      HelloCmp,
      RedDec,
      GreetingService;
  function main() {
    bootstrap(HelloCmp);
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      bootstrap = m.bootstrap;
      Component = m.Component;
      Decorator = m.Decorator;
      TemplateConfig = m.TemplateConfig;
      NgElement = m.NgElement;
    }],
    execute: function() {
      HelloCmp = (function() {
        var HelloCmp = function HelloCmp(service) {
          this.greeting = service.greeting;
        };
        return ($traceurRuntime.createClass)(HelloCmp, {changeGreeting: function() {
            this.greeting = 'howdy';
          }}, {});
      }());
      Object.defineProperty(HelloCmp, "annotations", {get: function() {
          return [new Component({
            selector: 'hello-app',
            componentServices: [GreetingService],
            template: new TemplateConfig({
              inline: "<div class=\"greeting\">{{greeting}} <span red>world</span>!</div>\n             <button class=\"changeButton\" (click)=\"changeGreeting()\">change greeting</button>",
              directives: [RedDec]
            })
          })];
        }});
      Object.defineProperty(HelloCmp, "parameters", {get: function() {
          return [[GreetingService]];
        }});
      RedDec = (function() {
        var RedDec = function RedDec(el) {
          el.domElement.style.color = 'red';
        };
        return ($traceurRuntime.createClass)(RedDec, {}, {});
      }());
      Object.defineProperty(RedDec, "annotations", {get: function() {
          return [new Decorator({selector: '[red]'})];
        }});
      Object.defineProperty(RedDec, "parameters", {get: function() {
          return [[NgElement]];
        }});
      GreetingService = (function() {
        var GreetingService = function GreetingService() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(GreetingService, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/examples/src/hello_world/index_common.map

//# sourceMappingURL=./index_common.map