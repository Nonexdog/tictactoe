const gameBoard = (function() {
  const boardMatrix = [];

  for (let row = 0; row < 3; row++) {
    boardMatrix[row] = [];
    for (let col = 0; col < 3; col++) {
      boardMatrix[row][col] = mark();
    }
  }

  function mark() {
    let value = 0;

    const getValue = () => value;
    const assignValue = (newValue) => {
      if (newValue === 0 || newValue === 'X' || newValue === 'O') {
        value = newValue;
      }
    }

    return { getValue, assignValue }

  }

  const getBoard = () => boardMatrix;
  const setMark = function(mark, row, column) {
    boardMatrix[row][column].assignValue(mark);
  }
  const getMark = function(row, column) {
    return boardMatrix[row][column].getValue();
  }

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

  return { getBoard, setMark, getMark, checkMatchHorizontal, checkMatchVertical, checkMatchDiagonalForward, checkMatchDiagonalBackward, checkWin };
})();