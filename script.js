const tableBody = document.querySelector("tbody");
const currentLibrary = [];
const buttonAddBook = document.getElementById("add-book");
const addBookDialog = document.getElementById("add-book-dialog");
const dialogConfirmBtn = document.getElementById("confirm-btn");
const dialogCancelBtn = document.getElementById("cancel-btn");
const dialogTitle = document.getElementById("title");
const dialogAuthor = document.getElementById("author");
const dialogPages = document.getElementById("num-pages");
const dialogIsRead = document.getElementById("been-read");

// event listeners

buttonAddBook.addEventListener("click", () => {     // clear form and display dialog
    dialogTitle.value = "";
    dialogAuthor.value = "";
    dialogPages.value = "";
    dialogIsRead.value = "No";
    addBookDialog.showModal();
});

dialogConfirmBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (dialogTitle.checkValidity() && dialogAuthor.checkValidity() && dialogPages.checkValidity()) {
        const newBook = new Book(dialogTitle.value, dialogAuthor.value, dialogPages.value, dialogIsRead.value);
        addBookToLibrary(newBook);
        displayBooks();
        addBookDialog.close();
    }
})

dialogCancelBtn.addEventListener("click", (event) => {
    event.preventDefault();

    dialogTitle.value = "";
    dialogAuthor.value = "";
    dialogPages.value = "";
    dialogIsRead.value = "No";

    addBookDialog.close();
})

// functions

class Book {
    constructor(title, author, numPages, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
    }

    info() {
        return `${title} by ${author}, ${numPages} pages, ${(isRead === "Yes") ? "has been read" : "not read yet"}`;
    }

    flipIsRead() {
        this.isRead = (this.isRead === "Yes") ? "No" : "Yes";
    }
}

function addBookToLibrary(tome) {
    currentLibrary.push(tome);
}

function removeBookFromLibrary() {
    currentLibrary.splice(this.value, 1);
    displayBooks();
}

function toggleIsRead() {
    currentLibrary[this.value].flipIsRead();
    displayBooks();
}

function displayBooks() {                    // clear table then add all existing books to it
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    let index = 0;

    currentLibrary.forEach((tome) => {
        const tr = document.createElement("tr");

        let td = document.createElement("td");
        let tdText = document.createTextNode(`${tome.title}`);
        td.appendChild(tdText);
        tr.appendChild(td);

        td = document.createElement("td");
        tdText = document.createTextNode(`${tome.author}`);
        td.appendChild(tdText);
        tr.appendChild(td);

        td = document.createElement("td");
        tdText = document.createTextNode(`${tome.numPages}`);
        td.setAttribute("class", "aligned-right");
        td.appendChild(tdText);
        tr.appendChild(td);

        td = document.createElement("td");
        let newButton = document.createElement("button");
        tdText = document.createTextNode(`${tome.isRead}`);
        newButton.setAttribute("value", `${index}`);
        newButton.setAttribute("style", "background-color: brown; color: antiquewhite; padding: 2px 8px;");
        newButton.addEventListener("click", toggleIsRead);
        newButton.appendChild(tdText);
        td.setAttribute("class", "aligned-center");
        td.appendChild(newButton);
        tr.appendChild(td);

        td = document.createElement("td");
        newButton = document.createElement("button");
        tdText = document.createTextNode("X");
        newButton.setAttribute("value", `${index}`);
        newButton.setAttribute("style", "background-color: red; color: antiquewhite; padding: 2px;");
        newButton.addEventListener("click", removeBookFromLibrary);
        newButton.appendChild(tdText);
        td.setAttribute("class", "aligned-center");
        td.appendChild(newButton);
        tr.appendChild(td);

        tableBody.append(tr);
        index++;
    });
}

// main

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 255, "Yes");
const soiaf = new Book("Game of Thrones", "G.R.R. Martin", 835, "No");

addBookToLibrary(theHobbit);
addBookToLibrary(soiaf);
displayBooks();

