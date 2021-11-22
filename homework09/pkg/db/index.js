const config = require('../config');
const mongoose = require('mongoose');

const cfgDatabase = config.get('database');

let dsn = `mongodb+srv://${cfgDatabase.username}:${cfgDatabase.password}@${cfgDatabase.hostname}/${cfgDatabase.dbname}?retryWrites=true&w=majority`;

mongoose.connect(
    dsn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (err) {
            return console.log('Could not connect to db', err);
        }
        console.log('Succesfully connect to database');
    }
);