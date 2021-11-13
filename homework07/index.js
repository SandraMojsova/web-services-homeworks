require('./pkg/db/index');
const config = require('./pkg/config');
const express = require('express');
const jwt = require('express-jwt');
const handlers = require('./handlers/articles');

const cfgSecurity = config.getCfg('security');
const cfgApp = config.getCfg('server');

const api = express();
api.use(express.json());

api.use(jwt({
    secret: cfgSecurity.secret,
    algorithms: cfgSecurity.algorithms
}));

api.post('/articles', handlers.create);
api.get('/articles', handlers.getAll);
api.get('/articles/me', handlers.getMine);
api.get('/articles/:id', handlers.getOne);
api.put('/articles/:id', handlers.update);
api.patch('/articles/:id', handlers.partialUpdate);
api.delete('/articles/:id', handlers.remove);

api.listen(cfgApp.port, err => {
    if (err) {
        return console.log('Could not start server', err);
    }
    console.log(`Server successfully started on ${cfgApp.host}:${cfgApp.port}`);
});