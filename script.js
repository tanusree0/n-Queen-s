function startGame() {
    const n = parseInt(document.getElementById('n-input').value);
    if (isNaN(n) || n < 1) {
        alert('Please enter a valid number greater than 0');
        return;
    }
    
    const solution = solveNQueens(n);
    displayBoard(solution, n);
}


function solveNQueens(n) {
    const results = [];
    const cols = new Set();
    const diag1 = new Set();
    const diag2 = new Set();
    const board = Array(n).fill().map(() => Array(n).fill(0));

    function backtrack(row) {
        if (row === n) {
            results.push(board.map(r => r.slice())); 
            return;
        }

        for (let col = 0; col < n; col++) {
            const d1 = row - col;
            const d2 = row + col;

            if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
                continue; // Skip invalid placements
            }

            // Place the queen
            board[row][col] = 1;
            cols.add(col);
            diag1.add(d1);
            diag2.add(d2);

            // Recurse for the next row
            backtrack(row + 1);

            // Backtrack and remove the queen
            board[row][col] = 0;
            cols.delete(col);
            diag1.delete(d1);
            diag2.delete(d2);
        }
    }

    backtrack(0);
    return results;
}

function displayBoard(solutions, n) {
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';

    if (solutions.length === 0) {
        boardContainer.innerHTML = '<p>No solution found</p>';
        return;
    }

    const solution = solutions[0]; // Display the first solution

    // Generate the board
    boardContainer.style.gridTemplateColumns = `repeat(${n}, 50px)`;

    solution.forEach(row => {
        row.forEach(cell => {
            const square = document.createElement('div');
            square.classList.add('square');
            if (cell === 1) {
                const queen = document.createElement('span');
                queen.classList.add('queen');
                queen.textContent = '♛';
                square.appendChild(queen);
            }
            boardContainer.appendChild(square);
        });
    });
}
