'use strict'

var gCanvas;
let gCtx;
let gSizePrec;


function initCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    clearCanvas();
    resizeCanvas();
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
    _setSizePrecentage();
}

function getCanvas(){
    return gCanvas;
}

function _setSizePrecentage() {
    gSizePrec = { xP: gCanvas.width / 10, yP: gCanvas.height / 10 }
}


function drawImg() {
    const img = getImage();
    const elImg = new Image()
    elImg.src = img.url;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        renderLine(gMeme.lines);
    }
}

function drawText(line) {
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
    gCtx.fillStyle = line.color;
    gCtx.fillText(line.txt, line.location.xP * gSizePrec.xP, line.location.yP * gSizePrec.yP);
    if (line.stroke){
        gCtx.strokeText(line.txt, line.location.xP * gSizePrec.xP, line.location.yP * gSizePrec.yP);
    } 
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data;
    elLink.download = 'my-img.jpg'
}

function saveAndRestoreExample() {
    if (!gCtx) return;
    gCtx.save()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    // You may clear part of the canvas
    // gCtx.clearRect(50, 50, 100, 100)
}


