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

const addBookBtn = document.getElementById('addBookBtn');
const addBookDialog = document.getElementById('addBookDialog');
const addBookCancel = document.getElementById('cancelAddBookDialog');
const addBookSave = document.getElementById('saveAddBookDialog');

addBookBtn.addEventListener('click', function () {
    //addBookToLibrary('Added Book', 'The Man', 25, false);
    //writeToHtml();
    clearAddBookDialog();

    addBookDialog.showModal();
});

addBookSave.addEventListener('click', function () {
    const addTitle = document.getElementById('book_title').value.trim();
    const addAuthor = document.getElementById('book_author').value.trim();
    const addPages = document.getElementById('book_pages').value;
    const addIsRead = document.getElementById('book_is_read').checked;

    let formValid = true;

    if (addTitle.length < 1) {
        //alert('Title is a rquired field');
        formValid = false;
    }
    if (addAuthor.length < 1) {
        formValid = false;
    }
    if (addPages.length < 1) {
        formValid = false;
    }

    if (formValid) {
        addBookToLibrary(addTitle, addAuthor, addPages, addIsRead);

        addBookDialog.close();

        writeToHtml();
    }
});

addBookCancel.addEventListener('click', function () {
    addBookDialog.close();
});

function clearAddBookDialog() {
    addBookDialog.querySelector('form').reset();
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

    booksContainer.replaceChildren();

    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement('div');
        bookCard.dataset.bookId = myLibrary[i].bookId;
        bookCard.classList.add('bookCard');

        const title = document.createElement('p');
        title.textContent = 'Title: ' + myLibrary[i].title;
        title.classList.add('bookTitle');
        bookCard.appendChild(title);

        const author = document.createElement('p');
        author.textContent = 'Author: ' + myLibrary[i].author;
        author.classList.add('bookAuthor');
        bookCard.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = 'Pages: ' + myLibrary[i].pages;
        pages.classList.add('numPages');
        bookCard.appendChild(pages);

        booksContainer.appendChild(bookCard);
    }
}


for (let i = 0; i < 10; i++) {
    addBookToLibrary(`title${i}`, `author${i}`, `${i + 100}`, i % 2 === 0);
}

writeToHtml();