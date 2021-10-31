const mongoose = require('mongoose');

const User = mongoose.model(
    'users',
    {
        first_name: String,
        last_name: String,
        email: String,
        password: String
    },
    'users'
);

const createAccount = async (data) => {
    let user = await User.findOne({ email: data.email });
    if (user) {
        return false;
    }
    let newUser = new User(data);
    return await newUser.save();
}

const login = async (data) => {
    let user = await User.findOne({ email: data.email });
    if (user && user.password === data.password) {
        return user;
    }
    return false;
}
module.exports = {
    createAccount,
    login
}