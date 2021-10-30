const { Validator } = require('node-input-validator');

const BookSchemaInsert = {
    title: "required|maxLength:60",
    pages: "required|between:100,1000",
    author: "required|minLength:8",
    genre: "required|minLength:5",
    publisher: "required|minLength:5",
    publication_date: 'required|dateFormat:YYYY-MM-DD'
};

const BookSchemaUpdate = {
    title: "maxLength:60",
    pages: "between:100,1000",
    author: "minLength:8",
    genre: "minLength:5",
    publisher: "minLength:5",
    publication_date: 'dateFormat:YYYY-MM-DD'
};

const validate = async (data, schema = 'INSERT') => {
    let sch;
    switch (schema) {
        case 'INSERT':
            sch = BookSchemaInsert;
            break;
        case 'UPDATE':
            sch = BookSchemaUpdate;
            break;
    }
    let v = new Validator(data, sch)
    let e = await v.check();
    if (!e) {
        throw v.errors;
    }
};

module.exports = validate;