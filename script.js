const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500
const UNIT = 50; // pixels/unit

document.getElementById("runBtn").addEventListener("click", run);


class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = UNIT/5;
    }

    draw() {
        const grad = ctx.createRadialGradient(
            canvas.width/2 - this.radius * 0.3,
            canvas.height/2 - this.radius * 0.3,
            this.radius * 0.2,
            canvas.width/2,
            canvas.height/2,
            this.radius
        );

        grad.addColorStop(0, "#b9adff");   // highlight
        grad.addColorStop(0.5, "#6a5cff");
        grad.addColorStop(1, "#3a2dbd");   // shadow

        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
    }

    
}


let running = false;
function run() {
    const val1 = document.getElementById("inputX").value;
    const val2 = document.getElementById("inputY").value;
    running = true;
    ball.x = 0;
    ball.y = 0;
    time=0;
    console.log("Running with inputs:", val1, val2, running)
}

function make_grids(posx, posy) {
    // if position of ball is (3,4), then we want to plot grid
    // lines from 3*UNIT-500 to 3*UNIT+500, and from 4*UNIT-500 to 4*UNIT+500
    // but we want (0,0) to be at the center of the canvas, so we need to shift everything by canvas.width/2 and canvas.height/2
    ctx.strokeStyle = "#ccc";
    ctx.linewidth = 5;
    for (let x = -(posx % 1)*UNIT-UNIT; x < canvas.width+UNIT; x += UNIT) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = (posy % 1)*UNIT-UNIT; y < canvas.height+UNIT; y += UNIT) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    make_grids(ball.x, ball.y);
    ball.draw();
}

time = 0;
function update() {
    if (running && time <= 1) {
        time += 0.01;
    } else if (running && time > 1) {
        time = 1;
        running = false;
    }
    ball.x = 0;
    ball.y = time*3;
}

ball = new Ball(0, 0);

setInterval(draw, 10);
setInterval(update, 10);