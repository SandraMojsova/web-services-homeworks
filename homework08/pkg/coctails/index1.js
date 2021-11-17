const fetch = require('node-fetch');
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 10 });
const API_KEY = '1';

const coctail = async (coctailName) => {
    let url = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/search.php?s=${coctailName}`;

    if (myCache.has(coctailName)) {
        return myCache.get(coctailName);
    }

    try {
        let res = await fetch(url);
        let data = await res.json();
        myCache.set(coctailName, data);
        return data;
    } catch (err) {
        throw new Error(err + 'could not fetch coctails data');
    }
};

module.exports = {
    coctail
};