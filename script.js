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
    console.log(cellValues);
  };

  const placeToken = (row, column, token) => {
    board[row][column].addToken(token);
  };

  return { DisplayBoard, placeToken };
};

function Cell() {
  let value = 0;

  const getValue = () => value;

  const addToken = (player) => {
    value = player;
  };

  return { getValue, addToken };
}

const Player = () => {};

const GameController = () => {
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

  const checkWinner = () => {};

  const roundDisplay = () => {
    board.DisplayBoard();
    console.log(
      `${
        getActivePlayer().name
      }'s turn. Please select a row and a column to place your token`
    );
  };

  const playGame = (row, column) => {
    board.placeToken(row, column, getActivePlayer().token);
    switchPlayer();
    roundDisplay();
    return 'Next move!';
  };

  roundDisplay();

  return {
    playGame,
  };
};

const game = GameController();
