System.register("benchmarks/tree/tree_benchmark", ["change_detection/change_detection", "core/core", "core/compiler/compiler", "core/compiler/directive_metadata_reader", "core/compiler/template_loader", "core/life_cycle/life_cycle", "reflection/reflection", "facade/dom", "facade/lang", "e2e_test_lib/benchmark_util"], function($__export) {
  "use strict";
  var __moduleName = "benchmarks/tree/tree_benchmark";
  var Parser,
      Lexer,
      ChangeDetector,
      bootstrap,
      Component,
      Template,
      TemplateConfig,
      ViewPort,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      TemplateLoader,
      LifeCycle,
      reflector,
      DOM,
      document,
      window,
      Element,
      gc,
      isPresent,
      getIntParameter,
      bindAction,
      TreeNode,
      BASELINE_TREE_TEMPLATE,
      BASELINE_IF_TEMPLATE,
      BaseLineTreeComponent,
      BaseLineInterpolation,
      BaseLineIf,
      AppComponent,
      NgIf,
      TreeComponent;
  function setupReflector() {
    reflector.registerType(AppComponent, {
      'factory': (function() {
        return new AppComponent();
      }),
      'parameters': [],
      'annotations': [new Component({
        selector: 'app',
        template: new TemplateConfig({
          directives: [TreeComponent],
          inline: "<tree [data]='initData'></tree>"
        })
      })]
    });
    reflector.registerType(TreeComponent, {
      'factory': (function() {
        return new TreeComponent();
      }),
      'parameters': [],
      'annotations': [new Component({
        selector: 'tree',
        bind: {'data': 'data'},
        template: new TemplateConfig({
          directives: [TreeComponent, NgIf],
          inline: "\n    <span> {{data.value}}\n       <span template='ng-if data.right != null'><tree [data]='data.right'></tree></span>\n       <span template='ng-if data.left != null'><tree [data]='data.left'></tree></span>\n    </span>"
        })
      })]
    });
    reflector.registerType(NgIf, {
      'factory': (function(vp) {
        return new NgIf(vp);
      }),
      'parameters': [[ViewPort]],
      'annotations': [new Template({
        selector: '[ng-if]',
        bind: {'ng-if': 'ngIf'}
      })]
    });
    reflector.registerType(Compiler, {
      'factory': (function(templateLoader, reader, parser, compilerCache) {
        return new Compiler(templateLoader, reader, parser, compilerCache);
      }),
      'parameters': [[TemplateLoader], [DirectiveMetadataReader], [Parser], [CompilerCache]],
      'annotations': []
    });
    reflector.registerType(CompilerCache, {
      'factory': (function() {
        return new CompilerCache();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(Parser, {
      'factory': (function(lexer) {
        return new Parser(lexer);
      }),
      'parameters': [[Lexer]],
      'annotations': []
    });
    reflector.registerType(TemplateLoader, {
      'factory': (function() {
        return new TemplateLoader();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(DirectiveMetadataReader, {
      'factory': (function() {
        return new DirectiveMetadataReader();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(Lexer, {
      'factory': (function() {
        return new Lexer();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(LifeCycle, {
      "factory": (function(cd) {
        return new LifeCycle(cd);
      }),
      "parameters": [[ChangeDetector]],
      "annotations": []
    });
    reflector.registerGetters({
      'value': (function(a) {
        return a.value;
      }),
      'left': (function(a) {
        return a.left;
      }),
      'right': (function(a) {
        return a.right;
      }),
      'initData': (function(a) {
        return a.initData;
      }),
      'data': (function(a) {
        return a.data;
      })
    });
    reflector.registerSetters({
      'value': (function(a, v) {
        return a.value = v;
      }),
      'left': (function(a, v) {
        return a.left = v;
      }),
      'right': (function(a, v) {
        return a.right = v;
      }),
      'initData': (function(a, v) {
        return a.initData = v;
      }),
      'data': (function(a, v) {
        return a.data = v;
      }),
      'ngIf': (function(a, v) {
        return a.ngIf = v;
      })
    });
  }
  function main() {
    var maxDepth = getIntParameter('depth');
    setupReflector();
    var app;
    var changeDetector;
    var baselineRootTreeComponent;
    var count = 0;
    function ng2DestroyDom() {
      app.initData = new TreeNode('', null, null);
      changeDetector.detectChanges();
    }
    function profile(create, destroy, name) {
      return function() {
        window.console.profile(name + ' w GC');
        var duration = 0;
        var count = 0;
        while (count++ < 150) {
          gc();
          var start = window.performance.now();
          create();
          duration += window.performance.now() - start;
          destroy();
        }
        window.console.profileEnd(name + ' w GC');
        window.console.log(("Iterations: " + count + "; time: " + duration / count + " ms / iteration"));
        window.console.profile(name + ' w/o GC');
        duration = 0;
        count = 0;
        while (count++ < 150) {
          var start = window.performance.now();
          create();
          duration += window.performance.now() - start;
          destroy();
        }
        window.console.profileEnd(name + ' w/o GC');
        window.console.log(("Iterations: " + count + "; time: " + duration / count + " ms / iteration"));
      };
    }
    function ng2CreateDom() {
      var values = count++ % 2 == 0 ? ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*'] : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', '-'];
      app.initData = buildTree(maxDepth, values, 0);
      changeDetector.detectChanges();
    }
    function noop() {}
    function initNg2() {
      bootstrap(AppComponent).then((function(injector) {
        changeDetector = injector.get(ChangeDetector);
        app = injector.get(AppComponent);
        bindAction('#ng2DestroyDom', ng2DestroyDom);
        bindAction('#ng2CreateDom', ng2CreateDom);
        bindAction('#ng2UpdateDomProfile', profile(ng2CreateDom, noop, 'ng2-update'));
        bindAction('#ng2CreateDomProfile', profile(ng2CreateDom, ng2DestroyDom, 'ng2-create'));
      }));
    }
    function baselineDestroyDom() {
      baselineRootTreeComponent.update(new TreeNode('', null, null));
    }
    function baselineCreateDom() {
      var values = count++ % 2 == 0 ? ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*'] : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', '-'];
      baselineRootTreeComponent.update(buildTree(maxDepth, values, 0));
    }
    function initBaseline() {
      var tree = DOM.createElement('tree');
      DOM.appendChild(DOM.querySelector(document, 'baseline'), tree);
      baselineRootTreeComponent = new BaseLineTreeComponent(tree);
      bindAction('#baselineDestroyDom', baselineDestroyDom);
      bindAction('#baselineCreateDom', baselineCreateDom);
      bindAction('#baselineUpdateDomProfile', profile(baselineCreateDom, noop, 'baseline-update'));
      bindAction('#baselineCreateDomProfile', profile(baselineCreateDom, baselineDestroyDom, 'baseline-create'));
    }
    initNg2();
    initBaseline();
  }
  function buildTree(maxDepth, values, curDepth) {
    if (maxDepth === curDepth)
      return new TreeNode('', null, null);
    return new TreeNode(values[curDepth], buildTree(maxDepth, values, curDepth + 1), buildTree(maxDepth, values, curDepth + 1));
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      Parser = m.Parser;
      Lexer = m.Lexer;
      ChangeDetector = m.ChangeDetector;
    }, function(m) {
      bootstrap = m.bootstrap;
      Component = m.Component;
      Template = m.Template;
      TemplateConfig = m.TemplateConfig;
      ViewPort = m.ViewPort;
      Compiler = m.Compiler;
    }, function(m) {
      CompilerCache = m.CompilerCache;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      TemplateLoader = m.TemplateLoader;
    }, function(m) {
      LifeCycle = m.LifeCycle;
    }, function(m) {
      reflector = m.reflector;
    }, function(m) {
      DOM = m.DOM;
      document = m.document;
      window = m.window;
      Element = m.Element;
      gc = m.gc;
    }, function(m) {
      isPresent = m.isPresent;
    }, function(m) {
      getIntParameter = m.getIntParameter;
      bindAction = m.bindAction;
    }],
    execute: function() {
      TreeNode = (function() {
        var TreeNode = function TreeNode(value, left, right) {
          this.value = value;
          this.left = left;
          this.right = right;
        };
        return ($traceurRuntime.createClass)(TreeNode, {}, {});
      }());
      BASELINE_TREE_TEMPLATE = DOM.createTemplate('<span>_<template class="ng-binding"></template><template class="ng-binding"></template></span>');
      BASELINE_IF_TEMPLATE = DOM.createTemplate('<span template="ng-if"><tree></tree></span>');
      BaseLineTreeComponent = (function() {
        var BaseLineTreeComponent = function BaseLineTreeComponent(element) {
          this.element = element;
          var clone = DOM.clone(BASELINE_TREE_TEMPLATE.content.firstChild);
          var shadowRoot = this.element.createShadowRoot();
          DOM.appendChild(shadowRoot, clone);
          var child = clone.firstChild;
          this.value = new BaseLineInterpolation(child);
          child = DOM.nextSibling(child);
          this.left = new BaseLineIf(child);
          child = DOM.nextSibling(child);
          this.right = new BaseLineIf(child);
        };
        return ($traceurRuntime.createClass)(BaseLineTreeComponent, {update: function(value) {
            this.value.update(value.value);
            this.left.update(value.left);
            this.right.update(value.right);
          }}, {});
      }());
      Object.defineProperty(BaseLineTreeComponent.prototype.update, "parameters", {get: function() {
          return [[TreeNode]];
        }});
      BaseLineInterpolation = (function() {
        var BaseLineInterpolation = function BaseLineInterpolation(textNode) {
          this.value = null;
          this.textNode = textNode;
        };
        return ($traceurRuntime.createClass)(BaseLineInterpolation, {update: function(value) {
            if (this.value !== value) {
              this.value = value;
              DOM.setText(this.textNode, value + ' ');
            }
          }}, {});
      }());
      Object.defineProperty(BaseLineInterpolation.prototype.update, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
      BaseLineIf = (function() {
        var BaseLineIf = function BaseLineIf(anchor) {
          this.anchor = anchor;
          this.condition = false;
          this.component = null;
        };
        return ($traceurRuntime.createClass)(BaseLineIf, {update: function(value) {
            var newCondition = isPresent(value);
            if (this.condition !== newCondition) {
              this.condition = newCondition;
              if (isPresent(this.component)) {
                this.component.element.remove();
                this.component = null;
              }
              if (this.condition) {
                var element = DOM.firstChild(DOM.clone(BASELINE_IF_TEMPLATE).content);
                this.anchor.parentNode.insertBefore(element, DOM.nextSibling(this.anchor));
                this.component = new BaseLineTreeComponent(DOM.firstChild(element));
              }
            }
            if (isPresent(this.component)) {
              this.component.update(value);
            }
          }}, {});
      }());
      Object.defineProperty(BaseLineIf.prototype.update, "parameters", {get: function() {
          return [[TreeNode]];
        }});
      AppComponent = (function() {
        var AppComponent = function AppComponent() {
          this.initData = new TreeNode('', null, null);
        };
        return ($traceurRuntime.createClass)(AppComponent, {}, {});
      }());
      NgIf = (function() {
        var NgIf = function NgIf(viewPort) {
          this._viewPort = viewPort;
        };
        return ($traceurRuntime.createClass)(NgIf, {set ngIf(value) {
            if (this._viewPort.length > 0) {
              this._viewPort.remove(0);
            }
            if (value) {
              this._viewPort.create();
            }
          }}, {});
      }());
      Object.defineProperty(NgIf, "parameters", {get: function() {
          return [[ViewPort]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(NgIf.prototype, "ngIf").set, "parameters", {get: function() {
          return [[$traceurRuntime.type.boolean]];
        }});
      TreeComponent = (function() {
        var TreeComponent = function TreeComponent() {};
        return ($traceurRuntime.createClass)(TreeComponent, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/benchmarks/src/tree/tree_benchmark.map

//# sourceMappingURL=./tree_benchmark.map