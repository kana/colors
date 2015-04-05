angular.module('Colors', [])
.service('GameEngine', function () {
  var numberOfPlayers = 2;  // TODO: Make it customizable at runtime.
  var N = 5;
  var COLORS = 'WUBRG';

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

  function makeCard(columnColor, rowColor) {
    return {columnColor: columnColor, rowColor: rowColor};
  }

  function makeJoker() {
    return {joker: true};
  }

  function makeCardSet() {
    var baseCards = [];
    for (var i = 0; i < N; i++)
      baseCards.push(makeCard(COLORS[i], COLORS[i]));

    var freeCards = [];
    for (var x = 0; x < N; x++) {
      for (var y = 0; y < N; y++) {
        if (x != y)
          freeCards.push(makeCard(COLORS[x], COLORS[y]));
      }
    }
    freeCards.push(makeJoker());

    return {
      baseCards: baseCards,
      freeCards: freeCards
    };
  }

  function ix(x, y) {
    return x + N * y;
  }

  function makeInitialGameTree() {
    // TODO: Implement.
  }

  return {
    makeInitialGameTree: makeInitialGameTree
  };
});
// vim: expandtab softtabstop=2 shiftwidth=2 foldmethod=marker
