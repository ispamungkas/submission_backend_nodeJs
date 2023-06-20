const { nanoid } = require('nanoid');
const books = require('./bookdatas')

const addBook = (request, h) => {
    const { 
        name, 
        year, 
        author, 
        summary, 
        publisher,
        pageCount,
        readPage,
        reading 
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished =  pageCount === readPage;
    const newBook = {
        id,
        name, 
        year, 
        author, 
        summary, 
        publisher,
        reading,
        pageCount,
        readPage,
        finished,
        insertedAt,
        updatedAt
    };

    if (!request.payload.hasOwnProperty('name')) {  // name
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku", 
        }); 
        response.code(400);
        return response;
    }else if (readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",        
        });
        response.code(400);
        return response;
    }


    books.push(newBook);
    const isSuccess = books.filter((data) => data.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: "error",
        message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return response;
};

const showBooks = (request, h) => {
    const { name, reading, finished } = request.query;
    let data = books;
    
    if (name) {
        data = books.filter((data) => data.name.toLowerCase().includes(name.toLowerCase()));
    } else if (reading) {
        data = books.filter((data) => data.reading === (reading == 1));
    } else if (finished) {
        data = books.filter((data) => data.finished === (finished == 1));
    }

    const response = h.response ({
        status: 'success',
        data: {
            books: data.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
    response.code(200);
    return response;
};

const showBookById = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((data) => data.id === bookId)[0];
    if (book !== undefined) {
        const response = h.response ({
            status: "success",
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
};

const updateBook = (request, h) => {
    const { bookId } = request.params;

    const {
        name, 
        year, 
        author, 
        summary, 
        publisher,
        pageCount,
        readPage,
        reading 
    } = request.payload;
    const updatedAt = new Date().toISOString();

    if (!request.payload.hasOwnProperty('name')) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku", 
        }); 
        response.code(400);
        return response;
    }else if (readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",        
        });
        response.code(400);
        return response;
    }
    const index = books.findIndex((data) => data.id === bookId);

    if (index !== -1) {
        books[index] = {
        ...books[index],
        name, 
        year, 
        author, 
        summary, 
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
        };
        const response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui",
        });
        response.code(200);
        return response;
    };
    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

const deleteBook = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((data) => data.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus",
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

module.exports = { addBook, showBooks, showBookById, updateBook, deleteBook };