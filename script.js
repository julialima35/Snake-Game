const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const canvasSize = 400;
canvas.width = canvas.height = canvasSize;

const cellSize = 20;
const rows = canvasSize / cellSize;
const cols = canvasSize / cellSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

function drawSnake() {
    ctx.fillStyle = "#00FF00";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    });
}

function drawFood() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = "Pontos: " + score;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    };
}

function checkCollisions() {
    const head = snake[0];
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction.y !== 1) {
        direction = { x: 0, y: -1 };
    } else if (event.key === "ArrowDown" && direction.y !== -1) {
        direction = { x: 0, y: 1 };
    } else if (event.key === "ArrowLeft" && direction.x !== 1) {
        direction = { x: -1, y: 0 };
    } else if (event.key === "ArrowRight" && direction.x !== -1) {
        direction = { x: 1, y: 0 };
    }
});

function gameLoop() {
    if (checkCollisions()) {
        alert("Game Over! Pontos finais: " + score);
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        score = 0;
        document.getElementById("score").textContent = "Pontos: " + score;
        return;
    }

    updateSnake();
    drawGame();
    setTimeout(gameLoop, 100);
}

gameLoop();
