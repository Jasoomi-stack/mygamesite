const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake, direction, food, score, highScore, game;

function initGame() {
  snake = [
    { x: 8 * box, y: 10 * box },
    { x: 7 * box, y: 10 * box },
    { x: 6 * box, y: 10 * box }
  ];
  direction = "RIGHT";
  food = randomFood();
  score = 0;

  highScore = localStorage.getItem("highScore") || 0;
  updateScore();

  document.getElementById("gameOverScreen").classList.remove("show");

  clearInterval(game);
  game = setInterval(draw, 150);
}

function updateScore() {
  document.getElementById("score").textContent = `Score: ${score} | High Score: ${highScore}`;
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}

function setDirection(dir) {
  if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
  if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
  if (dir === "UP" && direction !== "DOWN") direction = "UP";
  if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") setDirection("LEFT");
  else if (e.key === "ArrowUp") setDirection("UP");
  else if (e.key === "ArrowRight") setDirection("RIGHT");
  else if (e.key === "ArrowDown") setDirection("DOWN");
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw bubble food
  ctx.beginPath();
  ctx.arc(food.x + box / 2, food.y + box / 2, box / 2 - 2, 0, 2 * Math.PI);
  ctx.fillStyle = "cyan";
  ctx.fill();
  ctx.closePath();

  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  // Collision detection
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    clearInterval(game);
    document.getElementById("finalScore").textContent = `Your Score: ${score}`;
    document.getElementById("gameOverScreen").classList.add("show");
    return;
  }

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
    food = randomFood();
  } else {
    snake.pop();
  }

  snake.unshift(head);
  updateScore();
}

function restartGame() {
  initGame();
}

initGame();