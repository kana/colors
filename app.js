angular.module('Colors', [])
.service('GameEngine', function () {
  var numberOfPlayers = 2;  // TODO: Make it customizable at runtime.
  var N = 5;
  var COLORS = 'WUBRG';

  function random(n) {
    return Math.floor(Math.random() * n);
  }

  function shuffleX(ys) {
    var n = xs.length;
    for (var i = n - 1; 1 <= i; n--) {
      var j = random(i + 1);
      var t = xs[i];
      xs[i] = xs[j];
      xs[j] = t;
    }
  }

  function repeat(x, n) {
    return new Array(n).map(function () {return x;});
  }

  function delay(expressionAsFunction) {
    var result;
    var isEvaluated = false;

    return function () {
      if (!isEvaluated) {
        result = expressionAsFunction();
        isEvaluated = true;
      }
      return result;
    };
  }

  function force(promise) {
    return promise();
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
    if (players.every(function (p) {return p.hand.length === 0;}))
      return [];

    var p = players[turn];
    var moves =
      p.hand.filter(function (c) {return canPlay(c, board);})
      .map(function (c) {
        return {
          card: c,
          gameTreePromise: delay(function () {
            var board = copyDeeply(board);
            var players = copyDeeply(players);
            playX(c, board, players, turn);
            return makeGameTree(board, players, advanceTurn(turn));
          })
        };
      });
    if (moves.length !== 0) {
      return moves;
    } else {
      return {
        pass: true,
        gameTreePromise: delay(function () {
          return makeGameTree(board, players, advanceTurn(turn));
        })
      };
    }
  }

  function canPlay(card, board) {
    return false;  // TODO: Implement.
  }

  function playX(card, board, players, turn) {
    // TODO: Implement.
  }

  function makeCard(xColor, yColor) {
    return {xColor: xColor, yColor: yColor};
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

  function makeEmptyBoard() {
    return {
      cells: repeat(false, N * N),
      xColors: repeat(false, N),
      yColors: repeat(false, N)
    };
  }

  function canPut(card, x, y, board) {
    return !board.cells[ix(x, y)] &&
           (!board.xColors[x] || board.xColors[x] === card.xColor) &&
           (!board.yColors[y] || board.yColors[y] === card.yColor);
  }

  function putX(card, x, y, board) {
    board.cells[ix(x, y)] = card;
    if (!board.xColors[x])
      board.xColors[x] = card.xColor;
    if (!board.yColors[y])
      board.yColors[y] = card.yColor;
  }

  function makeInitialGameTree() {
    var board = makeEmptyBoard();
    var cardSet = makeCardSet();

    shuffleX(cardSet.baseCards);
    shuffleX(cardSet.freeCards);

    // TODO: Support another initial board layout.
    for (var i = 0; i < cardSet.baseCards.length; i++)
      putX(cardSet.baseCards[i], i, i, board);

    var players = [];
    var m = Math.floor(cardSet.freeCards.length / numberOfPlayers);
    for (var i = 0; i < numberOfPlayers; i++)
      players.push({hand: cardSet.freeCards.slice(i * m, (i + 1) * m)});

    return makeGameTree(board, players, 0);
  }

  return {
    makeInitialGameTree: makeInitialGameTree
  };
});
// vim: expandtab softtabstop=2 shiftwidth=2 foldmethod=marker
