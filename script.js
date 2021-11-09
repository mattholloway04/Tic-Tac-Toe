const X_CLASS = 'x';
const O_CLASS = 'o';

const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

const restart = document.getElementById('restart');

const turn = document.getElementById('turn');

const xPoints = document.getElementById('xPoints');
const oPoints = document.getElementById('oPoints');

const winningMessageElement = document.getElementById('winMessage');

const winningMessageTextElement = document.querySelector('[data-win-message]');

let oTurn;

startGame();

restart.addEventListener('click', startGame);

function startGame() {
  oTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  turn.innerText = `${currentClass.toUpperCase()}'s Turn`;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    setBoardHoverClass();
    swapTurns();
  }
  setBoardHoverClass();
  classTurn();
}

function classTurn() {
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  turn.innerText = `${currentClass.toUpperCase()}'s Turn`;
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = `It's a Draw!`;
  } else {
    winningMessageTextElement.innerText = `${oTurn ? 'O' : 'X'} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  oTurn = !oTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WIN_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
