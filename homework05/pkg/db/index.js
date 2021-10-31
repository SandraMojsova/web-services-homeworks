const mongoose = require('mongoose');

let username = 'dev';
let password = '';
let db = 'usersdb';
let host = '';


let dsn = `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`;

mongoose.connect(
    dsn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (err) {
            return console.log('Could not connect to database');
        }
        console.log('Successfully connected to database');
    }
);