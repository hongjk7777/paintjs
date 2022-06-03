const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting() {
    if(!filling){
        painting = true;
    }
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function changeColor(e){
    ctx.strokeStyle = e.target.style.backgroundColor;
    ctx.fillStyle = e.target.style.backgroundColor;
}

function changeBrushSize(e){
    ctx.lineWidth = e.target.value;
}

function changeMode(e) {
    if(filling === true){
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
    
}

function fillCanvas(e) {
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function saveCanvas() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = "PaintJS";
    link.click();
}

function handleCM(e) {
    e.preventDefault();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", fillCanvas);
    canvas.addEventListener("contextmenu", handleCM);
}

if(colors) {
    Array.from(colors).forEach(color => 
        color.addEventListener("click", changeColor)
    );
}
    
if(range) {
    range.addEventListener("input", changeBrushSize);
}

if(mode) {
    mode.addEventListener("click", changeMode);
}

if(saveBtn) {
    saveBtn.addEventListener("click", saveCanvas);
}