'use strict'
const gPages = ['gallery', 'editor', 'memes', 'about'];
function init() {
    renderImgs();
}

function renderImgs() {
    const elImageContainer = document.querySelector('.images-container');
    let imgs = loadImg();
    var strHtml = imgs.map(img => {
        return `<img class ="memeImg" onclick="renderPage('editor',this)" data-id="${img.id}" src="${img.url}">`
    });
    elImageContainer.innerHTML = strHtml.join('');
}

function renderPage(showPage, img=null){
    var pageLCase = showPage.toLowerCase()
    var list = document.querySelectorAll('.menu li');

    gPages.forEach( page => {
        document.querySelector(`.${page}-container`).style.display = 'none';
    })
    list.forEach( list => {
        list.classList.remove("active");
        if(list.outerText === showPage) list.classList.add('active');
    })

    const elPage = document.querySelector(`.${pageLCase}-container`);
    elPage.style.display = 'flex';
    if(pageLCase === 'editor') initEditor(img);

}


function renderCanvas() {
    const gMeme = getGmem();
    clearCanvas();
    resizeCanvas();
    //render image
    drawImg();

}

function renderLine(lines) {
    lines.forEach(line => {
        drawText(line);
    })
}

function onSwitchLine() {
    switchLine();
}

function onStrokeLine() {
    onStroke();
}

function onDelete() {
    apiDeleteLine();
}

function onNewLocation(movement) {
    editLocation(movement);
}
