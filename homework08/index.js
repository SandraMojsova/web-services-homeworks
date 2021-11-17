const express = require('express');
const handlers = require('./handlers/coctails');

const api = express();

api.get('/coctails/:coctail', handlers.getCoctail);

api.listen(10000, err => {
    if (err) {
        return console.log(err);
    }
    console.log('Server started on port 10000');
})