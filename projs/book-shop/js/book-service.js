'use strict';


// CRUDL - Create, Read, Update, Delete, List
const PAGE_SIZE = 3;
var gBooks;
var gCurrPageNo = 0;


function createBooks() {
    gBooks = [
        createBook('TO MARS Via THE MOON', 100, 0),
        createBook('Sapiens', 200, 0),
        createBook('Fast Food Nation', 39.99, 0),
        createBook('Jane Grigsons Vegetable Book', 10, 0),
        createBook('When Breath Becomes Air', 299.99, 0),

    ]
}


function createBook(bookName, price, rate, img) {
    return {
        id: makeId(),
        bookName: bookName,
        price: price,
        rate: rate,
        img: img
    }
}


function getBooks() {
    var fromBookIdx = gCurrPageNo * PAGE_SIZE;
    return gBooks.slice(fromBookIdx, fromBookIdx + PAGE_SIZE);
}

function getBookById(bookId) {
    return gBooks.find(function (book) {
        return book.id === bookId;
    })
}


function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        gBooks.splice(bookIdx, 1);
        return book.id === bookId;
    });
}



function addBook(bookName, price) {
    gBooks.push(createBook(bookName, price, 0));
}


function updateBook(bookId, newPrice) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks[bookIdx].price = newPrice;
}


function goNextPage() {
    if (getBooks()[getBooks().length - 1] === gBooks[gBooks.length - 1]) return;
    gCurrPageNo++;
    renderBooks();
}

function goPrevPage() {
    if (gCurrPageNo === 0) return;
    gCurrPageNo--;
    renderBooks();
}



