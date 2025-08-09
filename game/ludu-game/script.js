let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
let size = 600;
let cell = size / 15;

// Token positions
let tokens = [
    {x: cell*1.5, y: cell*1.5, color: "red"},
    {x: cell*13.5, y: cell*1.5, color: "green"},
    {x: cell*1.5, y: cell*13.5, color: "yellow"},
    {x: cell*13.5, y: cell*13.5, color: "blue"}
];

// Draw board
function drawBoard() {
    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = "black";
    for (let i = 0; i <= 15; i++) {
        ctx.beginPath();
        ctx.moveTo(i*cell, 0);
        ctx.lineTo(i*cell, size);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i*cell);
        ctx.lineTo(size, i*cell);
        ctx.stroke();
    }

    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, cell*6, cell*6);

    ctx.fillStyle = "green";
    ctx.fillRect(cell*9, 0, cell*6, cell*6);

    ctx.fillStyle = "yellow";
    ctx.fillRect(0, cell*9, cell*6, cell*6);

    ctx.fillStyle = "blue";
    ctx.fillRect(cell*9, cell*9, cell*6, cell*6);

    ctx.fillStyle = "white";
    ctx.fillRect(cell*6, cell*6, cell*3, cell*3);

    for (let t of tokens) {
        ctx.beginPath();
        ctx.arc(t.x, t.y, cell*0.4, 0, Math.PI*2);
        ctx.fillStyle = t.color;
        ctx.fill();
        ctx.stroke();
    }
}

// Dice
function rollDice() {
    let dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("diceResult").innerText = "Dice: " + dice;
}

// Initial draw
drawBoard();