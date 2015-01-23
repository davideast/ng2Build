# Angular 2 Build

Angular 2 is not packaged or ready for production.

### Installation

1. Clone this repo
2. Wrap your code in a System.import

```javascript
System.import('core/core')
.then((ng) => {

  // Do your Angular 2 magic here

});
```

### How It's Done
1. Run the gulp build command from the Angular 2 repo.
2. Copy the entire `dist/js/prod` folder is copied from dist path of the Angular 2 repo.
3. Get the latest version of traceur.js
4. Create an `index.html` file inside of the `dist` folder.
5. Include the following scripts in the `index.html` file
```html
<script src="/traceur.js"></script>
<script src="/deps/traceur-runtime.js"></script>
<script src="/rtts_assert/lib/rtts_assert.js"></script>
<script src="/deps/es6-module-loader-sans-promises.src.js"></script>
<script src="/deps/zone.js"></script>
<script src="/deps/long-stack-trace-zone.js"></script>
<script src="/deps/system.src.js"></script>
<script src="/deps/extension-register.js"></script>
<script src="/deps/runtime_paths.js"></script>
```
6. Bootstrap Traceur and set it to use the experimental features for AtScript. Insert this script block below the scripts above.
```html
<script>
new traceur.WebPageTranscoder(document.location.href).run();
$traceurRuntime.options.types = true;
$traceurRuntime.options.annotations = true;
$traceurRuntime.options.memberVariables = true;
</script>
```
7. Create a script block of `type=module`.
```html
<script type="module">
</script>
```
8. Import the Angular core with System.js.
```html
<script type="module">
  System.import('core/core')
  .then((ng) => {

    // Do your Angular 2 magic here

  });
</script>
```

### Known Issues

#### Traceur processes the page twice
The page is processed first without Traceur, then with Traceur. You'll see errors from this first processing. There is no fix for this yet, but to help separate these erroenous Traceur errors from your real errors set a `console.log` after your import of Angular core (`System.import('core/core')`).

```javascript
System.import('core/core')
.then((ng) => {
  console.log('^-- Those errors are from the first processing without Traceur. Please ignore me, I will be fixed soon.');
});
```
