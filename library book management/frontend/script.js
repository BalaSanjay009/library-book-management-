const bookList = document.getElementById('book-list');

// Fetch all books from backend
fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(books => {
        books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author} (${book.publishedYear}) - ${book.availableCopies} copies [Category: ${book.category}]`;
            bookList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error fetching books:', error);
        bookList.textContent = 'Failed to load books.';
    });