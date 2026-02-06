const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500


document.getElementById("runBtn").addEventListener("click", run);

function run() {
    const val1 = document.getElementById("inputX").value;
    const val2 = document.getElementById("inputY").value;
    console.log("Running with inputs:", val1, val2)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Example drawing
    ctx.fillStyle = "#4a90e2";
    ctx.fillRect(50, 50, 200, 100);

    console.log("Inputs:", val1, val2);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}