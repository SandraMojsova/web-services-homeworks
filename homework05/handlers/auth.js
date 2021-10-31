const users = require('../pkg/users/index');
const validate = require('../pkg/users/validate');

const createAccount = async (req, res) => {
    try {
        await validate(req.body, "CREATE");
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
    try {
        let data = await users.createAccount(req.body);
        if (!data) {
            return res.status(403).send('User already exist');
        }
        res.status(201).send('Account created');
    }
    catch (err) {
        res.status(500).send(err);
    }
};

const login = async (req, res) => {
    try {
        await validate(req.body, "LOGIN");
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
    try {
        let data = await users.login(req.body);
        if (!data) {
            return res.status(400).send('Invalid email or password');
        }
        res.status(200).send("Successfully logged");
    }
    catch (err) {
        res.status(500).send(err);
    }
}
module.exports = {
    createAccount,
    login
}