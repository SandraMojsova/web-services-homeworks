const express = require('express');
const api = express();

api.use(express.json());

const bookHandler = require('./books/book_handlers');
const carsHandler = require('./cars/cars_handlers');

api.get('/books', bookHandler.getAll);
api.post('/books', bookHandler.create);
api.get('/books/:id', bookHandler.getOne);
api.put('/books/:id', bookHandler.update);
api.patch('/books/:id', bookHandler.partialUpdate);
api.delete('/books/:id', bookHandler.remove);

api.get('/cars', carsHandler.getAll);
api.post('/cars', carsHandler.create);
api.get('/cars/:id', carsHandler.getOne);
api.put('/cars/:id', carsHandler.update);
api.patch('/cars/:id', carsHandler.partialUpdate);
api.delete('/cars/:id', carsHandler.remove);


api.listen(12000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Services starter on port 12000`);
});