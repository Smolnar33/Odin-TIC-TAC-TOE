const Gameboard = () => {
  const row = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const DisplayBoard = () => {
    const cellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    // console.log(cellValues);
    return cellValues;
  };

  const placeToken = (row, column, token) => {
    board[row][column].addToken(token);
  };

  const checkCellValue = (row, column) =>
    board[row][column].getValue();

  const checkWinner = (activePlayerToken) => {
    // Check winner first row
    if (
      board[0][0].getValue() === activePlayerToken &&
      board[0][1].getValue() === activePlayerToken &&
      board[0][2].getValue() === activePlayerToken
    )
      return true;
    // Check winner second row
    if (
      board[1][0].getValue() === activePlayerToken &&
      board[1][1].getValue() === activePlayerToken &&
      board[1][2].getValue() === activePlayerToken
    )
      return true;
    // Check winner third row
    if (
      board[2][0].getValue() === activePlayerToken &&
      board[2][1].getValue() === activePlayerToken &&
      board[2][2].getValue() === activePlayerToken
    )
      return true;
    // Check winner first column
    if (
      board[0][0].getValue() === activePlayerToken &&
      board[0][1].getValue() === activePlayerToken &&
      board[0][2].getValue() === activePlayerToken
    )
      return true;
    // Check winner second column
    if (
      board[1][0].getValue() === activePlayerToken &&
      board[1][1].getValue() === activePlayerToken &&
      board[1][2].getValue() === activePlayerToken
    )
      return true;
    // Check winner third column
    if (
      board[2][0].getValue() === activePlayerToken &&
      board[2][1].getValue() === activePlayerToken &&
      board[2][2].getValue() === activePlayerToken
    )
      return true;
    // Check winner diagonaly-left-right
    if (
      board[0][0].getValue() === activePlayerToken &&
      board[1][1].getValue() === activePlayerToken &&
      board[2][2].getValue() === activePlayerToken
    )
      return true;
    // Check winner diagonaly-right-left
    if (
      board[0][2].getValue() === activePlayerToken &&
      board[1][1].getValue() === activePlayerToken &&
      board[2][0].getValue() === activePlayerToken
    )
      return true;
  };

  return { DisplayBoard, placeToken, checkCellValue, checkWinner };
};

function Cell() {
  let value = 0;

  const getValue = () => value;

  const addToken = (player) => {
    value = player;
  };

  return { getValue, addToken };
}

const GameController = () => {
  let moveCounter = 0;
  const board = Gameboard();

  const player = [
    { name: 'Player 1', token: 'X' },
    { name: 'Player 2', token: 'O' },
  ];

  let activePlayer = player[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  };

  const getActivePlayer = () => activePlayer;

  const roundDisplay = () => {
    board.DisplayBoard();
    console.log(
      `${
        getActivePlayer().name
      }'s turn. Please select a row and a column to place your token`
    );
  };

  const playGame = (row, column) => {
    if (board.checkCellValue(row, column))
      return alert('Cell is already occupied ! Chose another cell');
    board.placeToken(row, column, getActivePlayer().token);
    if (board.checkWinner(getActivePlayer().token)) {
      roundDisplay();
      return `${getActivePlayer().name} has WON !`;
    }
    switchPlayer();
    roundDisplay();
    moveCounter++;
    if (moveCounter == 9) return 'DRAW';
    return 'Next move!';
  };

  roundDisplay();

  return {
    playGame,
  };
};

const game = GameController();

const array = [];

const gameDisplay = () => {
  board = Gameboard();
  const playerCardTemp =
    document.getElementById('play-board').innerHTML;
  const renderBoard = () => {};

  const enterPlayerNames = () => {
    const playerOneName = document.getElementById('playerOne').value;
    const playerTwoName = document.getElementById('playerTwo').value;
    if (playerOneName) {
      document.getElementById(
        'score-playerOne-name'
      ).innerText = `${playerOneName} :`;
    }
    if (playerTwoName) {
      document.getElementById(
        'score-playerTwo-name'
      ).innerText = `${playerTwoName} :`;
    }
    document.getElementById('score-board').style.display = 'block';
    document.getElementById('player-card').style.display = 'none';
  };
  const addEventListeners = () => {
    document
      .getElementById('startGame')
      .addEventListener('click', () => {
        enterPlayerNames();
      });
    document
      .getElementById('resetGame')
      .addEventListener('click', () => {});
  };

  const resetGame = () => {
    document
      .getElementById('resetGame')
      .addEventListener('click', () => {
        document.getElementById('play-board').innerHTML =
          playerCardTemp;
      });
  };

  addEventListeners();
  resetGame();
};

gameDisplay();
