'use strict';

function init() {
    createBooks();
    doTrans();
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = books.map(function (book) {
        return `
        <tr>
          <th class="medium ids" scope="row">${book.id}</th>
          <td>${book.bookName}</td>
          <td>${book.price}$</td>
          <td>
          <button type="button" class="btn btn-light btn-sm" data-toggle="modal" data-target="#exampleModal" data-trans = "readBtn" 
          onclick="onBookDetails('${book.id}')">Read 🔎</button>
        
          <button type="button" class="btn btn-warning btn-sm" data-trans = "updatePricebtn" 
          onclick="onUpdateBookPrice('${book.id}',event)">Update Price 💵</button>

          <button type="button" class="btn btn-danger btn-sm" data-trans = "deleteBtn" 
          onclick="onDeleteBook('${book.id}',event)">Delete 🗑️</button>
        </tr>
        `
    });
    $('.book-table tbody').html(strHtmls.join(''))
    doTrans();
}

function renderBookModal(bookId) {
    var book = getBookById(bookId);
    var strHtml = `
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">${book.bookName}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            
            <div class="modal-body" ><img src = "img/${book.bookName}.jpg" alt = "book image"></img></div>
            <div class="modal-body"> ${book.price}$</div>
          <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick = "onRateDown('${book.id}')" >-</button>
          <span class="rate ml-2">${book.rate}</span>
          <buttontype="button" class="btn btn-secondary" onclick = "onRateUp('${book.id}')" >+</button>
          </div>
        </div>
      </div>
    </div>
    `
    $('.book-details').html(strHtml);
}

function onUpdateBookPrice(bookId,ev) {
    ev.stopPropagation();
    var newPrice;
    if(newPrice = +prompt(getTrans('givePrice'))){
    updateBook(bookId, newPrice);
    renderBooks();
    }
}

function onBookDetails(bookId) {
    renderBookModal(bookId);
}

function onDeleteBook(bookId, ev) {
    ev.stopPropagation();
    if (confirm(getTrans('sure'))) {
        deleteBook(bookId);
        renderBooks();
    }
}


function onAddNewBook() {
    var $newBookName = $('#new-book-name').val();
    var $newBookPrice = $('#new-book-price').val();
    addBook($newBookName, $newBookPrice);
    renderBooks();
    $newBookName = $('#new-book-name').val('');
    $newBookPrice = $('#new-book-price').val('');
}

function onNextPage() {
    goNextPage()
    renderBooks();
}

function onRateUp(bookId) {
    var book = getBookById(bookId);
    if (book.rate === 10) return;
    (book.rate)++;
    $('.rate').text(book.rate);
}

function onRateDown(bookId) {
    var book = getBookById(bookId);
    if (book.rate === 0) return;
    (book.rate)--;
    $('.rate').text(book.rate);
}

function onSetLang(lang) {
    setLang(lang);
    renderBooks();
}