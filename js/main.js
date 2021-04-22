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

function renderSearchTags(orderTag, all = false) {
    if (!all) {
        closeSearchModal()
        document.querySelector('.list-keyword').innerHTML = orderTag[0];
    } else {
        console.log(orderTag);
        let renderTags = ``;
        orderTag.forEach(tagLine => {
            renderTags +=  `<div>${tagLine}</div>` 
        })
        openSearchModal(renderTags);
    }
}

function openSearchModal(tags){
    document.querySelector('.list-keyword').style.position = 'absolute';
    document.querySelector('.btn-keyword').style.position = 'absolute';
    document.querySelector('.input-search').style.display = 'none';
    document.querySelector('.list-keyword').style.height = '100%';
    document.querySelector('.btn-keyword').style.position = 'relative';
    document.querySelector('.list-keyword').style.position = 'relative';
    document.querySelector('.list-keyword').innerHTML = tags;
}

function closeSearchModal(tags){
    document.querySelector('.list-keyword').style.position = 'relative';
    document.querySelector('.btn-keyword').style.position = 'relative';
    document.querySelector('.input-search').style.display = 'inline-block';
    document.querySelector('.list-keyword').style.width = '100%';
    document.querySelector('.list-keyword').style.height = '100%';
    document.querySelector('.list-keyword').innerHTML = tags;
}

function onSearchMems(value) {
    searchMems(value.outerText)
}

function onMoreTags() {
    const elBtnMore = document.querySelector('.btn-keyword');
    elBtnMore.textContent = 'More'
    elBtnMore.classList.toggle('less');
    if (document.querySelector('.less')) {
        elBtnMore.textContent = 'Less'
        renderSearchTags(getTagEl(), true);
    } else {
        renderSearchTags(getTagEl(), false);
    }
    //render all tags
}

function onShare() {

}

function onDownload() {

}
function onSave() {

}