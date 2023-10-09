const board = Array.from(Array(3), () => Array(3).fill(''));
let currentPlayer = 'X';
const message = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-button');

function handleCellClick(e) {
    const cell = e.target;
    const row = +cell.dataset.row;
    const col = +cell.dataset.col;

    if (board[row][col] === '' && !checkWin()) {
        board[row][col] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;

        if (checkWin()) {
            message.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        } else if (board.flat().every((cell) => cell !== '')) {
            message.textContent = "It's a draw!";
        }
    }
}

function checkWin() {
    for (let i = 0; i < 3; i++) {
        // Check rows and columns
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
            return true;
        }
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
            return true;
        }
    }

    // Check diagonals
    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return true;
    }
    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return true;
    }

    return false;
}

function resetGame() {
    board.forEach((row) => row.fill(''));
    cells.forEach((cell) => (cell.textContent = ''));
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

resetGame();
