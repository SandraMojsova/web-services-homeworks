const mongoose = require('mongoose');

let username = 'dev';
let password = '';
let dbname = 'db';
let host = '';


let dsn = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(
    dsn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (err) {
            return console.log('could not connect to db', err);
        }
        console.log('Successfully connected to db');
    }
)