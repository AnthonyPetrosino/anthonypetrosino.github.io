let board = [];
let score = 0;
let bestScore = 0;
let hasWon = false;
let isAnimating = false;

function initBoard() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

function addRandomTile() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({x: i, y: j});
            }
        }
    }
    
    if (emptyCells.length > 0) {
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateDisplay(animate = false) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let cell = document.getElementById(`cell-${i}-${j}`);
            let value = board[i][j];
            
            if (value === 0) {
                cell.textContent = '';
                cell.className = 'grid-cell';
            } else {
                cell.textContent = value;
                let classes = `grid-cell tile tile-${value}`;
                if (animate) {
                    classes += ' tile-slide';
                }
                cell.className = classes;
            }
        }
    }
    document.getElementById('score').textContent = score;
    
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
    }
    document.getElementById('best').textContent = bestScore;
}

function moveLeft() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        let row = board[i].filter(val => val !== 0);
        
        for (let j = 0; j < row.length - 1; j++) {
            if (row[j] === row[j + 1]) {
                row[j] *= 2;
                score += row[j];
                row[j + 1] = 0;
                if (row[j] === 2048 && !hasWon) {
                    hasWon = true;
                    setTimeout(() => alert('You Win!'), 100);
                }
            }
        }
        
        row = row.filter(val => val !== 0);
        while (row.length < 4) {
            row.push(0);
        }
        
        for (let j = 0; j < 4; j++) {
            if (board[i][j] !== row[j]) {
                moved = true;
            }
            board[i][j] = row[j];
        }
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        let row = board[i].filter(val => val !== 0);
        
        for (let j = row.length - 1; j > 0; j--) {
            if (row[j] === row[j - 1]) {
                row[j] *= 2;
                score += row[j];
                row[j - 1] = 0;
                if (row[j] === 2048 && !hasWon) {
                    hasWon = true;
                    setTimeout(() => alert('You Win!'), 100);
                }
            }
        }
        
        row = row.filter(val => val !== 0);
        while (row.length < 4) {
            row.unshift(0);
        }
        
        for (let j = 0; j < 4; j++) {
            if (board[i][j] !== row[j]) {
                moved = true;
            }
            board[i][j] = row[j];
        }
    }
    return moved;
}

function moveUp() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        let column = [];
        for (let i = 0; i < 4; i++) {
            if (board[i][j] !== 0) {
                column.push(board[i][j]);
            }
        }
        
        for (let i = 0; i < column.length - 1; i++) {
            if (column[i] === column[i + 1]) {
                column[i] *= 2;
                score += column[i];
                column[i + 1] = 0;
                if (column[i] === 2048 && !hasWon) {
                    hasWon = true;
                    setTimeout(() => alert('You Win!'), 100);
                }
            }
        }
        
        column = column.filter(val => val !== 0);
        while (column.length < 4) {
            column.push(0);
        }
        
        for (let i = 0; i < 4; i++) {
            if (board[i][j] !== column[i]) {
                moved = true;
            }
            board[i][j] = column[i];
        }
    }
    return moved;
}

function moveDown() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        let column = [];
        for (let i = 0; i < 4; i++) {
            if (board[i][j] !== 0) {
                column.push(board[i][j]);
            }
        }
        
        for (let i = column.length - 1; i > 0; i--) {
            if (column[i] === column[i - 1]) {
                column[i] *= 2;
                score += column[i];
                column[i - 1] = 0;
                if (column[i] === 2048 && !hasWon) {
                    hasWon = true;
                    setTimeout(() => alert('You Win!'), 100);
                }
            }
        }
        
        column = column.filter(val => val !== 0);
        while (column.length < 4) {
            column.unshift(0);
        }
        
        for (let i = 0; i < 4; i++) {
            if (board[i][j] !== column[i]) {
                moved = true;
            }
            board[i][j] = column[i];
        }
    }
    return moved;
}

function isGameOver() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) return false;
        }
    }
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (j < 3 && board[i][j] === board[i][j + 1]) return false;
            if (i < 3 && board[i][j] === board[i + 1][j]) return false;
        }
    }
    
    return true;
}

function handleKeyPress(event) {
    if (isAnimating) return;
    
    let moved = false;
    let key = event.key.toLowerCase();
    
    if (['arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'w', 'a', 's', 'd'].includes(key)) {
        event.preventDefault();
    }
    
    switch(key) {
        case 'arrowleft':
        case 'a':
            moved = moveLeft();
            break;
        case 'arrowright':
        case 'd':
            moved = moveRight();
            break;
        case 'arrowup':
        case 'w':
            moved = moveUp();
            break;
        case 'arrowdown':
        case 's':
            moved = moveDown();
            break;
    }
    
    if (moved) {
        isAnimating = true;
        updateDisplay(true);
        
        setTimeout(() => {
            addRandomTile();
            updateDisplay();
            isAnimating = false;
            
            if (isGameOver()) {
                setTimeout(() => alert('Game Over!'), 100);
            }
        }, 100);
    }
}

function newGame() {
    initBoard();
    score = 0;
    hasWon = false;
    addRandomTile();
    addRandomTile();
    updateDisplay();
}

document.addEventListener('keydown', handleKeyPress);

document.addEventListener('DOMContentLoaded', function() {
    bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
    document.getElementById('best').textContent = bestScore;
    newGame();
});