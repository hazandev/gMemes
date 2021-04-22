'use strict'

let gLine;

function initEditor(img) {
    const idImg = parseInt(img.getAttribute('data-id'));
    initGmem(idImg);
    initCanvas();
    drawImg();
}

function setCurrectLine(indexLine){
    gLine = indexLine;
};

function onSwitchLine() {
    let gMeme = getGmem();
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++;
    } else {
        gMeme.selectedLineIdx = 0;
    }
    gLine = gMeme.lines[gMeme.selectedLineIdx];
    setLineIndex(gMeme.selectedLineIdx)
}


function onNewLocation(movement) {
    editLocation(movement);
}

function onChangeText(newText) {
    gLine.txt = newText;
    apiLine('update', gLine);
}

function onTextColor(newColor) {
    document.querySelector('.btn-color').style.background = `${newColor}` 
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

function onDeleteLine() {
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
