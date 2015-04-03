angular.module('Colors', [])
.service('GameEngine', function () {
  var numberOfPlayers = 2;  // TODO: Make it customizable at runtime.
  var N = 5;

  function random(n) {
    return Math.floor(Math.random() * n);
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

  function makeInitialGameTree() {
    // TODO: Implement.
  }

  return {
    makeInitialGameTree: makeInitialGameTree
  };
});
// vim: expandtab softtabstop=2 shiftwidth=2 foldmethod=marker