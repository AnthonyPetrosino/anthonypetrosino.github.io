let board = [];
let score = 0;
let bestScore = 0;
let hasWon = false;
let isAnimating = false;
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const tileValues = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
const defaultMinColor = '#eee4da';
const defaultMaxColor = '#17811d';
let activeScheme = null;

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

function handleSwipe() {
    if (isAnimating) return;
    
    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;
    let minSwipeDistance = 30;
    
    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
        return;
    }
    
    let moved = false;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            moved = moveRight();
        } else {
            moved = moveLeft();
        }
    } else {
        if (deltaY > 0) {
            moved = moveDown();
        } else {
            moved = moveUp();
        }
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

document.addEventListener('keydown', handleKeyPress);

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
}, false);

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function interpolateColor(color1, color2, factor) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const r = rgb1.r + factor * (rgb2.r - rgb1.r);
    const g = rgb1.g + factor * (rgb2.g - rgb1.g);
    const b = rgb1.b + factor * (rgb2.b - rgb1.b);
    return rgbToHex(r, g, b);
}

function getLuminance(hex) {
    const rgb = hexToRgb(hex);
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const a = [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function applyColorScheme(minColor, maxColor) {
    const root = document.documentElement;
    
    tileValues.forEach((value, index) => {
        const factor = index / (tileValues.length - 1);
        const color = interpolateColor(minColor, maxColor, factor);
        const luminance = getLuminance(color);
        const textColor = luminance > 0.5 ? '#776e65' : '#f9f6f2';
        
        root.style.setProperty(`--tile-${value}-color`, color);
        root.style.setProperty(`--tile-${value}-text`, textColor);
    });
    
    localStorage.setItem('minColor', minColor);
    localStorage.setItem('maxColor', maxColor);
}

function resetColors() {
    document.getElementById('minColor').value = defaultMinColor;
    document.getElementById('maxColor').value = defaultMaxColor;
    applyColorScheme(defaultMinColor, defaultMaxColor);
}

function loadColorPreferences() {
    const minColor = localStorage.getItem('minColor') || defaultMinColor;
    const maxColor = localStorage.getItem('maxColor') || defaultMaxColor;
    
    document.getElementById('minColor').value = minColor;
    document.getElementById('maxColor').value = maxColor;
    
    applyColorScheme(minColor, maxColor);
}

function saveCurrentScheme() {
    const schemeNumber = document.getElementById('schemeSelect').value;
    const minColor = document.getElementById('minColor').value;
    const maxColor = document.getElementById('maxColor').value;
    
    const scheme = { min: minColor, max: maxColor };
    localStorage.setItem(`colorScheme${schemeNumber}`, JSON.stringify(scheme));
    
    updateSchemePreview(schemeNumber);
    setActiveScheme(schemeNumber);
    console.log(`Saved scheme ${schemeNumber}:`, scheme);
}

function loadScheme(schemeNumber) {
    const schemeData = localStorage.getItem(`colorScheme${schemeNumber}`);
    
    if (schemeData) {
        const scheme = JSON.parse(schemeData);
        document.getElementById('minColor').value = scheme.min;
        document.getElementById('maxColor').value = scheme.max;
        applyColorScheme(scheme.min, scheme.max);
        setActiveScheme(schemeNumber);
        console.log(`Loaded scheme ${schemeNumber}:`, scheme);
    }
}

function updateSchemePreview(schemeNumber) {
    const btn = document.getElementById(`scheme-${schemeNumber}`);
    const schemeData = localStorage.getItem(`colorScheme${schemeNumber}`);
    
    if (schemeData) {
        const scheme = JSON.parse(schemeData);
        btn.style.background = `linear-gradient(to right, ${scheme.min}, ${scheme.max})`;
        btn.classList.remove('empty');
        btn.textContent = '';
    } else {
        btn.style.background = '';
        btn.classList.add('empty');
        btn.textContent = 'Empty';
    }
}

function setActiveScheme(schemeNumber) {
    document.querySelectorAll('.scheme-btn').forEach(btn => btn.classList.remove('active'));
    if (schemeNumber) {
        document.getElementById(`scheme-${schemeNumber}`).classList.add('active');
        activeScheme = schemeNumber;
    }
}

function initializeSchemes() {
    for (let i = 1; i <= 5; i++) {
        updateSchemePreview(i);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
    document.getElementById('best').textContent = bestScore;
    
    initializeSchemes();
    loadColorPreferences();
    
    document.getElementById('minColor').addEventListener('input', function() {
        const minColor = this.value;
        const maxColor = document.getElementById('maxColor').value;
        applyColorScheme(minColor, maxColor);
        setActiveScheme(null);
    });
    
    document.getElementById('maxColor').addEventListener('input', function() {
        const minColor = document.getElementById('minColor').value;
        const maxColor = this.value;
        applyColorScheme(minColor, maxColor);
        setActiveScheme(null);
    });
    
    newGame();
});