const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");


let options = ["", "", "", "", "", "", "", "", ""]; 
let currentPlayer = "X"; 
let running = false; 


const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("data-index");

  if (options[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(this, cellIndex);

  checkWinner();
}

function updateCell(cell, index) {
 
  options[index] = currentPlayer;

  cell.textContent = currentPlayer;
}

function changePlayer() {
 
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  let roundWon = false;

  
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    const cellA = options[a];
    const cellB = options[b];
    const cellC = options[c];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue; 
    }

    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    running = false; // stop further moves
  } 
  else if (!options.includes("")) {
    statusText.textContent = "It's a Draw! 🤝";
    running = false;
  } 
  else {
    changePlayer();
  }
}

function restartGame() {
 
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => cell.textContent = "");
  running = true;
}
initializeGame();




