angular.module('Colors', [])
.service('GameEngine', function () {
  var numberOfPlayers = 2;  // TODO: Make it customizable at runtime.
  var N = 5;

  function random(n) {
    return Math.floor(Math.random() * n);
  }

  function shuffleInPlace(xs) {
    var n = xs.length;
    for (var i = n - 1; 1 <= i; n--) {
      var j = random(i + 1);
      var t = xs[i];
      xs[i] = xs[j];
      xs[j] = t;
    }
  }

  function makeGameTree(board, players, turn) {
    return {
      board: board,
      players: players,
      turn: turn,
      moves: listMoves(board, players, turn)
    };
  }

  function listMoves(board, players, turn) {
    return [];  // TODO: Implement.
  }

  function makeCard(x, y) {
    return {x: x, y: y};
  }

  function makeJoker() {
    return {joker: true};
  }

  function makeInitialGameTree() {
    // TODO: Implement.
  }

  return {
    makeInitialGameTree: makeInitialGameTree
  };
});
// vim: expandtab softtabstop=2 shiftwidth=2 foldmethod=marker
