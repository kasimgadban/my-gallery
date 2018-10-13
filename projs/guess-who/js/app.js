'use strict';
const KEY_QUESTS = 'QuestsTree';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

$(document).ready(init);

function init() {
    var storedQuests = getFromStorage(KEY_QUESTS);
    if (storedQuests) {
        gQuestsTree = storedQuests;
    } else {
        gQuestsTree = createQuest('Male?');

        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
}

function startGuessing() {
    // TODO: hide the gameStart section
    $('.gameStart').hide(1000);
    renderQuest();
    // TODO: show the gameQuest section
    $('.gameQuest').show(1200);
}

function renderQuest() {
    // TODO: select the <h2> inside gameQuest and update its text by the currQuest text
    $('.gameQuest > h2').html(gCurrQuest.txt);
}

function userResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
            $('.gameQuest').hide();
            restartGame();
        } else {
            alert('I dont know...teach me!')
            // TODO: hide and show gameNewQuest section
            $('.gameQuest').hide();
            $('.gameNewQuest').show();
        }
    } else {
        // TODO: update the prev, curr and res global vars
        gPrevQuest = gCurrQuest;
        gCurrQuest = gCurrQuest[res];
        gLastRes = res;
        renderQuest();
    }
}

function addGuess(ev) {
    // TODO: create 2 new Quests based on the inputs' values
    // TODO: connect the 2 Quests to the quetsions tree
    ev.preventDefault();
    var $newGuess = $('#newGuess').val();
    var $newQuest = $('#newQuest').val();
    gPrevQuest[gLastRes] = createQuest($newQuest);
    gPrevQuest[gLastRes].yes = createQuest($newGuess);
    gPrevQuest[gLastRes].no = gCurrQuest;
    saveToStorage('QuestsTree', gQuestsTree);
    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameStart').show();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

