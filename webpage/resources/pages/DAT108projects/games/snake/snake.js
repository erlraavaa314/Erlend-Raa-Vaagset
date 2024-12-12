const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 10;
const INITIAL_SPEED = 300;
const MIN_SPEED = 100;
const SPEED_INCREMENT = 10;

const SNAKE_SYMBOL = 'O';
const FOOD_SYMBOL = 'X';
const BORDER_HORIZONTAL = '-';
const BORDER_VERTICAL = '|';
const BORDER_CORNER = '+';

class Snake {
    constructor(initialPosition) {
        this.body = [initialPosition];  // Initial snake position
        this.direction = { x: 1, y: 0 };  // Initial direction (moving right)
        this.growPending = false;
        this.lastMoveDirection = { x: 1, y: 0 };
    }

    changeDirection(newDirection) {
        if (newDirection.x !== -this.lastMoveDirection.x || newDirection.y !== -this.lastMoveDirection.y) {
            this.direction = newDirection;
        }
    }

    move() {
        const newHead = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        };
        this.body.unshift(newHead);  // Add new head

        // Only remove the tail if the snake isn't growing
        if (!this.growPending) {
            this.body.pop();  // Remove tail if no growth is pending
        } else {
            this.growPending = false;  // Reset the flag after growing
        }
        
        this.lastMoveDirection = this.direction;  // Prevent reversing
    }

    grow() {
        this.growPending = true;
    }

    hasCollided() {
        const [head, ...body] = this.body;
        return body.some(segment => segment.x === head.x && segment.y === head.y);
    }

    reset() {
        this.body = [{ x: 5, y: 5 }];
        this.direction = { x: 1, y: 0 };
        this.growPending = false;
        this.lastMoveDirection = { x: 1, y: 0 };
    }
}

class Food {
    constructor(boardWidth, boardHeight) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.position = this.generateRandomPosition();
    }

    generateRandomPosition() {
        return {
            x: Math.floor(Math.random() * this.boardWidth),
            y: Math.floor(Math.random() * this.boardHeight),
        };
    }

    reposition(snakeBody) {
        let newPosition;
        do {
            newPosition = this.generateRandomPosition();
        } while (snakeBody.some(segment => segment.x === newPosition.x && segment.y === newPosition.y));  // Avoid placing food on the snake
        this.position = newPosition;
    }
}

class Game {
    constructor(boardWidth, boardHeight) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.snake = new Snake({ x: 5, y: 5 });
        this.food = new Food(boardWidth, boardHeight);
        this.state = {
            score: 0,
            highScore: this.loadHighScore(),
            speed: INITIAL_SPEED,
            isGameOver: false,
        };
        this.keyLock = false;
        this.initializeUI();
        this.gameLoopId = null;  // Store the game loop ID to properly stop it
    }

    initializeUI() {
        this.updateScoreBoard();
        this.renderBoard();
    }

    updateScoreBoard() {
        document.getElementById('scoreBoard').textContent = `Score: ${this.state.score}`;
        document.getElementById('highScoreBoard').textContent = `High Score: ${this.state.highScore}`;
    }

    renderBoard() {
        const board = this.createEmptyBoard();
        this.renderSnake(board);
        this.renderFood(board);
        this.renderBoundary(board);
        document.getElementById('gameBoard').textContent = this.convertBoardToString(board);
    }

    createEmptyBoard() {
        return Array.from({ length: this.boardHeight }, () => Array(this.boardWidth).fill(' '));
    }

    renderSnake(board) {
        this.snake.body.forEach(segment => {
            board[segment.y][segment.x] = SNAKE_SYMBOL;
        });
    }

    renderFood(board) {
        const { x, y } = this.food.position;
        board[y][x] = FOOD_SYMBOL;
    }

    renderBoundary(board) {
        // Add horizontal boundaries
        const topBottomBorder = Array(this.boardWidth + 2).fill(BORDER_HORIZONTAL);

        // Add vertical boundaries and corners
        const fullBoard = [
            [BORDER_CORNER, ...topBottomBorder, BORDER_CORNER],  // Top boundary
            ...board.map(row => [BORDER_VERTICAL, ...row, BORDER_VERTICAL]),  // Left and right boundaries
            [BORDER_CORNER, ...topBottomBorder, BORDER_CORNER],  // Bottom boundary
        ];

        return fullBoard;
    }

    convertBoardToString(board) {
        return board.map(row => row.join('')).join('\n');
    }

    updateGame() {
        if (this.state.isGameOver) return;

        this.snake.move();
        this.wrapSnakePosition();

        if (this.checkFoodCollision()) {
            this.snake.grow();
            this.food.reposition(this.snake.body);  // Reposition food avoiding snake body
            this.updateScore();
            this.increaseSpeed();
        }

        if (this.snake.hasCollided()) {
            this.endGame();
        }

        this.renderBoard();
        this.keyLock = false;  // Unlock input
    }

    wrapSnakePosition() {
        const head = this.snake.body[0];
        head.x = (head.x + this.boardWidth) % this.boardWidth;
        head.y = (head.y + this.boardHeight) % this.boardHeight;
    }

    checkFoodCollision() {
        const head = this.snake.body[0];
        return head.x === this.food.position.x && head.y === this.food.position.y;
    }

    updateScore() {
        this.state.score++;
        this.updateScoreBoard();
    }

    increaseSpeed() {
        this.state.speed = Math.max(MIN_SPEED, this.state.speed - SPEED_INCREMENT);
    }

    endGame() {
        this.state.isGameOver = true;
        alert(`Game Over! Your score: ${this.state.score}. Press 'R' to restart.`);
        if (this.state.score > this.state.highScore) {
            this.saveHighScore(this.state.score);
            this.state.highScore = this.state.score;
            this.updateScoreBoard();
        }

        // Stop the game loop when the game is over
        if (this.gameLoopId) {
            clearTimeout(this.gameLoopId);
            this.gameLoopId = null;
        }
    }

    restart() {
        this.snake.reset();
        this.food.reposition(this.snake.body);  // Reset food and avoid snake body
        this.state.score = 0;
        this.state.speed = INITIAL_SPEED;
        this.state.isGameOver = false;
        this.updateScoreBoard();
        this.renderBoard();
        this.startGameLoop();  // Start a new game loop
    }

    startGameLoop() {
        if (this.gameLoopId) {
            clearTimeout(this.gameLoopId);  // Clear any existing game loop
        }

        const loop = () => {
            this.updateGame();
            if (!this.state.isGameOver) {
                this.gameLoopId = setTimeout(loop, this.state.speed);  // Recursively set a new game loop
            }
        };

        loop();
    }

    loadHighScore() {
        return parseInt(localStorage.getItem('highScore')) || 0;
    }

    saveHighScore(score) {
        localStorage.setItem('highScore', score);
    }
}

// Set up the game
const game = new Game(BOARD_WIDTH, BOARD_HEIGHT);

// Start the game loop
game.startGameLoop();

// Handle user input
document.addEventListener('keydown', event => {
    if (game.keyLock) return;

    const directionMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
    };

    if (directionMap[event.key]) {
        event.preventDefault();  // Prevent the default action (scrolling) for arrow keys
        game.snake.changeDirection(directionMap[event.key]);
    } else if (event.key.toLowerCase() === 'r') {
        game.restart();
    }

    game.keyLock = true;
});
