const mongoose = require('mongoose');

const User = mongoose.model(
    'users',
    {
        first_name: String,
        last_name: String,
        email: {
            type: String,
            unique: true
        },
        password: String
    },
    'users'
);

const create = async (data) => {
    let user = new User(data);
    return await user.save();
};

module.exports = {
    create
}