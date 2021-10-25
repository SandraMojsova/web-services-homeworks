const express = require('express');
const fs = require('fs');

const api = express();
api.use(express.json());

const read = (fileName) => {
    return new Promise((success, fail) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);

        });

    })
};

const write = (fileName, writing) => {
    return new Promise((success, fail) => {
        fs.writeFile(fileName, writing, 'utf-8', (err) => {
            if (err) {
                return fail(err);
            }
            return success();

        });

    })
};


api.get('/students', async (req, res) => {
    try {
        let data = await read('students.json');
        let parsedData = JSON.parse(data);
        res.status(200).send(parsedData);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

api.post('/students', async (req, res) => {
    try {
        let data = await read('students.json');
        let parsedData = JSON.parse(data);
        let id = 1;
        if (parsedData.length !== 0) {
            id = parsedData[parsedData.length - 1].id + 1;
        }
        let student = {
            id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gpa: req.body.gpa
        };
        parsedData = [...parsedData, student];
        let outputString = JSON.stringify(parsedData);
        await write('students.json', outputString);
        res.status(201).send(student);
    } catch (err) {
        res.status(500).send(err);
    }
});

api.get('/students/:id', async (req, res) => {
    try {
        let data = await read('students.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.filter(student => student.id === Number(req.params.id));
        if (!output[0]) {
            return res.status(404).send('Not Found');
        }
        let outputString = JSON.stringify(output[0]);
        res.status(200).send(outputString);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

api.delete('/students/:id', async (req, res) => {
    try {
        let data = await read('students.json');
        let parsedData = JSON.parse(data);
        let prevLength = parsedData.length;
        parsedData = parsedData.filter(student => student.id !== Number(req.params.id));
        if (parsedData.length === prevLength) {
            return res.status(404).send('not found');
        }
        let outputString = JSON.stringify(parsedData);
        await write('students.json', outputString);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).send(err);
    }
});

api.put('/students/:id', async (req, res) => {
    try {
        let data = await read('students.json');
        let parsedData = JSON.parse(data);
        parsedData = parsedData.map(student => {
            if (student.id === Number(req.params.id)) {
                student.first_name = req.body.first_name;
                student.last_name = req.body.last_name;
                student.gpa = req.body.gpa;
            }
            return student;
        });
        let outputString = JSON.stringify(parsedData);
        await write('students.json', outputString);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).send(err);
    }
});

api.patch('/students/:id', async (req, res) => {
    try {
        let data = await read('students.json');
        let parsedData = JSON.parse(data);
        parsedData = parsedData.map(student => {
            if (student.id === Number(req.params.id)) {
                student.first_name = req.body.first_name ? req.body.first_name : student.first_name;
                student.last_name = req.body.last_name ? req.body.last_name : student.last_name;
                student.gpa = req.body.gpa ? req.body.gpa : student.gpa;
            }
            return student;
        });
        let outputString = JSON.stringify(parsedData);
        await write('students.json', outputString);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).send(err);
    }
});

api.listen(8000, err => {
    if (err) {
        console.log(err);
    }
    return console.log('server successfully started on port 8000');
});
