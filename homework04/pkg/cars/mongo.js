const mongoose = require('mongoose');

const Car = mongoose.model(
    'cars',
    {
        brand: String,
        model: String,
        year: Number,
        price: Number,
        color: String
    },
    'cars'
);

const create = async (carData) => {
    let car = new Car(carData);
    return await car.save();
};

const getAll = async () => {
    return await Car.find({});
};

const getOne = async (id) => {
    return await Car.findById(id);
};

const update = async (id, carData) => {
    return await Car.updateOne({ _id: id }, carData);
}

const partialUpdate = async (id, carData) => {
    return await Car.updateOne({ _id: id }, carData);
}

const remove = async (id) => {
    return await Car.deleteOne({ _id: id });
}

module.exports = {
    create,
    getAll,
    getOne,
    update,
    partialUpdate,
    remove
};