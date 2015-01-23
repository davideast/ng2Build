System.register("e2e_test_lib/benchmark_util", ["facade/dom", "facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "e2e_test_lib/benchmark_util";
  var DOM,
      document,
      location,
      NumberWrapper,
      BaseException,
      isBlank;
  function getIntParameter(name) {
    return NumberWrapper.parseInt(getStringParameter(name), 10);
  }
  function getStringParameter(name) {
    var els = DOM.querySelectorAll(document, ("input[name=\"" + name + "\"]"));
    var value;
    var el;
    for (var i = 0; i < els.length; i++) {
      el = els[i];
      if ((el.type !== 'radio' && el.type !== 'checkbox') || el.checked) {
        value = el.value;
        break;
      }
    }
    if (isBlank(value)) {
      throw new BaseException(("Could not find and input field with name " + name));
    }
    return value;
  }
  function bindAction(selector, callback) {
    var el = DOM.querySelector(document, selector);
    DOM.on(el, 'click', function(_) {
      callback();
    });
  }
  $__export("getIntParameter", getIntParameter);
  $__export("getStringParameter", getStringParameter);
  $__export("bindAction", bindAction);
  return {
    setters: [function(m) {
      DOM = m.DOM;
      document = m.document;
      location = m.location;
    }, function(m) {
      NumberWrapper = m.NumberWrapper;
      BaseException = m.BaseException;
      isBlank = m.isBlank;
    }],
    execute: function() {
      Object.defineProperty(getIntParameter, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
      Object.defineProperty(getStringParameter, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
      Object.defineProperty(bindAction, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], [Function]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/e2e_test_lib/src/benchmark_util.map

//# sourceMappingURL=./benchmark_util.map