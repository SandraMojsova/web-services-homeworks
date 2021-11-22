const { Validator } = require('node-input-validator');

const AccountCreate = {
    first_name: 'required|minLength:3',
    last_name: 'required|minLength:4',
    email: 'required|email',
    password: 'required'
};

const validate = async (data) => {
    let v = new Validator(data, AccountCreate);
    let e = await v.check();
    if (!e) {
        throw v.errors;
    }
};

module.exports = validate;