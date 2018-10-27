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
        gCtx.fillStyle = text.color;
        gCtx.textAlign = text.align;
        text.textWidth = gCtx.measureText(gMeme.txts[gTxtIdx].line).width;
        gCtx.strokeText(text.line, text.x, text.y);
        gCtx.fillText(text.line, text.x, text.y);
    });

}


function createTxts() {
    gMeme.txts.push({
        line: '',
        size: 40,
        font: 'impact',
        align: 'center',
        color: '#ffffff',
        x: (gCanvas.width / 2),
        y: (gCanvas.height - 10),
        textWidth: 0
    });
}


function loadImage() {
    var img = new Image()
    img.src = 'imgs/5.jpg';
    img.onload = () => {
        gMeme.img = img;
        gMeme.txts[0].y = 0 + (img.height / 8);
        gMeme.txts[0].x = img.width / 2;
        renderCanvas();
    }
}


function textMark() {
    var rectX;
    if (gCtx.textAlign = gMeme.txts[gTxtIdx].align === 'center')
        rectX = gMeme.txts[gTxtIdx].x - gMeme.txts[gTxtIdx].textWidth / 2;
    else if (gCtx.textAlign = gMeme.txts[gTxtIdx].align === 'left')
        rectX = gMeme.txts[gTxtIdx].x;
    else rectX = gMeme.txts[gTxtIdx].x - gMeme.txts[gTxtIdx].w;
    gCtx.rect(rectX - 5, gMeme.txts[gTxtIdx].y - (gMeme.txts[gTxtIdx].size) + 2, gMeme.txts[gTxtIdx].textWidth + 10, gMeme.txts[gTxtIdx].size + 2)
    gCtx.stroke();
}
