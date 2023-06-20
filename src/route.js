const {addBook, showBooks, showBookById, updateBook, deleteBook} = require('./handlers.js');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: showBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: showBookById,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBook,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook,
    }
]

module.exports = routes

