const tableBody = document.querySelector("tbody");
const currentLibrary = [];
const buttonAddBook = document.getElementById("add-book");
const addBookDialog = document.getElementById("add-book-dialog");
const dialogConfirmBtn = document.getElementById("confirm-btn");
const dialogTitle = document.getElementById("title");
const dialogAuthor = document.getElementById("author");
const dialogPages = document.getElementById("num-pages");
const dialogIsRead = document.getElementById("been-read");

// event listeners

buttonAddBook.addEventListener("click", () => {     // clear form and display dialog
    dialogTitle.value = "";
    dialogAuthor.value = "";
    dialogPages.value = "";
    dialogIsRead.value = "false";
    addBookDialog.showModal();
});

dialogConfirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    const newBook = new Book(dialogTitle.value, dialogAuthor.value, dialogPages.value, dialogIsRead.value);
    addBookToLibrary(newBook);
    displayBooks();
    addBookDialog.close(); 
})


// functions

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;

    this.info = function () {
        return `${title} by ${author}, ${numPages} pages, ${(isRead) ? "has been read" : "not read yet"}`;
    }
}

function addBookToLibrary(tome) {
    currentLibrary.push(tome);
}

function removeBookFromLibrary() {
    currentLibrary.splice(this.value, 1);
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
        tdText = document.createTextNode(`${tome.isRead}`);
        td.setAttribute("class", "aligned-center");
        td.appendChild(tdText);
        tr.appendChild(td);

        td = document.createElement("td");
        let newButton = document.createElement("button");
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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 255, true);
const soiaf = new Book("Game of Thrones", "G.R.R. Martin", 835, false);

addBookToLibrary(theHobbit);
addBookToLibrary(soiaf);
displayBooks();

