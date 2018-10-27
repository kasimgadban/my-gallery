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
function editMeme(whatsChange, val) {
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

function addLine() {
    var inputCheck = document.querySelector('.text');
    if (inputCheck.value === '') return;
    inputCheck.value = '';
    createTxts();
    gTxtIdx++;
    if(gMeme.txts.length > 2) gMeme.txts[gTxtIdx].y= gCanvas.height/2;
}

function downloadImg(elLink) {
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'my-Meme.jpg'
}

function addShadow(elShadowCheck) {
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

function addStroke(elStrokeCheck) {
    var currText = gMeme.txts[gTxtIdx];
    if (elStrokeCheck.checked) {
        currText.strokeStyle = 'black';
        currText.lineWidth = 5;

    }
    else {
        currText.strokeStyle = '';
        currText.lineWidth = 0;
    }
    renderCanvas();
}


function deleteLine() {
    var inputText = document.querySelector('.text');
    if (inputText.value === '') return;
    let idxToDelete = gTxtIdx;
    if (gTxtIdx === 0 && gMeme.txts.length === 0) return;
    gMeme.txts.splice(idxToDelete, 1);
    if (gTxtIdx > gMeme.txts.length) gTxtIdx--;
    inputText.value = gMeme.txts[gTxtIdx].line;
    gMeme.txts.forEach(function (text){
        if(text.line === ' ') text.pop();
    })
    loadImage();
    renderCanvas();
}

function prevLine() {
    var inputText = document.querySelector('.text');
    if (gMeme.txts.length > 1) gTxtIdx--;
    else return;
    inputText.value = gMeme.txts[gTxtIdx].line;
    renderCanvas();
}

function nextLine() {
    var inputText = document.querySelector('.text');
    if (gMeme.txts.length > 1) gTxtIdx++;
    inputText.value = gMeme.txts[gTxtIdx].line;
    renderCanvas();
}


function fontChange(elFont) {
    if (elFont === 'impact') gMeme.txts[gTxtIdx].font = 'impact';
    if (elFont === 'mali') gMeme.txts[gTxtIdx].font = 'mali';
    if (elFont === 'lato') gMeme.txts[gTxtIdx].font = 'latoregular';
    renderCanvas();
}


function alignChange(elAlign) {
    if (elAlign === 'center'){
         gMeme.txts[gTxtIdx].align = 'center';
         gMeme.txts[gTxtIdx].x = gCanvas.width / 2;
    }
    if (elAlign === 'right') {
        gMeme.txts[gTxtIdx].align = 'right';
        gMeme.txts[gTxtIdx].x = gCanvas.width-20;
    }
    if (elAlign === 'left') {
        gMeme.txts[gTxtIdx].align = 'left';
        gMeme.txts[gTxtIdx].x = 20;
    }
    renderCanvas();
}
