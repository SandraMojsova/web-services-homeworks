const fs = require('../fs');
const db = './cars/cars.json';

const getAll = async () => {
    let data = fs.read(db);
    return data;
}

const create = async (carData) => {
    let data = await fs.read(db);
    let id = 1;
    if (data.length !== 0) {
        id = data[data.length - 1].id + 1;
    }
    let car = {
        id,
        brand: carData.brand,
        model: carData.model,
        year: carData.year,
        price: carData.price,
        color: carData.color
    };
    data = [...data, car];
    await fs.write(db, data);
    return car;
};

const getOne = async (id) => {
    let data = await fs.read(db);
    car = data.filter(c => c.id === Number(id));
    if (car.length === 0) {
        return null;
    }
    return car[0];
};

const update = async (id, carData) => {
    let data = await fs.read(db);
    data = data.map(car => {
        if (car.id === Number(id)) {
            car.brand = carData.brand;
            car.model = carData.model;
            car.year = carData.year;
            car.price = carData.price;
            car.color = carData.color;
        }
        return car;
    })
    await fs.write(db, data);
};

const partialUpdate = async (id, carData) => {
    let data = await fs.read(db);
    data = data.map(car => {
        if (car.id === Number(id)) {
            car.brand = carData.brand ? carData.brand : car.brand;
            car.model = carData.model ? carData.model : car.model;
            car.year = carData.year ? carData.year : car.year;
            car.price = carData.price ? carData.price : car.price;
            car.color = carData.color ? carData.color : car.color;
        }
        return car;
    });
    await fs.write(db, data);
};

const remove = async (id) => {
    let data = await fs.read(db);
    let prevLength = data.length;
    data = data.filter(car => car.id !== Number(id));
    if (data === prevLength) {
        return false;
    }
    await fs.write(db, data);
    return true;
};

module.exports = {
    getAll,
    create,
    getOne,
    update,
    partialUpdate,
    remove
};