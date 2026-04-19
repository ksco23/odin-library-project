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

const removeBookBtnClassname = 'removeBookBtn';
const bookCardClassname = 'bookCard';
const readStatusClassname = 'readStatus';
const changeReadStatusBtnClassname = 'changeReadStatusBtn';
const booksContainer = document.getElementById('booksContainer');
const addBookBtn = document.getElementById('addBookBtn');
const addBookDialog = document.getElementById('addBookDialog');
const addBookCancel = document.getElementById('cancelAddBookDialog');
const addBookSave = document.getElementById('saveAddBookDialog');

booksContainer.addEventListener('click', function (e) {
    const target = e.target;

    if (e.target.classList.contains(removeBookBtnClassname)) {
        const bookCard = target.closest(`.${bookCardClassname}`);
        const bookId = bookCard.dataset.bookId;

        removeBookFromLibrary(bookId);

        writeToHtml();
    }
    else if (e.target.classList.contains(changeReadStatusBtnClassname)) {
        const bookCard = target.closest(`.${bookCardClassname}`);
        const bookId = bookCard.dataset.bookId;
        const book = getBookById(bookId);

        book.setReadStatus(!book.haveRead);

        writeToHtml();
    }
});

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

function getBookById(bookId) {
    const bookIndex = myLibrary.findIndex((libBook) => libBook.bookId === bookId);

    return bookIndex > -1 ? myLibrary[bookIndex] : null;
}

function writeToHtml() {
    //const booksContainer = document.getElementById('booksContainer');

    booksContainer.replaceChildren();

    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement('div');
        bookCard.dataset.bookId = myLibrary[i].bookId;
        bookCard.classList.add(bookCardClassname);

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

        const readStatus = document.createElement('p');
        const readStatusString = myLibrary[i].haveRead ? 'Yes' : 'No'
        readStatus.textContent = 'I have read this book: ' + readStatusString;
        readStatus.classList.add(readStatusClassname);
        bookCard.appendChild(readStatus);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove Book';
        removeBtn.type = 'button';
        removeBtn.classList.add(removeBookBtnClassname);
        bookCard.appendChild(removeBtn);

        const changeReadStatusBtn = document.createElement('button');
        changeReadStatusBtn.textContent = 'Change Read Status';
        changeReadStatusBtn.type = 'button';
        changeReadStatusBtn.classList.add(changeReadStatusBtnClassname);
        bookCard.appendChild(changeReadStatusBtn);

        booksContainer.appendChild(bookCard);
    }
}

const starterBookArray = [
    {
        title: 'The Catcher in the Rye',
        author: 'J. D. Salinger',
        pages: '240',
        read: true
    },
    {
        title: 'Moby-Dick',
        author: 'Herman Melville',
        pages: '704',
        read: true
    },
    {
        title: 'Don Quixote',
        author: 'Miguel de Cervantes',
        pages: '1072',
        read: false
    },
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        pages: '480',
        read: false
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        pages: '336',
        read: true
    },
    {
        title: 'Adventures of Huckleberry Finn',
        author: 'Mark Twain',
        pages: '400',
        read: true
    },
    {
        title: 'Absalom, Absalom!',
        author: 'William Faulkner',
        pages: '320',
        read: false
    },
    {
        title: 'Leaves of Grass',
        author: 'Walt Whitman',
        pages: '592',
        read: false
    }
]

for (let i = 0; i < starterBookArray.length; i++) {
    addBookToLibrary(starterBookArray[i].title, starterBookArray[i].author, starterBookArray[i].pages, starterBookArray[i].read);
}

writeToHtml();