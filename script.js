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

function addBookToLibrary(title, author, pages, haveRead) {
    myLibrary.push(new Book(title, author, pages, haveRead));
}

function removeBookFromLibrary(bookIdToRemove) {
    const removeIndex = myLibrary.findIndex((libBook) => libBook.bookId === bookIdToRemove);

    if (removeIndex > -1) {
        myLibrary.splice(removeIndex, 1);
    }
}


for (let i = 0; i < 10; i++) {
    addBookToLibrary(`title${i}`, `author${i}`, `${i + 100}`, i % 2 === 0);
}
console.log(myLibrary);