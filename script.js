// Seleccionar elementos del DOM
const startGameBtn = document.querySelector(".start-game");
const gameContainer = document.getElementById("game-container");
const container = document.querySelector(".container");
const restartBtn = document.querySelector(".restart");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables del juego
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let gameInterval;

// Función para generar comida aleatoria
function generateFood() {
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
}

// Dibuja la serpiente
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "lime";
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });
}

// Dibuja la comida
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 20, 20);
}

// Mueve la serpiente
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);

    // Verificar colisiones
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameInterval);
        alert("¡Game Over! Presiona Reiniciar para intentarlo de nuevo.");
    }
}

// Actualiza el juego
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    moveSnake();
}

// Configuración inicial
function startGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    generateFood();
    gameInterval = setInterval(updateGame, 150);
}

// Eventos del teclado
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -20 };
    if (event.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 20 };
    if (event.key === "ArrowLeft" && direction.x === 0) direction = { x: -20, y: 0 };
    if (event.key === "ArrowRight" && direction.x === 0) direction = { x: 20, y: 0 };
});

// Botones
startGameBtn.addEventListener("click", () => {
    container.style.display = "none";
    gameContainer.style.display = "flex";
    startGame();
});

restartBtn.addEventListener("click", startGame);
