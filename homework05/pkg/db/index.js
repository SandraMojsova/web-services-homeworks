const mongoose = require('mongoose');

let username = 'dev';
let password = 'E0Gw7E1hFGT2vds8';
let db = 'usersdb';
let host = 'nodetuts.5luc2.mongodb.net';


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