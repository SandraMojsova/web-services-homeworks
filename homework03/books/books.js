const fs = require('../fs');
const db = './books/books.json';

const create = async (bookData) => {
    let data = await fs.read(db);
    let id = 1;
    if (data.length !== 0) {
        id = data[data.length - 1].id + 1;
    }
    let book = {
        id,
        title: bookData.title,
        pages: bookData.pages,
        author: bookData.author,
        genre: bookData.genre,
        publisher: bookData.publisher,
        publication_date: bookData.publication_date
    }
    data = [...data, book];
    await fs.write(db, data);
    return book;
};

const getAll = async () => {
    let data = await fs.read(db);
    return data;
};

const getOne = async (id) => {
    let data = await fs.read(db);
    let book = data.filter(b => b.id === Number(id));
    if (book.length === 0) return null;
    return book[0];
};

const update = async (id, bookData) => {
    let data = await fs.read(db);
    data = data.map(book => {
        if (book.id === Number(id)) {
            book.title = bookData.title;
            book.pages = bookData.pages;
            book.author = bookData.author;
            book.genre = bookData.genre;
            book.publisher = bookData.publisher;
            book.publication_date = bookData.publication_date;
        }
        return book;
    });
    await fs.write(db, data);
};

const partialUpdate = async (id, bookData) => {
    let data = await fs.read(db);
    data = data.map(book => {
        if (book.id === Number(id)) {
            book.title = bookData.title ? bookData.title : book.title;
            book.pages = bookData.pages ? bookData.pages : book.pages;
            book.author = bookData.author ? bookData.author : book.author;
            book.genre = bookData.genre ? bookData.genre : book.genre;
            book.publisher = bookData.publisher ? bookData.publisher : book.publisher;
            book.publication_date = bookData.publication_date ? bookData.publication_date : book.publication_date;
        }
        return book;
    });
    await fs.write(db, data);
};

const remove = async (id) => {
    let data = await fs.read(db);
    let prevLength = data.length;
    data = data.filter(book => book.id !== Number(id));
    if (data.length === prevLength) {
        return false;
    }
    await fs.write(db, data);
    return true;
};

module.exports = {
    getAll,
    create,
    getOne,
    update,
    partialUpdate,
    remove
};