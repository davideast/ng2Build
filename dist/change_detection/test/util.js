System.register("change_detection/test/util", ["facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "change_detection/test/util";
  var isBlank;
  function arrayChangesAsString($__0) {
    var $__1 = $__0,
        collection = $__1.collection,
        previous = $__1.previous,
        additions = $__1.additions,
        moves = $__1.moves,
        removals = $__1.removals;
    if (isBlank(collection))
      collection = [];
    if (isBlank(previous))
      previous = [];
    if (isBlank(additions))
      additions = [];
    if (isBlank(moves))
      moves = [];
    if (isBlank(removals))
      removals = [];
    return "collection: " + collection.join(', ') + "\n" + "previous: " + previous.join(', ') + "\n" + "additions: " + additions.join(', ') + "\n" + "moves: " + moves.join(', ') + "\n" + "removals: " + removals.join(', ') + "\n";
  }
  function kvChangesAsString($__0) {
    var $__1 = $__0,
        map = $__1.map,
        previous = $__1.previous,
        additions = $__1.additions,
        changes = $__1.changes,
        removals = $__1.removals;
    if (isBlank(map))
      map = [];
    if (isBlank(previous))
      previous = [];
    if (isBlank(additions))
      additions = [];
    if (isBlank(changes))
      changes = [];
    if (isBlank(removals))
      removals = [];
    return "map: " + map.join(', ') + "\n" + "previous: " + previous.join(', ') + "\n" + "additions: " + additions.join(', ') + "\n" + "changes: " + changes.join(', ') + "\n" + "removals: " + removals.join(', ') + "\n";
  }
  $__export("arrayChangesAsString", arrayChangesAsString);
  $__export("kvChangesAsString", kvChangesAsString);
  return {
    setters: [function(m) {
      isBlank = m.isBlank;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=/Users/deast/Angular/angular/modules/change_detection/test/util.map

//# sourceMappingURL=./util.map