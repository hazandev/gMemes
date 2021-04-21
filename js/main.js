'use strict'
let sizeWindow = getSizeWindow();
function init() {
    renderImgs();
    searchTags();
}

function renderImgs() {
    const elImageContainer = document.querySelector('.images-container');
    let imgs = loadImages();
    var strHtml = imgs.map(img => {
        return `<img class ="memeImg" onclick="renderPage('editor',this)" data-id="${img.id}" src="${img.url}">`
    });
    elImageContainer.innerHTML = strHtml.join('');
}

function renderPage(showPage, img = null) {
    const pages = ['gallery', 'editor', 'memes', 'about'];
    var pageLCase = showPage.toLowerCase()
    var list = document.querySelectorAll('.menu li');

    pages.forEach(page => {
        document.querySelector(`.${page}-container`).style.display = 'none';
    })
    list.forEach(list => {
        list.classList.remove("active");
        if (list.outerText === showPage) list.classList.add('active');
    })

    const elPage = document.querySelector(`.${pageLCase}-container`);
    elPage.style.display = 'flex';
    if (pageLCase === 'editor') initEditor(img);
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

function renderSearchTags(orderTag) {
    console.log(document.querySelector('.list-keyword'));
    console.log(orderTag[0]);
    document.querySelector('.list-keyword').innerHTML = orderTag[0];
}

function onSearchMems(value) {
    searchMems(value.outerText)
}

function onMoreTags() {

    const elBtnMore = document.querySelector('.btn-keyword');
    elBtnMore.textContent = 'Less'
    if (document.querySelector('.less')){
        elBtnMore.textContent = 'More'
    } 
    elBtnMore.classList.toggle('less');

}

