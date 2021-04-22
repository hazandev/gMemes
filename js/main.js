'use strict'
let gSearchText = '';
function init() {
    renderImgs();
    searchTags();
}

function renderImgs(images = loadImages()) {
    const elImageContainer = document.querySelector('.images-container');
    let imgs = images;
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
    document.querySelector('.btn-keyword').style.width = '10rem';
    document.querySelector('.btn-keyword').style.height = '3rem';

    document.querySelector('.input-search').style.opacity = '0';
    document.querySelector('.list-keyword').style.height = '100%';
    document.querySelector('.btn-keyword').style.position = 'relative';
    document.querySelector('.list-keyword').style.position = 'relative';
    document.querySelector('.list-keyword').innerHTML = tags;
}

function closeSearchModal(tags){
    document.querySelector('.list-keyword').style.position = 'relative';
    document.querySelector('.btn-keyword').style.position = 'relative';
    document.querySelector('.input-search').style.opacity = '1';
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

function onSearchImage(searchVal){
    gSearchText = searchVal;
    searchImage(gSearchText);
}

function onSuccess(uploadedImgUrl) {
    uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    console.log(uploadedImgUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`, '_blank')

}

function onShare() {
    var imgContent = getCanvas().toDataURL('image/jpeg')
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: imgContent
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

function onDownload(elLink) {
    var imgContent = getCanvas().toDataURL('image/jpeg')
    elLink.href = imgContent;
}

function renderLineControl(line)
{
    console.log(line);
    console.log(document.querySelector('input[name=text]'));
    document.querySelector('input[name=text]').value = line.txt;
    document.querySelector('.btn-color').style.backgroundImage = `linear-gradient(-38deg, ${line.color} 0%, ${line.color} 1%, #333 100%)`;
    document.querySelector('input[name=text]').style.opacity = '1'
}
function onSave() {
}