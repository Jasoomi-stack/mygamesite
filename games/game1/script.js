const box = document.getElementById('box');
const scoreEl = document.getElementById('score');
let score = 0;

box.addEventListener('click', () => {
  score++;
  scoreEl.textContent = score;
  moveBox();
});

function moveBox() {
  const x = Math.random() * (window.innerWidth - 60);
  const y = Math.random() * (window.innerHeight - 60);
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;
}

moveBox();