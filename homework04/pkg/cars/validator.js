const { Validator } = require('node-input-validator');

const CarSchemaInsert = {
    brand: 'required|minLength:4',
    model: 'required|minLength:2',
    year: 'required|between:1990,2020',
    price: 'required',
    color: 'required'
};

const CarSchemaUpdate = {
    brand: 'minLength:4',
    model: 'minLength:2',
    year: 'between:1990,2020'
};

const validate = async (data, schema = "INSERT") => {
    let sch;
    switch (schema) {
        case 'INSERT':
            sch = CarSchemaInsert;
            break;
        case 'UPDATE':
            sch = CarSchemaUpdate;
            break;
    }
    let v = new Validator(data, sch);
    let e = await v.check();
    if (!e) {
        throw v.errors
    }
}

module.exports = validate;


