'use strict';

function init() {
    createBooks();
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
          <button type="button" class="btn btn-light" data-toggle="modal" data-target="#exampleModal"
          onclick="onBookDetails('${book.id}')">Read</button>
        
          <button type="button" class="btn btn-warning"
          onclick="readAndUpdateBook('${book.id}')">Update Price</button>

          <button type="button" class="btn btn-danger"
          onclick="onDeleteBook('${book.id}')">Delete</button>
        </tr>
        `
    });
    $('.book-table tbody').html(strHtmls.join(''))

}

function renderBookModal(bookId) {
    var book = getBookById(bookId);
    console.log('Book id', bookId);
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
            
            <div class="modal-body"><img src = "img/book.jpg"></img></div>
            <div class="modal-body"> ${book.price}$</div>
          <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick = "onRateDown()" >-</button>
          <span class="rate ml-2">${gRate}</span>
          <buttontype="button" class="btn btn-secondary" onclick = "onRateUp()" >+</button>
          </div>
        </div>
      </div>
    </div>
    `
    $('.book-details').html(strHtml);
}

function readAndUpdateBook(bookId) {
    var newPrice = +prompt('Price?');
    updateBook(bookId, newPrice);
    renderBooks();
}

function onBookDetails(bookId) {
    renderBookModal(bookId);
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onNextPage() {
    goNextPage()
    renderBooks();
}

function onRateUp() {
    if (gRate === 10) return;
    gRate++;
    $('.rate').text(gRate);
}

function onRateDown() {
    if (gRate === 0) return;
    gRate--;
    $('.rate').text(gRate);
}