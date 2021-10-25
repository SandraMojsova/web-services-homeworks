const books = require('./books');

const create = async (req, res) => {
    try {
        let condition = !req.body.title || !req.body.pages || !req.body.author
            || !req.body.genre || !req.body.publisher || !req.body.publication_date;
        if (condition) {
            return res.status(400).send('Bad request');
        }
        let book = await books.create(req.body);
        res.status(201).send(book);
    } catch (err) {
        res.status(500).send(err);
    }
};

const getAll = async (req, res) => {
    try {
        let data = await books.getAll();
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

const getOne = async (req, res) => {
    try {
        let book = await books.getOne(req.params.id);
        if (!book) {
            return res.status(404).send('Not found');
        }
        res.status(200).send(book);
    } catch (err) {
        res.status(500).send(err)
    }
};

const update = async (req, res) => {
    try {
        let condition = !req.body.title || !req.body.pages || !req.body.author
            || !req.body.genre || !req.body.publisher || !req.body.publication_date;
        if (condition) {
            return res.status(400).send('Bad request');
        }
        await books.update(req.params.id, req.body);
        res.status(204).send();

    } catch (err) {
        res.status(500).send(err);
    }
};

const partialUpdate = async (req, res) => {
    try {
        let condition = req.body.title
            || req.body.pages
            || req.body.author
            || req.body.genre
            || req.body.publisher
            || req.body.publication_date;
        if (!condition) {
            return res.status(400).send('Bad request');
        }
        await books.partialUpdate(req.params.id, req.body);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
};

const remove = async (req, res) => {
    try {
        if (await books.remove(req.params.id)) {
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