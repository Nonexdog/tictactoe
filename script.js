const gameBoard = (function() {
  const boardMatrix = [
    [ [], [], [] ],
    [ [], [], [] ],
    [ [], [], [] ]
  ];

  const getBoard = () => boardMatrix;

  return { getBoard };
})();