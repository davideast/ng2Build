System.register("core/application", ["di/di", "facade/lang", "facade/dom", "./compiler/compiler", "./compiler/view", "reflection/reflection", "change_detection/change_detection", "./compiler/template_loader", "./compiler/directive_metadata_reader", "./compiler/directive_metadata", "facade/collection", "facade/async", "core/zone/vm_turn_zone", "core/life_cycle/life_cycle"], function($__export) {
  "use strict";
  var __moduleName = "core/application";
  var Injector,
      bind,
      OpaqueToken,
      Type,
      FIELD,
      isBlank,
      isPresent,
      BaseException,
      assertionsEnabled,
      print,
      DOM,
      Element,
      Compiler,
      CompilerCache,
      ProtoView,
      Reflector,
      reflector,
      Parser,
      Lexer,
      ChangeDetector,
      RecordRange,
      TemplateLoader,
      DirectiveMetadataReader,
      DirectiveMetadata,
      List,
      ListWrapper,
      PromiseWrapper,
      VmTurnZone,
      LifeCycle,
      _rootInjector,
      _rootBindings,
      appViewToken,
      appRecordRangeToken,
      appElementToken,
      appComponentAnnotatedTypeToken,
      appDocumentToken;
  function _injectorBindings(appComponentType) {
    return [bind(appDocumentToken).toValue(DOM.defaultDoc()), bind(appComponentAnnotatedTypeToken).toFactory((function(reader) {
      return reader.read(appComponentType);
    }), [DirectiveMetadataReader]), bind(appElementToken).toFactory((function(appComponentAnnotatedType, appDocument) {
      var selector = appComponentAnnotatedType.annotation.selector;
      var element = DOM.querySelector(appDocument, selector);
      if (isBlank(element)) {
        throw new BaseException(("The app selector \"" + selector + "\" did not match any elements"));
      }
      return element;
    }), [appComponentAnnotatedTypeToken, appDocumentToken]), bind(appViewToken).toAsyncFactory((function(compiler, injector, appElement, appComponentAnnotatedType) {
      return compiler.compile(appComponentAnnotatedType.type, null).then((function(protoView) {
        var appProtoView = ProtoView.createRootProtoView(protoView, appElement, appComponentAnnotatedType);
        var view = appProtoView.instantiate(null);
        view.hydrate(injector, null, new Object());
        return view;
      }));
    }), [Compiler, Injector, appElementToken, appComponentAnnotatedTypeToken]), bind(appRecordRangeToken).toFactory((function(rootView) {
      return rootView.recordRange;
    }), [appViewToken]), bind(ChangeDetector).toFactory((function(appRecordRange) {
      return new ChangeDetector(appRecordRange, assertionsEnabled());
    }), [appRecordRangeToken]), bind(appComponentType).toFactory((function(rootView) {
      return rootView.elementInjectors[0].getComponent();
    }), [appViewToken]), bind(LifeCycle).toClass(LifeCycle)];
  }
  function _createVmZone(givenReporter) {
    var defaultErrorReporter = (function(exception, stackTrace) {
      var longStackTrace = ListWrapper.join(stackTrace, "\n\n-----async gap-----\n");
      print((exception + "\n\n" + longStackTrace));
      throw exception;
    });
    var reporter = isPresent(givenReporter) ? givenReporter : defaultErrorReporter;
    var zone = new VmTurnZone({enableLongStackTrace: assertionsEnabled()});
    zone.initCallbacks({onErrorHandler: reporter});
    return zone;
  }
  function bootstrap(appComponentType) {
    var bindings = arguments[1] !== (void 0) ? arguments[1] : null;
    var givenBootstrapErrorReporter = arguments[2] !== (void 0) ? arguments[2] : null;
    var bootstrapProcess = PromiseWrapper.completer();
    var zone = _createVmZone(givenBootstrapErrorReporter);
    zone.run((function() {
      var appInjector = _createAppInjector(appComponentType, bindings);
      PromiseWrapper.then(appInjector.asyncGet(LifeCycle), (function(lc) {
        lc.registerWith(zone);
        lc.tick();
        bootstrapProcess.complete(appInjector);
      }), (function(err) {
        bootstrapProcess.reject(err);
      }));
    }));
    return bootstrapProcess.promise;
  }
  function _createAppInjector(appComponentType, bindings) {
    if (isBlank(_rootInjector))
      _rootInjector = new Injector(_rootBindings);
    var mergedBindings = isPresent(bindings) ? ListWrapper.concat(_injectorBindings(appComponentType), bindings) : _injectorBindings(appComponentType);
    return _rootInjector.createChild(mergedBindings);
  }
  $__export("bootstrap", bootstrap);
  return {
    setters: [function(m) {
      Injector = m.Injector;
      bind = m.bind;
      OpaqueToken = m.OpaqueToken;
    }, function(m) {
      Type = m.Type;
      FIELD = m.FIELD;
      isBlank = m.isBlank;
      isPresent = m.isPresent;
      BaseException = m.BaseException;
      assertionsEnabled = m.assertionsEnabled;
      print = m.print;
    }, function(m) {
      DOM = m.DOM;
      Element = m.Element;
    }, function(m) {
      Compiler = m.Compiler;
      CompilerCache = m.CompilerCache;
    }, function(m) {
      ProtoView = m.ProtoView;
    }, function(m) {
      Reflector = m.Reflector;
      reflector = m.reflector;
    }, function(m) {
      Parser = m.Parser;
      Lexer = m.Lexer;
      ChangeDetector = m.ChangeDetector;
      RecordRange = m.RecordRange;
    }, function(m) {
      TemplateLoader = m.TemplateLoader;
    }, function(m) {
      DirectiveMetadataReader = m.DirectiveMetadataReader;
    }, function(m) {
      DirectiveMetadata = m.DirectiveMetadata;
    }, function(m) {
      List = m.List;
      ListWrapper = m.ListWrapper;
    }, function(m) {
      PromiseWrapper = m.PromiseWrapper;
    }, function(m) {
      VmTurnZone = m.VmTurnZone;
    }, function(m) {
      LifeCycle = m.LifeCycle;
    }],
    execute: function() {
      _rootBindings = [bind(Reflector).toValue(reflector), Compiler, CompilerCache, TemplateLoader, DirectiveMetadataReader, Parser, Lexer];
      appViewToken = $__export("appViewToken", new OpaqueToken('AppView'));
      appRecordRangeToken = $__export("appRecordRangeToken", new OpaqueToken('AppRecordRange'));
      appElementToken = $__export("appElementToken", new OpaqueToken('AppElement'));
      appComponentAnnotatedTypeToken = $__export("appComponentAnnotatedTypeToken", new OpaqueToken('AppComponentAnnotatedType'));
      appDocumentToken = $__export("appDocumentToken", new OpaqueToken('AppDocument'));
      Object.defineProperty(_createVmZone, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(bootstrap, "parameters", {get: function() {
          return [[Type], [], []];
        }});
      Object.defineProperty(_createAppInjector, "parameters", {get: function() {
          return [[Type], [List]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/core/src/application.map

//# sourceMappingURL=./application.map