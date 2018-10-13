'use strict';

const MINE = "💣";
const SMILEY = "🙂";
const VECTORY = "😎";
const GAMEOVER = "😭";
const CELL_OPEND = "😮";
const FLAG = "🚩";

var gBoard = [];

var gLevel = [
    { LEVEL: 'Begginer', SIZE: 4, MINES: 2 },
    { LEVEL: 'Medium', SIZE: 6, MINES: 5 },
    { LEVEL: 'Expert', SIZE: 9, MINES: 15 }
];

var gChosenLevel;
var gfirstclick = true;

var gState = {
    isGameOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
}

var stopTime;



function initGame() {
    clearInterval(stopTime);
    revalTime();
    chosenLevel(0);   
}


function chosenLevel(levelIdx) {
    gChosenLevel = gLevel[levelIdx];
    startGame()
}

function startGame() {
    gfirstclick = true;
    gState.isGameOn = false;
    gBoard = BuildBoard(gChosenLevel);
    renderBoard(gBoard);
    renderTime();
}

function BuildBoard(level) {
    var board = [];
    for (var i = 0; i < level.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < level.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            };
        }
    }
    console.table(board);
    return board;
}

function setMines() {
    //debugger;

    for (var i = 0; i < gChosenLevel.MINES; i++) {
        var x = Math.floor(Math.random() * gChosenLevel.SIZE);
        var y = Math.floor(Math.random() * gChosenLevel.SIZE);
        if (gBoard[x][y].isMine) {
            x = Math.floor(Math.random() * gChosenLevel.SIZE);
            y = Math.floor(Math.random() * gChosenLevel.SIZE);
        }
        if (!gBoard[x][y].isMine)
            gBoard[x][y].isMine = true;
        setMinesNegsCount(gBoard, x, y);
    }

}

function setMinesNegsCount(mat, i, j) {
    for (var idx = i - 1; idx <= i + 1; idx++) {
        if (idx >= 0 && idx < mat.length)
            for (var jdx = j - 1; jdx <= j + 1; jdx++) {
                if ((idx !== i || jdx !== j) && jdx >= 0 && jdx < mat.length && mat[idx][jdx].isMine !== true)
                    mat[idx][jdx].minesAroundCount++;
            }
    }
}



function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" class="cell"  onmouseup="cellClicked(this,event)" >'
                + cell + '</td>';
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}



function renderCell(i, j) {
    //debugger;
    var elCell = document.querySelector(`#cell-${i}-${j}`);
    elCell.classList.add('shown-cell');
    if (gBoard[i][j].isMine && gBoard[i][j].isShown) {
        elCell.innerHTML = MINE;
        gBoard[i][j] = MINE;
        console.table(gBoard);
    }
    else if (gBoard[i][j].minesAroundCount > 0)
        elCell.innerHTML = gBoard[i][j].minesAroundCount;
    else elCell.innerHTML = '';
}



function cellClicked(elCell, ev) {
    //debugger;
    var coord = [];
    coord = getCellCoord(elCell.id);
    var elH1 = document.querySelector('h1');
    setTimeout(function () {
        elH1.innerHTML = CELL_OPEND;
    }, 0.1);

    setTimeout(function () {
        elH1.innerHTML = SMILEY;
    }, 500);

    if(gBoard[coord.i][coord.j].isMarked)
        return;
    if (gfirstclick) {
        gfirstclick = false;
        gState.isGameOn = true;
        gBoard[coord.i][coord.j].isShown = true;
        renderCell(coord.i, coord.j);
        gState.shownCount++;
        setMines();
        setTimer();
        console.table(gBoard);
    }

    if (gState.isGameOn) {
        if (ev.button === 0) {
            if (gBoard[coord.i][coord.j].isMine) {
                gState.isGameOn = false;
                clearInterval(stopTime);
                revalMines();
            } else {
                gBoard[coord.i][coord.j].isShown = true;
                renderCell(coord.i, coord.j);
                gState.shownCount++;
            }
            if (gBoard[coord.i][coord.j].minesAroundCount === 0 && (!gBoard[coord.i][coord.j].isMine)) expandShown(coord.i, coord.j);
        }
        if (ev.button === 2) {
            cellMarked(elCell);
        }
    }
}

function revalMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var elCell = document.querySelector(`#cell-${i}-${j}`)
            if (gBoard[i][j].isMine) {
                elCell.innerHTML = MINE;
                elCell.classList.add('shown-cell');
            }
        }
    }
}


function cellMarked(elCell) {
    var coord = getCellCoord(elCell.id);
    if (!gBoard[coord.i][coord.j].isMarked) {
        gBoard[coord.i][coord.j].isMarked = true;
        elCell.innerHTML = FLAG;
        gState.markedCount++;
    } else {
        elCell.innerHTML = ' ';
        elCell.classList.remove('shown-cell');
        gBoard[coord.i][coord.j].isMarked = false;
        gState.markedCount--;
    }
    setMineCounter();
}

function expandShown(i, j) {
    //debugger;
    for (var idxI = i - 1; idxI <= i + 1; idxI++) {
        for (var idxJ = j - 1; idxJ <= j + 1; idxJ++) {
            if (idxI < 0 || idxI > gBoard.length - 1 || idxJ < 0 || idxJ > gBoard.length - 1) continue;
            if (gBoard[idxI][idxJ].isMarked || gBoard[idxI][idxJ].isShown) continue;
            gBoard[idxI][idxJ].isShown = true;
            renderCell(idxI, idxJ);
            gState.shownCount++;
            if (gBoard[idxI][idxJ].minesAroundCount > 0) continue;
            expandShown(idxI, idxJ);

        }
    }
}



function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    return coord;
}


function checkGameOver() {

}

function setTimer() {
    var startTime = new Date().getTime();
    stopTime = setInterval(function () {
        if (gState.secsPassed === 0) {
            gState.secsPassed = 1;
        } else {
            var currTime = new Date().getTime();
            gState.secsPassed = Math.round((currTime - startTime) / 1000);
        }
        renderTime();
    }, 1000)
}

function renderTime() {
    var elTimer = document.querySelector('.timer');
    var secs = gState.secsPassed % 60;
    var mins = Math.floor(gState.secsPassed / 60);
    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = '0' + mins;
    elTimer.innerHTML = `${mins}:${secs}`
}

function revalTime(){
    var elTimer = document.querySelector('.timer');
    elTimer.innerHTML = "00:00";
}
function setMineCounter() {
    var elCounter = document.querySelector('.minescount');
    elCounter.innerHTML = (gLevel.MINES) - (gState.markedCount);

}

