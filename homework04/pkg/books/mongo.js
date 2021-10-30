const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    pages: Number,
    author: String,
    genre: String,
    publisher: String,
    publication_date: Date
})

const Book = mongoose.model('books', bookSchema);

const create = async (bookData) => {
    let book = new Book(bookData);
    return await book.save();
};

const getAll = async () => {
    return await Book.find({});
};

const getOne = async (id) => {
    return await Book.findById(id);
};

const update = async (id, bookData) => {
    return await Book.updateOne({ _id: id }, bookData);
};

const partialUpdate = async (id, bookData) => {
    return await Book.updateOne({ _id: id }, bookData);
};

const remove = async (id) => {
    return await Book.deleteOne({ _id: id });
}
module.exports = {
    create,
    getAll,
    getOne,
    update,
    partialUpdate,
    remove
};