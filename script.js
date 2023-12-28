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

        const winner = checkWin();
        if (winner) {
            message.textContent = `Player ${winner} wins!`;
        } else if (board.flat().every((cell) => cell !== '')) {
            message.textContent = "It's a draw!";
        }
    }
}

function checkWin() {
    const winningPlayer = board[0][0] || board[1][1] || board[2][2];
    for (let i = 0; i < 3; i++) {
        if ((board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) ||
            (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i])) {
            return board[i][0] || board[0][i];
        }
    }
    if (winningPlayer && winningPlayer === board[1][1] && 
        ((winningPlayer === board[0][0] && winningPlayer === board[2][2]) ||
        (winningPlayer === board[0][2] && winningPlayer === board[2][0]))) {
        return winningPlayer;
    }
    return false;
}

function resetGame() {
    board.forEach((row) => row.fill(''));
    cells.forEach((cell) => (cell.textContent = ''));
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listener to switch between light and dark mode
window.addEventListener('keydown', (e) => {
    if (e.key === 'l') {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.game').classList.toggle('dark-mode');
    }
});

cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

resetGame();
