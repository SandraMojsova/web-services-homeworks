const fs = require('fs');

let configFile = `${__dirname}/../../config.json`;

let config = null;
if (!config) {
    let cfg = fs.readFileSync(configFile, 'utf-8');
    config = JSON.parse(cfg);
}

const getCfg = (section) => {
    if (config[section]) {
        return config[section];
    }
    return null;
};

module.exports = {
    getCfg
};