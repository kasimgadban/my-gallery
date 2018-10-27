'use strict';


function renderCanvas() {
    gCanvas.width = gMeme.img.width;
    gCanvas.height = gMeme.img.height;
    gCtx.drawImage(gMeme.img, 0, 0, gCanvas.width, gCanvas.height);
    gMeme.txts.forEach(function (text) {
        gCtx.font = text.size + 'px ' + text.font;
        gCtx.shadowColor = text.shadow;
        gCtx.shadowOffsetX = text.shadowOffSetX;
        gCtx.shadowOffsetY = text.shadowOffSetY;
        gCtx.shadowBlur = text.shadowBlur;
        gCtx.strokeStyle = text.strokeStyle;
        gCtx.fillStyle = text.color;
        gCtx.lineWidth = text.lineWidth;
        gCtx.textAlign = text.align;
        gCtx.strokeText(text.line, text.x, text.y);
        gCtx.fillText(text.line, text.x, text.y);
    });
}

function loadImage() {
    var img = new Image()
    img.src = 'imgs/5.jpg';
    img.onload = () => {
        gMeme.img = img;
        gMeme.txts[0].y = 0 + (img.height/8);
        gMeme.txts[0].x = img.width / 2;
        renderCanvas();
    }
}


function createTxts() {
    gMeme.txts.push({
        line: '',
        size: 25,
        font: 'impact',
        align: 'center',
        color: '#ffffff',
        x: (gCanvas.width / 2),
        y: (gCanvas.height-10)
    });
}
