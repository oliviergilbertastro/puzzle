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



function normalizeExpression(expr, variable = "t") {
  let s = expr.toLowerCase().replace(/\s+/g, "");

  // Constants
  s = s.replace(/\bpi\b/g, "Math.PI").replace(/\be\b/g, "Math.E");


  // Absolute value |x| → Math.abs(x)
  while (/\|[^|]+\|/.test(s)) {
    s = s.replace(/\|([^|]+)\|/g, "Math.abs($1)");
  }

  // Exponents: ^ → **
  s = s.replace(/\^/g, "**");

  // Implicit multiplication (function-safe)
s = s
  // number followed by variable or Math.*
  .replace(/(\d)([a-zA-Z])/g, "$1*$2")

  // variable or ')' followed by number
  .replace(/([a-zA-Z\)])(\d)/g, "$1*$2")

  // ')' followed by variable or '('
  .replace(/(\))([a-zA-Z(])/g, "$1*$2")

  // number or ')' followed by '(' — but NOT Math.<func>(
  .replace(
    /([0-9\)])\(/g,
    "$1*("
  )

  // variable followed by '(' — but NOT Math.<func>(
  .replace(
    /([a-zA-Z])\(/g,
    (match, v, offset) => {
      return s.slice(0, offset).endsWith("Math.") ? `${v}(` : `${v}*(`;
    }
  );

  
  // Functions
  console.log(s);
  const funcs = ["sin", "cos", "tan", "log", "exp", "sqrt", "abs"];
  for (const f of funcs) {
  // Replace "func*(" with "Math.func("
  s = s.replace(new RegExp(`\\b${f}\\*\\(`, "g"), `Math.${f}(`);
}
  console.log(s);

  return s;
}

function stringToFunction(expr, variable = "t") {
  const jsExpr = normalizeExpression(expr, variable);
  return new Function(variable, `return ${jsExpr};`);
}



let running = false;
let inp1, inp2;
let func1 = function(t) {return 0;};
let func2 = function(t) {return 0;};
function run() {
    inp1 = document.getElementById("inputX").value;
    inp2 = document.getElementById("inputY").value;
    if (inp1 == "") {
        inp1 = "0";
    }
    if (inp2 == "") {
        inp2 = "0";
    }
    func1 = stringToFunction(inp1);
    func2 = stringToFunction(inp2);
    console.log(func1);
    running = true;
    ball.x = 0;
    ball.y = 0;
    time=0;
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
    ball.x = func1(time);
    ball.y = func2(time);
}



setInterval(draw, 10);
ball = new Ball(0, 0);
setInterval(update, 10);
//setInterval(function() {console.log(ball.x, ball.y)}, 1000);
