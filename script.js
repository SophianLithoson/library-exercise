const tableBody = document.querySelector("tbody");
const currentLibrary = [];
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 255, true);
const soiaf = new Book("Game of Thrones", "G.R.R. Martin", 835, false);

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

function displayBooks() {
    currentLibrary.forEach((tome) => {
        const tr = document.createElement("tr");
        let td = document.createElement("td")
        
        let tableData = document.createTextNode(`${tome.title}`);
        td.appendChild(tableData);
        tr.appendChild(td);
        td = document.createElement("td");
        tableData = document.createTextNode(`${tome.author}`);
        td.appendChild(tableData);
        tr.appendChild(td);
        td = document.createElement("td");
        tableData = document.createTextNode(`${tome.numPages}`);
        td.setAttribute("class", "aligned-right");
        td.appendChild(tableData);
        tr.appendChild(td);
        td = document.createElement("td");
        tableData = document.createTextNode(`${tome.isRead}`);
        td.setAttribute("class", "aligned-center");
        td.appendChild(tableData);
        tr.appendChild(td);

        tableBody.append(tr);
    });
}

addBookToLibrary(theHobbit);
addBookToLibrary(soiaf);
displayBooks();

