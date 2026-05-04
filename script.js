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
}

Book.prototype.setReadStatus = function (status) {
    this.haveRead = status;
}

const removeBookBtnClassname = 'removeBookBtn';
const bookCardClassname = 'bookCard';
const readStatusClassname = 'readStatus';
const invalidFormFieldClassname = 'invalidFormField';
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
        const bookTitle = getBookById(bookId).title;

        if (window.confirm(`Confirm that you want to delete ${bookTitle} from the library.`)) {
            removeBookFromLibrary(bookId);

            writeToHtml();
        }
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
    clearAddBookDialog();

    addBookDialog.showModal();
});

addBookSave.addEventListener('click', function () {
    const addTitleField = document.getElementById('book_title');
    const addTitle = addTitleField.value.trim();
    const addAuthorFiled = document.getElementById('book_author');
    const addAuthor = addAuthorFiled.value.trim();
    const addPagesField = document.getElementById('book_pages');
    const addPages = addPagesField.value;
    const addIsRead = document.getElementById('book_is_read').checked;

    let formValid = true;

    if (addTitle.length < 1) {
        formValid = false;
        addTitleField.classList.add(invalidFormFieldClassname);
    }
    else {
        addTitleField.classList.remove(invalidFormFieldClassname);
    }

    if (addAuthor.length < 1) {
        formValid = false;
        addAuthorFiled.classList.add(invalidFormFieldClassname);
    }
    else {
        addAuthorFiled.classList.remove(invalidFormFieldClassname);
    }

    if (addPages.length < 1) {
        formValid = false;
        addPagesField.classList.add(invalidFormFieldClassname);
    }
    else {
        addPagesField.classList.remove(invalidFormFieldClassname);
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

    document.getElementById('book_title').classList.remove(invalidFormFieldClassname);
    document.getElementById('book_author').classList.remove(invalidFormFieldClassname);
    document.getElementById('book_pages').classList.remove(invalidFormFieldClassname);
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
    booksContainer.replaceChildren();

    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement('div');
        bookCard.dataset.bookId = myLibrary[i].bookId;
        bookCard.classList.add(bookCardClassname);

        const bookCardTitle = document.createElement('p');
        bookCardTitle.textContent = myLibrary[i].title;
        bookCardTitle.classList.add('bookCardTitle');
        bookCard.appendChild(bookCardTitle);

        const bookInfoContainer = document.createElement('div');
        bookInfoContainer.classList.add('bookInfoContainer');
        bookCard.appendChild(bookInfoContainer);

        const title = document.createElement('p');
        title.textContent = 'Title: ' + myLibrary[i].title;
        title.classList.add('bookTitle');
        bookInfoContainer.appendChild(title);

        const author = document.createElement('p');
        author.textContent = 'Author: ' + myLibrary[i].author;
        author.classList.add('bookAuthor');
        bookInfoContainer.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = 'Pages: ' + myLibrary[i].pages;
        pages.classList.add('numPages');
        bookInfoContainer.appendChild(pages);

        const readStatus = document.createElement('p');
        const readStatusString = myLibrary[i].haveRead ? 'Read' : 'Not Read'
        readStatus.textContent = 'Read Status: ' + readStatusString;
        readStatus.classList.add(readStatusClassname);
        bookInfoContainer.appendChild(readStatus);

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btnContainer');
        bookCard.appendChild(btnContainer);

        const changeReadStatusBtn = document.createElement('button');
        changeReadStatusBtn.textContent = 'Change Read Status';
        changeReadStatusBtn.type = 'button';
        changeReadStatusBtn.classList.add(changeReadStatusBtnClassname);
        btnContainer.appendChild(changeReadStatusBtn);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove Book';
        removeBtn.type = 'button';
        removeBtn.classList.add(removeBookBtnClassname);
        btnContainer.appendChild(removeBtn);

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