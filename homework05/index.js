require('./pkg/db/index');
const express = require('express');
const api = express();
const handlers = require('./handlers/auth');

api.use(express.json());

api.post('/auth/create-account', handlers.createAccount);
api.post('/auth/login', handlers.login);

api.listen(4000, err => {
    if (err) {
        return console.log('Could not start server', err);
    }
    console.log('Server successfully started on port 4000');
})