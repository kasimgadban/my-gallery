'use strict';


var gCanvas;
var gCtx;
var gTxtIdx = 0;
var gMeme = {
    img: '',
    txts: []
}

function init() {
    initCanvas();
    loadImage();
    createTxts();
}

function initCanvas() {
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = window.innerWidth;
    gCanvas.height = window.innerHeight;
    gCtx = gCanvas.getContext('2d');
}


// change to switch func**
function onEditMeme(whatsChange, val) {
    var obj = gMeme.txts[gTxtIdx]
    if (whatsChange === 'line')
        obj.line = val;
    if (whatsChange === 'sizeUp')
        obj.size += 5;
    if (whatsChange === 'sizeDown')
        obj.size -= 5;
    if (whatsChange === 'up')
        obj.y -= 10;
    if (whatsChange === 'down')
        obj.y += 10;
    if (whatsChange === 'right')
        obj.x += 10;
    if (whatsChange === 'left')
        obj.x -= 10;
    if (whatsChange === 'color')
        obj.color = val;
    renderCanvas();
}


function onAddLine() {
    var inputCheck = document.querySelector('.text');
    if (inputCheck.value === '') return;
    inputCheck.value = '';
    gTxtIdx++;
    createTxts();
    if (gMeme.txts.length > 2) gMeme.txts[gTxtIdx].y = gCanvas.height / 2;
    renderCanvas();
}

function onDeleteLine() {
    var inputText = document.querySelector('.text');
    if (inputText.value === '') return;
    let idxToDelete = gTxtIdx;
    if (gMeme.txts.line !== '') {
        gMeme.txts.splice(idxToDelete, 1);
    }
    else return;
    inputText.value = gMeme.txts[gTxtIdx].line;
    renderCanvas();
}


function onNextLine() {
    var inputText = document.querySelector('.text');
    if (gMeme.txts.length - 1 > gTxtIdx) gTxtIdx++;
    else return;
    inputText.value = gMeme.txts[gTxtIdx].line;
    renderCanvas();
    textMark();
}


function onPrevLine() {
    var inputText = document.querySelector('.text');
    if (gTxtIdx > 0) gTxtIdx--;
    else return;
    inputText.value = gMeme.txts[gTxtIdx].line;
    renderCanvas();
    textMark();
}


function onAddShadow(elShadowCheck) {
    var currText = gMeme.txts[gTxtIdx];
    if (elShadowCheck.checked) {
        currText.shadow = 'black';
        currText.shadowOffSetX = 2;
        currText.shadowOffSetY = 2;
        currText.shadowBlur = 2;
    }
    else {
        currText.shadow = '';
        currText.shadowOffSetX = 0;
        currText.shadowOffSetY = 0;
        currText.shadowBlur = 0;
    }
    renderCanvas();
}


// check *************************
function onAddStroke(elStrokeCheck) {
    var currText = gMeme.txts[gTxtIdx];
    if (elStrokeCheck.checked) {
        currText.lineWidth = 3;
    }
    else {
        currText.linewidth = 0;
    }
    renderCanvas();
}


function onFontChange(elFont) {
    if (elFont === 'impact') gMeme.txts[gTxtIdx].font = 'impact';
    if (elFont === 'mali') gMeme.txts[gTxtIdx].font = 'mali';
    if (elFont === 'lato') gMeme.txts[gTxtIdx].font = 'latoregular';
    renderCanvas();
}


function onAlignChange(elAlign) {
    if (elAlign === 'center') {
        gMeme.txts[gTxtIdx].align = 'center';
        gMeme.txts[gTxtIdx].x = gCanvas.width / 2;
    }
    if (elAlign === 'right') {
        gMeme.txts[gTxtIdx].align = 'right';
        gMeme.txts[gTxtIdx].x = gCanvas.width - 20;
    }
    if (elAlign === 'left') {
        gMeme.txts[gTxtIdx].align = 'left';
        gMeme.txts[gTxtIdx].x = 20;
    }
    renderCanvas();
}


function onDownloadImg(elLink) {
    renderCanvas();
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'my-Meme.jpg'
}

