'use strict'
const KEY = 'mems';


var gMeme;

var gTags = { 'politics': 0, 'animals': 0, 'sport': 0, 'thank': 0, 'baby': 0, 'sorry': 0, 'confirm': 0, 'not': 0, 'angry': 0, 'love': 0, 'family': 0, 'smart': 0, 'sleep': 0, 'funny': 0, 'cute': 0, 'victory': 0, 'tv': 0, 'kids': 0 };

var gKeyImage = [
    ['politics', 'funny', 'not'],
    ['animals', 'cute', 'love'],
    ['animals', 'cute', 'baby', 'sleep', 'family', 'love'],
    ['animals', 'cute', 'smart'],

    ['baby'],
    ['tv', 'funny', 'smart'],
    ['cute', 'baby', 'funny'],
    ['tv', 'funny'],

    ['cute', 'baby', 'funny'],
    ['politics', 'funny'],
    ['sport', 'funny', 'love'],
    ['tv'],

    ['tv', 'funny'],
    ['tv', 'angry', 'thank', 'not', 'confirm'],
    ['tv', 'angry', 'thank', 'not'],
    ['tv', 'funny'],

    ['politics', 'smart'],
    ['tv', 'kids', 'family', 'smart'],
    ['tv', 'funny', 'victory'],
    ['tv', 'kids', 'victory'],

    ['tv', 'funny'],
    ['tv', 'kids', 'victory'],
    ['cute', 'baby', 'funny', 'victory', 'confirm'],
    ['politics', 'funny', 'sorry'],

    ['animals', 'cute', 'sport']
]


var gImgs = [];
//load images
function loadImages() {
    for (let i = 1; i <= 25; i++) {
        gImgs.push({
            id: i,
            url: `img/initImg/${i}.jpg`,
            keywords: gKeyImage[i - 1]
        });
    }
    return gImgs;
}

function searchImage(textSearch) {
    let imageSearch = [];
    for (let tag in gTags) {
        if (textSearch === tag) {
            imageSearch = _getImageSearch(textSearch);
            renderImgs(imageSearch);
        }
    }
}

function _getImageSearch(textSearch) {
    console.log(textSearch);
    let find = false;
    let imageSearch = [];
    gImgs.forEach(img => {
        find = false;
        img.keywords.forEach((keyword) => {
            if (textSearch.includes(keyword)) find = true;
        })
        if(find) imageSearch.push(img);
    })
    return (imageSearch);
}


function searchTags() {
    _checkPopular();
    renderSearchTags(getTagEl());
    // render list search
}


function getTagEl() {
    let strHtml = ``;
    let orderTag = [];
    let pagintaion = getPagging(1, 2, 3);
    let i = 1;
    for (let tag in gTags) {
        let counterTag = gTags[tag];
        let fontSize = pagintaion * 2 * counterTag
        if (fontSize > 20) fontSize = 22;
        if (fontSize < 8) fontSize = 10;
        strHtml += `<li onclick="onSearchImage(this.outerText)" style="font-size:${fontSize}px;">${tag}</li>`;
        if (i % pagintaion === 0) {
            orderTag.push(strHtml)
            strHtml = '';
        }
        i++
    }
    return orderTag;
}

function _checkPopular() {
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            gTags[`${keyword}`]++;
        })
    })
}

function getTags() {
    return gTags;
}

function initGmem(idImg) {
    gMeme = {
        selectedImgId: idImg,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Your statement',
                size: 40,
                align: 'center',
                color: 'bl',
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
            _addLine();
            break;
        case 'update':
            _updateLine(line);
            break;
        case 'delete':
            _deleteLine();
            break;
        default:
            break;
    }
    renderCanvas();
}

function _addLine() {
    let yPLocation;
    if (gMeme.lines.length === 0) {
        yPLocation = 1;
    } else if (gMeme.lines.length === 1) {
        yPLocation = 9;
    } else {
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
    setCurrectLine(gMeme.lines[gMeme.lines.length-1]);
    renderLineControl(gMeme.lines[gMeme.lines.length-1])
}

function _updateLine(line) {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1, line);
}

function _deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function getImage() {
    //we have a diff between idImg= 1 to location at arr=0
    return gImgs[gMeme.selectedImgId - 1]
}

function getGmem() {
    return gMeme;
}

function setLineIndex(index) {
    gMeme.selectedLineIdx = index;
}

