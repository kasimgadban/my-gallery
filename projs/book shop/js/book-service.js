'use strict';


// CRUDL - Create, Read, Update, Delete, List
const PAGE_SIZE = 3;
var gBooks;
var gCurrPageNo = 0;
var gRate = 0;

function createBooks() {
    gBooks = [
        createBook('TO MARS Via THE MOON', 100),
        createBook('Sapiens', 200),
        createBook('Fast Food Nation', 39.99),
        createBook('Jane Grigsons Vegetable Book', 10),
        createBook('When Breath Becomes Air', 299.99),

    ]
}


function createBook(bookName, price) {
    return {
        id: makeId(),
        bookName: bookName,
        price: price,
        // img: img
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
    var bookIdx = gBooks.findIndex(function (car) {
        return car.id === bookId;
    })
    gBooks.splice(bookIdx, 1)

}

function addBook(bookName, price) {
    gBooks.push(createBook(bookName, price));
}

function updateBook(bookId, newPrice) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks[bookIdx].price = newPrice;
}

function getBookImg() {

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



