class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');

    //Create element
    const row = document.createElement('tr');
    //Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    //Append to list
    list.appendChild(row);
  }

  showAlert(message, className) {
    //Create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;

    //Add text
    div.appendChild(document.createTextNode(message));

    //Get parent
    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');

    //Insert alert
    container.insertBefore(div, form);

    //Timeout after 3 seconds
    setTimeout(() => {
      div.style.display = 'none';
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//Event Listener for adding a book
document.querySelector('#book-form').addEventListener('submit', e => {
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //Instantiate book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  //Validate
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all the fields', 'error');
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Show success
    ui.showAlert('Book Added!', 'success');

    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//Event listener for delete
document.querySelector('#book-list').addEventListener('click', e => {
  //Instantiate the UI
  const ui = new UI();

  //Delete book
  ui.deleteBook(e.target);

  //Show message
  ui.showAlert('Book removed!', 'success');

  e.preventDefault();
});
