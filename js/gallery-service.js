'use strict';

var gProj;
var gDate = new Date();

function creatProjects(){
    gProj = [
        creatProject('book shop','book shop','pick your best book','online old books shop','projs/book-shop/index.html'),
        creatProject('chess','chess','Lets play chess!','chess board game','projs/mister-chess/index.html'),
        creatProject('guess who','guess who','Think of someone..','Let me guess who you think about','projs/guess-who/index.html'),
        creatProject('in picture','in picture','Whats in the picture?','Click the sentence that describes the picture','projs/in-picture/index.html'),
        creatProject('mineswepeer','mineswepeer','my mineswepeer edition','beta version!!','projs/mineswepeer/index.html')
    ]
}



function creatProject(id,name,title,desc,url,labels){
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: gDate.getFullYear(),
        labels: labels
    }
}

function getProjs(){
    return gProj;
}

function getProjById(projs,projId){
    return projs.find(function (proj){
        return proj.id === projId;
    });
}

