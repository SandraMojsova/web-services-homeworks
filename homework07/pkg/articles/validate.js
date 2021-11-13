const { Validator } = require('node-input-validator');

const ArticleCreate = {
    title: 'required|minLength:4',
    content: 'required|maxLength:1000',
    publish_date: 'required|dateFormat:YYYY-MM-DD'
};

const ArticleUpdate = {
    title: 'minLength:4',
    content: 'maxLength:1000',
    publish_date: 'dateFormat:YYYY-MM-DD'
};

const validate = async (data, schema = "CREATE") => {
    let sch;
    switch (schema) {
        case 'CREATE':
            sch = ArticleCreate;
            break;
        case 'UPDATE':
            sch = ArticleUpdate;
            break;
    }
    let v = new Validator(data, sch);
    let e = await v.check();
    if (!e) {
        throw v.errors
    }
};

module.exports = validate;