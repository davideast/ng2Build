System.register("core/test/application_spec", ["test_lib/test_lib", "core/application", "core/annotations/annotations", "facade/dom", "facade/collection", "facade/async", "di/di", "core/annotations/template_config"], function($__export) {
  "use strict";
  var __moduleName = "core/test/application_spec";
  var describe,
      ddescribe,
      it,
      iit,
      xit,
      xdescribe,
      expect,
      beforeEach,
      bootstrap,
      appDocumentToken,
      appElementToken,
      Component,
      DOM,
      ListWrapper,
      PromiseWrapper,
      bind,
      Inject,
      TemplateConfig,
      HelloRootCmp,
      HelloRootCmp2,
      HelloRootCmp3;
  function main() {
    var fakeDoc,
        el,
        el2,
        testBindings;
    beforeEach((function() {
      fakeDoc = DOM.createHtmlDocument();
      el = DOM.createElement('hello-app', fakeDoc);
      el2 = DOM.createElement('hello-app-2', fakeDoc);
      DOM.appendChild(fakeDoc.body, el);
      DOM.appendChild(fakeDoc.body, el2);
      testBindings = [bind(appDocumentToken).toValue(fakeDoc)];
    }));
    describe('bootstrap factory method', (function() {
      it('should throw if no element is found', (function(done) {
        var injectorPromise = bootstrap(HelloRootCmp, [], (function(e, t) {
          throw e;
        }));
        PromiseWrapper.then(injectorPromise, null, (function(reason) {
          expect(reason.message).toContain('The app selector "hello-app" did not match any elements');
          done();
        }));
      }));
      it('should create an injector promise', (function() {
        var injectorPromise = bootstrap(HelloRootCmp, testBindings);
        expect(injectorPromise).not.toBe(null);
      }));
      it('should resolve an injector promise and contain bindings', (function(done) {
        var injectorPromise = bootstrap(HelloRootCmp, testBindings);
        injectorPromise.then((function(injector) {
          expect(injector.get(appElementToken)).toBe(el);
          done();
        }));
      }));
      it('should provide the application component in the injector', (function(done) {
        var injectorPromise = bootstrap(HelloRootCmp, testBindings);
        injectorPromise.then((function(injector) {
          expect(injector.get(HelloRootCmp)).toBeAnInstanceOf(HelloRootCmp);
          done();
        }));
      }));
      it('should display hello world', (function(done) {
        var injectorPromise = bootstrap(HelloRootCmp, testBindings);
        injectorPromise.then((function(injector) {
          expect(injector.get(appElementToken).shadowRoot.childNodes[0].nodeValue).toEqual('hello world!');
          done();
        }));
      }));
      it('should support multiple calls to bootstrap', (function(done) {
        var injectorPromise1 = bootstrap(HelloRootCmp, testBindings);
        var injectorPromise2 = bootstrap(HelloRootCmp2, testBindings);
        PromiseWrapper.all([injectorPromise1, injectorPromise2]).then((function(injectors) {
          expect(injectors[0].get(appElementToken).shadowRoot.childNodes[0].nodeValue).toEqual('hello world!');
          expect(injectors[1].get(appElementToken).shadowRoot.childNodes[0].nodeValue).toEqual('hello world, again!');
          done();
        }));
      }));
      it("should make the provided binings available to the application component", (function(done) {
        var injectorPromise = bootstrap(HelloRootCmp3, [testBindings, bind("appBinding").toValue("BoundValue")]);
        injectorPromise.then((function(injector) {
          expect(injector.get(HelloRootCmp3).appBinding).toEqual("BoundValue");
          done();
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      describe = m.describe;
      ddescribe = m.ddescribe;
      it = m.it;
      iit = m.iit;
      xit = m.xit;
      xdescribe = m.xdescribe;
      expect = m.expect;
      beforeEach = m.beforeEach;
    }, function(m) {
      bootstrap = m.bootstrap;
      appDocumentToken = m.appDocumentToken;
      appElementToken = m.appElementToken;
    }, function(m) {
      Component = m.Component;
    }, function(m) {
      DOM = m.DOM;
    }, function(m) {
      ListWrapper = m.ListWrapper;
    }, function(m) {
      PromiseWrapper = m.PromiseWrapper;
    }, function(m) {
      bind = m.bind;
      Inject = m.Inject;
    }, function(m) {
      TemplateConfig = m.TemplateConfig;
    }],
    execute: function() {
      HelloRootCmp = (function() {
        var HelloRootCmp = function HelloRootCmp() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(HelloRootCmp, {}, {});
      }());
      Object.defineProperty(HelloRootCmp, "annotations", {get: function() {
          return [new Component({
            selector: 'hello-app',
            template: new TemplateConfig({
              inline: '{{greeting}} world!',
              directives: []
            })
          })];
        }});
      HelloRootCmp2 = (function() {
        var HelloRootCmp2 = function HelloRootCmp2() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(HelloRootCmp2, {}, {});
      }());
      Object.defineProperty(HelloRootCmp2, "annotations", {get: function() {
          return [new Component({
            selector: 'hello-app-2',
            template: new TemplateConfig({
              inline: '{{greeting}} world, again!',
              directives: []
            })
          })];
        }});
      HelloRootCmp3 = (function() {
        var HelloRootCmp3 = function HelloRootCmp3(appBinding) {
          this.appBinding = appBinding;
        };
        return ($traceurRuntime.createClass)(HelloRootCmp3, {}, {});
      }());
      Object.defineProperty(HelloRootCmp3, "annotations", {get: function() {
          return [new Component({
            selector: 'hello-app',
            template: new TemplateConfig({
              inline: '',
              directives: []
            })
          })];
        }});
      Object.defineProperty(HelloRootCmp3, "parameters", {get: function() {
          return [[new Inject("appBinding")]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/test/application_spec.map

//# sourceMappingURL=./application_spec.map