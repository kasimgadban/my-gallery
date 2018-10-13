'use strict';


var gQuests = [];
var gCurrQuestIdx = 0;


var questImg = [];

function initGame() {
    createQuests();
    renderQuest();
}

function createQuests() {
    var question1 = { id: 1, opt: ['Turtles eating pizza', 'Ninja turtles eating pizza'], correctOptIndex: 2 };
    var question2 = { id: 2, opt: ['SpongeBob boss', 'Rich crab'], correctOptIndex: 1 };
    var question3 = { id: 3, opt: ['Papa Smurf', 'Avatar\'s Grandpa'], correctOptIndex: 1 };
    gQuests.push(question1);
    gQuests.push(question2);
    gQuests.push(question3);

    for (var i = 0; i < gQuests.length; i++) {
        questImg[i] = gQuests[i].id + ".png";
    }
}

function renderQuest() {
    var elImg = document.querySelector('img');
    var elOpt1 = document.querySelector('.option1');
    var elOpt2 = document.querySelector('.option2');
    elImg.src = 'img/' + questImg[gCurrQuestIdx];
    elOpt1.innerHTML = gQuests[gCurrQuestIdx].opt[0];
    elOpt2.innerHTML = gQuests[gCurrQuestIdx].opt[1];
}

function checkAnswer(optIdx) {
    var correctIdx = gQuests[gCurrQuestIdx].correctOptIndex;
    if (correctIdx === optIdx) {
        console.log("correct");
        gCurrQuestIdx++;
    } else console.log('wrong');

    if (gCurrQuestIdx > gQuests.length - 1) {
        alert('Well done!');
        initGame();
        return;
    }
    else renderQuest();
}