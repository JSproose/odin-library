let myLibrary = [];
const div_content = document.querySelector('.content');

document.querySelector('.new-book').addEventListener("click", () => {
    openForm();
})

document.querySelector('.silent-background').addEventListener("click", () => {
    closeForm();
    document.querySelector('form').reset();
})

function addBookToLibrary(book) {
    myLibrary.push(book);
}

let count = 0;

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const book = Object.fromEntries(new FormData(e.target).entries());
    addBookToLibrary(book);
    displayBooks();
    closeForm();
    e.target.reset();
});


function displayBooks() {

    let index = 0;
    div_content.innerHTML = '';

    for (book of myLibrary) {

        let div_card = document.createElement('div');
        div_card.classList.add('card');

        let div_title = document.createElement('div');
        div_title.textContent = `"${book.title}"`;
        div_title.style.cssText = "font-weight: 900"

        let div_author = document.createElement('div');
        div_author.textContent = book.author;

        let div_pageCount = document.createElement('div');
        div_pageCount.textContent = `Pages: ${book.pageCount}`;


        let div_read = document.createElement('div');

        
        div_read.setAttribute("id", index);
        div_read.addEventListener('click', (e) => {

            if (myLibrary[e.target.id].read) {
                delete myLibrary[e.target.id].read;
            } else {
                myLibrary[e.target.id].read = 'on';
            }
            displayBooks();

        })
        if (book.read) {
            div_read.classList.add('read-book');
            div_read.innerText = "Read";
        } else {
            div_read.classList.add("unread-book")
            div_read.innerText = "Unread"
        }

        let div_delete = document.createElement('div');
        div_delete.setAttribute("id", index);
        div_delete.classList.add('unread-book');
        div_delete.innerText = 'Delete';
        div_delete.addEventListener('click', (e) => {
            myLibrary.splice(e.target.id , 1);
            // console.log(e.target.id);
            displayBooks();
        })


        div_content.appendChild(div_card);
        div_card.appendChild(div_title);
        div_card.appendChild(div_author);
        div_card.appendChild(div_pageCount);
        div_card.appendChild(div_read);
        div_card.appendChild(div_delete);

        index++;
    }


}

function openForm() {
    // document.querySelector('form').classList.remove('hidden');
    // document.querySelector('form').classList.remove('hidden');

    // document.querySelector('.silent-background').classList.remove('hidden');
    document.querySelector('form').style.display = 'flex';
    document.querySelector('.silent-background').style.display = 'block';
}

function closeForm() {
    // document.querySelector('form').classList.add('hidden');
    // document.querySelector('.silent-background').classList.add('hidden');
    document.querySelector('form').style.display = 'none';
    document.querySelector('.silent-background').style.display = 'none';
}



