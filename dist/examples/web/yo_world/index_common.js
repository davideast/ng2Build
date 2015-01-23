System.register("examples/yo_world/index_common", ["core/core", "directives/ng_repeat"], function($__export) {
  "use strict";
  var __moduleName = "examples/yo_world/index_common";
  var bootstrap,
      Component,
      Decorator,
      TemplateConfig,
      NgElement,
      NgRepeat,
      YoCmp,
      MyRepeat,
      RedDec;
  function main() {
    bootstrap(YoCmp);
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      bootstrap = m.bootstrap;
      Component = m.Component;
      Decorator = m.Decorator;
      TemplateConfig = m.TemplateConfig;
      NgElement = m.NgElement;
    }, function(m) {
      NgRepeat = m.NgRepeat;
    }],
    execute: function() {
      YoCmp = (function() {
        var YoCmp = function YoCmp() {
          this.greeting = 'Yo!';
        };
        return ($traceurRuntime.createClass)(YoCmp, {}, {});
      }());
      Object.defineProperty(YoCmp, "annotations", {get: function() {
          return [new Component({
            selector: 'yo-app',
            template: new TemplateConfig({
              inline: "\n      {{greeting}} <span red>world</span>!\n      <my-repeat></my-repeat>\n    ",
              directives: [RedDec, MyRepeat]
            })
          })];
        }});
      MyRepeat = (function() {
        var MyRepeat = function MyRepeat(element) {
          debugger;
          this.items = ['item1', 'item2'];
          this.el = element;
        };
        return ($traceurRuntime.createClass)(MyRepeat, {updateItem: function() {
            var addItem = this.el.domElement.shadowRoot.querySelector('input').value;
            this.items.push(addItem);
          }}, {});
      }());
      Object.defineProperty(MyRepeat, "annotations", {get: function() {
          return [new Component({
            selector: 'my-repeat',
            template: new TemplateConfig({
              inline: "\n    <div>\n      <button (click)=\"updateItem()\">Add</button>\n      <input type=\"text\" />\n      <div template=\"ng-repeat #item in items\">{{item}}</div>\n    </div>",
              directives: [NgRepeat]
            })
          })];
        }});
      Object.defineProperty(MyRepeat, "parameters", {get: function() {
          return [[NgElement]];
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
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/examples/src/yo_world/index_common.map

//# sourceMappingURL=./index_common.map