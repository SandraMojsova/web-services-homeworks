require('./pkg/db');
const config = require('./pkg/config');
const express = require('express');
const handlers = require('./handlers/auth');

let serverCfg = config.get('server');

const api = express();
api.use(express.json());

api.post('/auth/create-account', handlers.createAccount);

api.listen(serverCfg.port, err => {
    if (err) {
        return console.log('Could not start server', err);
    }
    console.log(`Server successfully started on ${serverCfg.host}:${serverCfg.port}`);
});


