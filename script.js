const myLibrary = [];

function Book(title, author, pages, haveRead) {
    if (!new.target) {
        throw Error('You must use the new operator to call the constructor.');
    }

    this.bookId = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;

    /*this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${haveRead ? 'have read it' : 'not read yet'}`;
    };*/
}

Book.prototype.setReadStatus = function (status) {
    this.haveRead = status;
}

function addBookToLibrary(title, author, pages, haveRead) {
    myLibrary.push(new Book(title, author, pages, haveRead));
}

function removeBookFromLibrary(bookIdToRemove) {
    const removeIndex = myLibrary.findIndex((libBook) => libBook.bookId === bookIdToRemove);

    if (removeIndex > -1) {
        myLibrary.splice(removeIndex, 1);
    }
}

function writeToHtml() {
    const booksContainer = document.getElementById('booksContainer');
    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement('div');
        bookCard.dataset.bookId = myLibrary[i].bookId;

        const title = document.createElement('p');
        title.textContent = myLibrary[i].title;
        title.classList.add('bookTitle');
        bookCard.appendChild(title);

        const author = document.createElement('p');
        author.textContent = myLibrary[i].author;
        author.classList.add('bookAuthor');
        bookCard.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = myLibrary[i].pages;
        pages.classList.add('numPages');
        bookCard.appendChild(pages);

        booksContainer.appendChild(bookCard);
    }
}


for (let i = 0; i < 10; i++) {
    addBookToLibrary(`title${i}`, `author${i}`, `${i + 100}`, i % 2 === 0);
}
console.log(myLibrary);

writeToHtml();