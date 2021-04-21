'use strict'

const KEY = 'mems';


var gMeme;

function initGmem(idImg){
    gMeme = {
        selectedImgId: idImg,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Your statment',
                size: 40,
                align: 'center',
                color: 'red',
                font: 'Impact',
                location: { xP: 5, yP: 1 } //location at precentage 10% 20%
            },
        ]
    }
    setCurrectLine(gMeme.lines[gMeme.selectedLineIdx]);
};

function apiLine(action, line = null) {
    switch (action) {
        case 'add':
            addLine();
            break;
        case 'update':
            updateLine(line);
            break;
        case 'delete':
            deleteLine();
            break;
        default:
            break;
    }
    renderCanvas();
}

function addLine() {
    let yPLocation;
    if(gMeme.lines.length === 0){
        yPLocation = 1;
    }else if(gMeme.lines.length === 1){
        yPLocation = 9;
    }else{
        yPLocation = 5;
    }
    gMeme.lines.push({
        txt: 'Your statment',
        size: 40,
        align: 'center',
        color: 'red',
        font: 'Impact',
        stroke: false,
        location: { xP: 5, yP: yPLocation }
    });
    gMeme.selectedLineIdx++;
    setCurrectLine(gMeme.lines[gMeme.selectedLineIdx]);
}

function updateLine(line) {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1, line);
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

var gKeywords = { 'happy': 12, 'funny puk': 1, 'Funny': 6 };
var gImgs = [];

//load images
function loadImg() {
    for (let i = 1; i <= 38; i++) {
        gImgs.push({
            id: i,
            url: `img/initImg/${i}.jpg`,
            keywords: []
        });
    }
    return gImgs;
}

function getImage() {
    //we have a diff between idImg= 1 to location at arr=0
    return gImgs[gMeme.selectedImgId-1]
}


function getGmem() {
    return gMeme;
}

function switchLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++;
    } else {
        gMeme.selectedLineIdx = 0;
    }
    setCurrectLine(gMeme.lines[gMeme.selectedLineIdx]);
}


function setKeyword() {

}
