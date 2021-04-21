'use strict'

let gLine;

function setCurrectLine(currLine) {
    gLine = currLine;
}

function initEditor(img) {
    const idImg = parseInt(img.getAttribute('data-id'));
    initGmem(idImg);
    initCanvas();
    drawImg();
}

function onChangeText(newText) {
    gLine.txt = newText;
    apiLine('update', gLine);
}

function onTextColor(newColor) {
    gLine.color = newColor;
    apiLine('update', gLine);
}

function onStroke(){
    gLine.stroke = !gLine.stroke;
    apiLine('update', gLine);
}

function onIncFont() {
    gLine.size += 5;
    apiLine('update', gLine);
}

function onDecFont() {
    gLine.size -= 5;
    apiLine('update', gLine);
}

function onAlignLine(align) {
    gLine.align = align;
    apiLine('update', gLine);
}

function onAddLine() {
    apiLine('add');
}

function apiDeleteLine() {
    apiLine('delete');
}


function editLocation(movement){
    switch (movement) {
        case 'up':
            gLine.location.yP--;
            break;
        case 'down':
            gLine.location.yP++;
            break;
        case 'left':
            gLine.location.xP--;
            break;
        case 'right':
            gLine.location.xP++;
            break;
        default:
            break;
    }
    apiLine('update', gLine);
}
