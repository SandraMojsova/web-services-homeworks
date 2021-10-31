const { Validator } = require('node-input-validator');

const UserSchemaCreate = {
    first_name: 'required|minLength:3',
    last_name: 'required|maxLength:35',
    email: 'required|email',
    password: 'required|minLength:8'
};

const UserSchemaLogin = {
    email: 'required|email',
    password: 'required'
};

const validate = async (data, schema) => {
    let sch;
    switch (schema) {
        case 'CREATE':
            sch = UserSchemaCreate;
            break;
        case 'LOGIN':
            sch = UserSchemaLogin;
            break;
    }
    let v = new Validator(data, sch);
    let e = await v.check();
    if (!e) {
        throw v.errors;
    }
};

module.exports = validate;