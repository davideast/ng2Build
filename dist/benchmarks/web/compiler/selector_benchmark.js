System.register("benchmarks/compiler/selector_benchmark", ["core/compiler/selector", "facade/lang", "facade/collection", "e2e_test_lib/benchmark_util"], function($__export) {
  "use strict";
  var __moduleName = "benchmarks/compiler/selector_benchmark";
  var SelectorMatcher,
      CssSelector,
      StringWrapper,
      Math,
      ListWrapper,
      getIntParameter,
      bindAction;
  function main() {
    var count = getIntParameter('selectors');
    var fixedMatcher;
    var fixedSelectorStrings = [];
    var fixedSelectors = [];
    for (var i = 0; i < count; i++) {
      ListWrapper.push(fixedSelectorStrings, randomSelector());
    }
    for (var i = 0; i < count; i++) {
      ListWrapper.push(fixedSelectors, CssSelector.parse(fixedSelectorStrings[i]));
    }
    fixedMatcher = new SelectorMatcher();
    for (var i = 0; i < count; i++) {
      fixedMatcher.addSelectable(fixedSelectors[i], i);
    }
    function parse() {
      var result = [];
      for (var i = 0; i < count; i++) {
        ListWrapper.push(result, CssSelector.parse(fixedSelectorStrings[i]));
      }
      return result;
    }
    function addSelectable() {
      var matcher = new SelectorMatcher();
      for (var i = 0; i < count; i++) {
        matcher.addSelectable(fixedSelectors[i], i);
      }
      return matcher;
    }
    function match() {
      var matchCount = 0;
      for (var i = 0; i < count; i++) {
        fixedMatcher.match(fixedSelectors[i], (function(selected) {
          matchCount += selected;
        }));
      }
      return matchCount;
    }
    bindAction('#parse', parse);
    bindAction('#addSelectable', addSelectable);
    bindAction('#match', match);
  }
  function randomSelector() {
    var res = randomStr(5);
    for (var i = 0; i < 3; i++) {
      res += '.' + randomStr(5);
    }
    for (var i = 0; i < 3; i++) {
      res += '[' + randomStr(3) + '=' + randomStr(6) + ']';
    }
    return res;
  }
  function randomStr(len) {
    var s = '';
    while (s.length < len) {
      s += randomChar();
    }
    return s;
  }
  function randomChar() {
    var n = randomNum(62);
    if (n < 10)
      return n.toString();
    if (n < 36)
      return StringWrapper.fromCharCode(n + 55);
    return StringWrapper.fromCharCode(n + 61);
  }
  function randomNum(max) {
    return Math.floor(Math.random() * max);
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      SelectorMatcher = m.SelectorMatcher;
      CssSelector = m.CssSelector;
    }, function(m) {
      StringWrapper = m.StringWrapper;
      Math = m.Math;
    }, function(m) {
      ListWrapper = m.ListWrapper;
    }, function(m) {
      getIntParameter = m.getIntParameter;
      bindAction = m.bindAction;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/benchmarks/src/compiler/selector_benchmark.map

//# sourceMappingURL=./selector_benchmark.map