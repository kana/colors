angular.module('Colors', [])
.service('GameEngine', function () {
  var numberOfPlayers = 2;  // TODO: Make it customizable at runtime.
  var N = 5;

  function makeInitialGameTree() {
    // TODO: Implement.
  }

  return {
    makeInitialGameTree: makeInitialGameTree
  };
});
// vim: expandtab softtabstop=2 shiftwidth=2 foldmethod=marker
