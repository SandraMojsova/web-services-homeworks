const validator = require('../pkg/articles/validate');
const articles = require('../pkg/articles/index');

const create = async (req, res) => {
    try {
        await validator(req.body);
    } catch (err) {
        return res.status(400).send('Bad request');
    }
    try {
        let data = {
            ...req.body,
            author_id: req.user.uid
        };
        let article = await articles.create(data);
        res.status(201).send(article);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const getAll = async (req, res) => {
    try {
        let data = await articles.getAll();
        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const getMine = async (req, res) => {
    try {
        let data = await articles.getAllByUser(req.user.uid);
        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const getOne = async (req, res) => {
    try {
        let data = await articles.getOne(req.params.id);
        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const update = async (req, res) => {
    try {
        await validator(req.body);
    } catch (err) {
        return res.status(400).send('Bad request');
    }
    try {
        await articles.update(req.params.id, req.user.uid, req.body);
        res.status(204).send();
    } catch (err) {
        return res.status(500).send(err);
    }
};

const partialUpdate = async (req, res) => {
    try {
        await validator(req.body, 'UPDATE');
    } catch (err) {
        return res.status(400).send('Bad request');
    }
    try {
        await articles.partialUpdate(req.params.id, req.user.uid, req.body);
        res.status(204).send();
    } catch (err) {
        return res.status(500).send(err);
    }
};

const remove = async (req, res) => {
    try {
        if (await articles.remove(req.params.id, req.user.uid)) {
            return res.status(204).send();
        }
        return res.status(404).send('Not found');
    } catch (err) {
        return res.status(500).send(err);
    }
};

module.exports = {
    create,
    getAll,
    getMine,
    getOne,
    update,
    partialUpdate,
    remove
}