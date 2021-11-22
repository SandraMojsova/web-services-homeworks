const bcrypt = require('bcryptjs');
const validator = require('../pkg/users/validate');
const user = require('../pkg/users');
const mailer = require('../pkg/mailer');

const createAccount = async (req, res) => {
    try {
        await validator(req.body);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad request');
    }
    try {
        let data = req.body;
        data.password = bcrypt.hashSync(data.password);
        let u = await user.create(data);
        await mailer.sendMail(data.email, 'WELCOME', { first_name: data.first_name, last_name: data.last_name });
        return res.status(201).send(u);
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).send('Bad request. Email already in use');
        }
        return res.status(500).send('Internal server error');
    }
};

module.exports = {
    createAccount
}

