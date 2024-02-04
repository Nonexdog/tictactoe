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

  return { getBoard };
})();