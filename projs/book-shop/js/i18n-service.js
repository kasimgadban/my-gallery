'use strict';

var gTrans = {
    title: {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },
    AddNewBook: {
        en: 'Add new book',
        he: 'הוסף ספר חדש',
    },
    newbookName: {
        en: 'Book Name',
        he: 'שם ספר',
    },
    newbookPrice: {
        en: 'Book Price',
        he: 'מחיר ספר'
    },
    addBook: {
        en: 'Add Book',
        he: 'הוסף ספר',
    },
    bookId: {
        en: 'Id',
        he: 'מספר מזהה',
    },
    bookTitle: {
        en: 'Title',
        he: 'שם',
    },
    bookPrice: {
        en: 'Price',
        he: 'מחיר',
    },
    actions: {
        en: 'Actions',
        he: 'פעולות',
    },
    prev: {
        en: 'Previous',
        he: 'הקודם'
    },
    next: {
        en: "Next",
        he: "הבא"
    },

    newNameHolder: {
        en: 'new book name',
        he: 'שם הספר החדש'
    },

    newPriceHolder: {
        en: 'new book price',
        he: 'מחיר הספר החדש'
    },

    updatePricebtn: {
        en: 'Update price 💵',
        he: '💵 עדכן מחיר'
    },

    readBtn: {
        en: 'Read 🔎',
        he: '🔎 קרא'

    },

    deleteBtn: {
        en: 'Delete 🗑️',
        he: '🗑️ מחק'
    },

    lang: {
        en: 'language',
        he: 'שפה'
    },

    sure:{
        en: 'are you sure?',
        he: 'אתה בטוח?'
    },

    givePrice:{
        en:'enter new price',
        he: 'הכנס מחיר חדש'
    }
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.getAttribute('data-trans');

        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    if (!txt) txt = keyTrans['en'];

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
    if (gCurrLang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans();
}