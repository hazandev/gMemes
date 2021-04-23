'use strict'

let gLine;

function initEditor(img) {
    const imgId = parseInt(img.getAttribute('data-id'));
    initGmem(imgId);
    initCanvas();
    drawImg();
}

function setCurrectLine(indexLine){
    gLine = indexLine;
}

function onSwitchLine() {
    let gMeme = getGmem();
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++;
    } else {
        gMeme.selectedLineIdx = 0;
    }
    gLine = gMeme.lines[gMeme.selectedLineIdx];
    renderLineControl(gLine);
    setLineIndex(gMeme.selectedLineIdx)
}


function onNewLocation(movement) {
    editLocation(movement);
}

function onChangeText(txt) {
    gLine.txt = txt;
    apiLine('update', gLine);
}

function onTextColor(color) {
    document.querySelector('.btn-color').style.background = `${color}` 
    gLine.color = color;
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
