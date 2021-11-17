const coctails = require('../pkg/coctails');

const getCoctail = async (req, res) => {
    console.time('fetch');
    let data = await coctails.coctail(req.params.coctail);
    console.timeEnd('fetch');
    res.status(200).send(data);
};

module.exports = {
    getCoctail
};