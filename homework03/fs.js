const fs = require('fs');

const read = (fileName) => {
    return new Promise((success, fail) => {
        fs.readFile(fileName, (err, data) => {
            if (err) return fail(err);
            data = JSON.parse(data);
            return success(data);
        });
    });
};

const write = (fileName, content) => {
    return new Promise((success, fail) => {
        content = JSON.stringify(content);
        fs.writeFile(fileName, content, err => {
            if (err) return fail(err);
            return success();
        });
    });
};

module.exports = {
    read,
    write
}