const gameBoard = (function() {
  const boardMatrix = [];

  for (let row = 0; row < 3; row++) {
    boardMatrix[row] = [];
    for (let col = 0; col < 3; col++) {
      boardMatrix[row][col] = mark();
    }
  }

  function mark() {
    let value = " ";

    const getValue = () => value;
    const assignValue = (newValue) => {
      if (newValue === 'X' || newValue === 'O') {
        value = newValue;
      } else {
        console.log('Invalid value!!');
      }
    }
    const resetValue = () => value = 0;

    return { getValue, assignValue, resetValue }

  }

  const getBoard = () => boardMatrix;
  const displayBoard = function () {
    const board = [];
    let i = 0; 
    for (row of boardMatrix) {
      board[i] = [];

      for (column of row) {
        board[i].push(column.getValue());
      }

      i++;
    }
    return board;
  }
  const resetBoard = function() {
    for (row of boardMatrix) {
      for (column of row) {
        column.resetValue();
      }
    }
  };

  const setMark = function(mark, row, column) {
    boardMatrix[row][column].assignValue(mark);
  };
  const getMark = function(row, column) {
    return boardMatrix[row][column].getValue();
  };

  const checkMatchHorizontal = function(mark, row, col) {
    for (let col = 0; col < 3; col++){
      if (getMark(row, col) != mark) {
        return false;
      }
    }
    return true;
  }

  const checkMatchVertical = function(mark, row, col) {
    for (let row = 0; row < 3; row++){
      if (getMark(row, col) != mark) {
        return false;
      }
    }
    return true;
  }

  const checkDiagonalPossible = function(mark, row, col) {
    if (
      ((row == 0 || row == 2) && col == 1) || row == 1 && col ==1)
      {
      return false
    }
  }

  const checkMatchDiagonalForward = function(mark, row, col) {
    checkDiagonalPossible(mark, row, col);

    for (let pos = 0; pos < 3; pos++){
      if (getMark(pos, pos) != mark) {
        return false;
      }
    }

    return true;
  }

  const checkMatchDiagonalBackward = function(mark, row, col) {
    checkDiagonalPossible(mark, row, col);

    for (let pos = 0; pos < 3; pos++){
      // We want the opposite-side column here
      if (getMark(pos, 2-pos) != mark) {
        return false;
      }
    }

    return true
  }

  const winConditions = [
    checkMatchDiagonalForward,
    checkMatchDiagonalBackward,
    checkMatchVertical,
    checkMatchHorizontal
  ];

  const checkWin = function(mark, row, col) {
    for (condition of winConditions) {
      if (condition(mark, row, col)) {
        return true;
      }
    }

    return false;
  }

  return { 
    getBoard,
    resetBoard,  
    setMark, 
    getMark, 
    checkMatchHorizontal, 
    checkMatchVertical, 
    checkMatchDiagonalForward, 
    checkMatchDiagonalBackward, 
    checkWin,
    displayBoard
  };
})();

const gameHandler = (function() {
  let turnCount = 0;
  let isWon = false;
  let players = []
  let currentPlayer;

  const getTurnCount = () => turnCount;
  const addTurnCount = () => turnCount++;
  const resetTurnCount = () => turnCount = 0;
  const updateCurrentPlayer = () => currentPlayer = players[turnCount % 2];

  const startGame = function (startingPlayer, secondPlayer) {
    resetTurnCount();
    isWon = false;
    gameBoard.resetBoard();
    players[0] = startingPlayer;
    players[1] = secondPlayer;
    updateCurrentPlayer()
    if (startingPlayer.getName()) {
      console.log(`Game start!! It is currently ${startingPlayer.getName()}'s turn!!`);
    } else {
      console.log(`Game start!! It is currently player 1's turn!!`);
    }
  }

  const playTurn = function(row, column) {
    if (gameBoard.getMark(row, column)) {
      console.log("There's already a mark made in this spot!!");
      return;
    }

    currentMark = currentPlayer.getMark();
    gameBoard.setMark(currentMark, row, column);
    isWon = gameBoard.checkWin(currentMark, row, column);
    if (isWon || turnCount > 8) {
      console.log(finishGame());
    } else {
      addTurnCount();
      updateCurrentPlayer();
      console.log(`It is now ${currentPlayer.getName()}'s turn!!`);
    }
  };

  const finishGame = function() {
    resetTurnCount();
    gameBoard.resetBoard();

    resetTurnCount();
    if (isWon) {
      currentPlayer.addScore();
      isWon = false;
      return `${currentPlayer.getName()} wins!!`;
    }

    return `Seems like a tie...`;
  }

  return { 
    addTurnCount,
    getTurnCount,
    resetTurnCount,
    startGame, 
    playTurn
  };
})();

function Player(mark, name = '') {
  score = 0;

  const getScore = () => score;
  const addScore = () => score++;
  const resetScore = () => score = 0;
  const getMark = () => mark;
  const getName = () => name;

  return { 
    getScore, 
    addScore, 
    resetScore, 
    getMark,
    getName 
  };
};

const p1 = Player('X', 'Baknifo')
const p2 = Player('O', 'Splungo')