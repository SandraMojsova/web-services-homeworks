const fetch = require('node-fetch');
const API_KEY = '1';
const cache = {};

const coctail = async (coctailName) => {
    let url = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/search.php?s=${coctailName}`;

    if (cache[coctailName] && (cache[coctailName].ts + 10000) > new Date().getTime()) {
        return cache[coctailName].data;
    }

    try {
        let res = await fetch(url);
        let data = await res.json();
        cache[coctailName] = {
            ts: new Date().getTime(),
            data
        };
        return data;
    } catch (err) {
        throw new Error(err + 'could not fetch coctails data');
    }
};

module.exports = {
    coctail
};