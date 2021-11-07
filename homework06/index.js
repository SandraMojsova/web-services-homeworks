require('./pkg/db/index');
const express = require('express');
const jwt = require('express-jwt');
const handlers = require('./handlers/articles');

const api = express();
api.use(express.json());

api.use(jwt({
    secret: 'secretpassword',
    algorithms: ['HS256']
}));


api.post('/articles', handlers.create);
api.get('/articles', handlers.getAll);
api.get('/articles/me', handlers.getMine);
api.get('/articles/:id', handlers.getOne);
api.put('/articles/:id', handlers.update);
api.patch('/articles/:id', handlers.partialUpdate);
api.delete('/articles/:id', handlers.remove);

api.listen(9000, err => {
    if (err) {
        return console.log('Could not start server', err);
    }
    console.log('Server successfully started on port 9000');
});