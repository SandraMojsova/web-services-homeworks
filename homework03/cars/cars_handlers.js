const cars = require('./cars');

const getAll = async (req, res) => {
    try {
        let data = await cars.getAll();
        res.status(200).send(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

const create = async (req, res) => {
    try {
        let condition = !req.body.brand || !req.body.model ||
            !req.body.year || !req.body.price || !req.body.color;
        if (condition) {
            return res.status(400).send('Bad request');
        }
        let car = await cars.create(req.body);
        res.status(201).send(car);
    }
    catch (err) {
        res.status(500).send(err)
    }
};

const getOne = async (req, res) => {
    try {
        let car = await cars.getOne(req.params.id);
        if (!car) {
            return res.status(404).send('Not found');
        }
        res.status(200).send(car);
    }
    catch (err) {
        res.status(500).send(err);
    }
};

const update = async (req, res) => {
    try {
        let condition = !req.body.brand || !req.body.model ||
            !req.body.year || !req.body.price || !req.body.color;
        if (condition) {
            return res.status(400).send('Bad request');
        }
        await cars.update(req.params.id, req.body);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).send(err);
    }
};

const partialUpdate = async (req, res) => {
    try {
        let condition = req.body.brand || req.body.model ||
            req.body.year || req.body.price || req.body.color;
        if (!condition) {
            return res.status(400).send('Bad request');
        }
        await cars.partialUpdate(req.params.id, req.body);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
};

const remove = async (req, res) => {
    try {
        if (await cars.remove(req.params.id)) {
            return res.status(204).send();
        }
        return res.status(404).send('Not found');
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    getAll,
    create,
    getOne,
    update,
    partialUpdate,
    remove
};