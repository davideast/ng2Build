System.register("examples/hello_world/index_static", ["./index_common", "core/core", "change_detection/change_detection", "core/life_cycle/life_cycle", "core/compiler/compiler", "core/compiler/directive_metadata_reader", "core/compiler/template_loader", "reflection/reflection"], function($__export) {
  "use strict";
  var __moduleName = "examples/hello_world/index_static";
  var app,
      Component,
      Decorator,
      TemplateConfig,
      NgElement,
      Lexer,
      Parser,
      ChangeDetector,
      LifeCycle,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      TemplateLoader,
      reflector;
  function setup() {
    reflector.registerType(app.HelloCmp, {
      "factory": (function(service) {
        return new app.HelloCmp(service);
      }),
      "parameters": [[app.GreetingService]],
      "annotations": [new Component({
        selector: 'hello-app',
        componentServices: [app.GreetingService],
        template: new TemplateConfig({
          directives: [app.RedDec],
          inline: "<div class=\"greeting\">{{greeting}} <span red>world</span>!</div>\n                 <button class=\"changeButton\" (click)=\"changeGreeting()\">change greeting</button>"
        })
      })]
    });
    reflector.registerType(app.RedDec, {
      "factory": (function(el) {
        return new app.RedDec(el);
      }),
      "parameters": [[NgElement]],
      "annotations": [new Decorator({selector: '[red]'})]
    });
    reflector.registerType(app.GreetingService, {
      "factory": (function() {
        return new app.GreetingService();
      }),
      "parameters": [],
      "annotations": []
    });
    reflector.registerType(Compiler, {
      "factory": (function(templateLoader, reader, parser, compilerCache) {
        return new Compiler(templateLoader, reader, parser, compilerCache);
      }),
      "parameters": [[TemplateLoader], [DirectiveMetadataReader], [Parser], [CompilerCache]],
      "annotations": []
    });
    reflector.registerType(CompilerCache, {
      "factory": (function() {
        return new CompilerCache();
      }),
      "parameters": [],
      "annotations": []
    });
    reflector.registerType(Parser, {
      "factory": (function(lexer) {
        return new Parser(lexer);
      }),
      "parameters": [[Lexer]],
      "annotations": []
    });
    reflector.registerType(TemplateLoader, {
      "factory": (function() {
        return new TemplateLoader();
      }),
      "parameters": [],
      "annotations": []
    });
    reflector.registerType(DirectiveMetadataReader, {
      "factory": (function() {
        return new DirectiveMetadataReader();
      }),
      "parameters": [],
      "annotations": []
    });
    reflector.registerType(Lexer, {
      "factory": (function() {
        return new Lexer();
      }),
      "parameters": [],
      "annotations": []
    });
    reflector.registerType(LifeCycle, {
      "factory": (function(cd) {
        return new LifeCycle(cd);
      }),
      "parameters": [[ChangeDetector]],
      "annotations": []
    });
    reflector.registerGetters({"greeting": (function(a) {
        return a.greeting;
      })});
    reflector.registerSetters({"greeting": (function(a, v) {
        return a.greeting = v;
      })});
    reflector.registerMethods({"changeGreeting": (function(obj, args) {
        return obj.changeGreeting();
      })});
  }
  function main() {
    setup();
    app.main();
  }
  $__export("main", main);
  return {
    setters: [function(m) {
      app = m;
    }, function(m) {
      Component = m.Component;
      Decorator = m.Decorator;
      TemplateConfig = m.TemplateConfig;
      NgElement = m.NgElement;
    }, function(m) {
      Lexer = m.Lexer;
      Parser = m.Parser;
      ChangeDetector = m.ChangeDetector;
    }, function(m) {
      LifeCycle = m.LifeCycle;
    }, function(m) {
      Compiler = m.Compiler;
      CompilerCache = m.CompilerCache;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      TemplateLoader = m.TemplateLoader;
    }, function(m) {
      reflector = m.reflector;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/examples/src/hello_world/index_static.map

//# sourceMappingURL=./index_static.map