const express = require('express');
const fs = require('fs');

const api = express();
api.use(express.json());

const Read = (fileName) => {
    return new Promise((success, fail) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);

        });

    })
}

const Write = (fileName, writing) => {
    return new Promise((success, fail) => {
        fs.writeFile(fileName, writing, 'utf-8', (err) => {
            if (err) {
                return fail(err);
            }
            return success();

        });

    })
}


api.get('/students', async (req, res) => {
    try {
        let data = await Read('students.json')
        let parsedData = JSON.parse(data);
        res.status(200).send(parsedData);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

api.post('/students', async (req, res) => {
    try {
        let data = await Read('students.json')
        let parsedData = JSON.parse(data);
        let output = [...parsedData, {
            ...req.body, id: parsedData.length,
        }];
        let outputString = JSON.stringify(output);
        await Write('students.json', outputString);
        res.status(201).send(req.body)
    }
    catch (err) {
        res.send(err);
    }
})

api.get('/students/:id', async (req, res) => {
    try {
        let data = await Read('students.json')
        let parsedData = JSON.parse(data);
        if (!parsedData[req.params.id]) {
            return res.status(404).send('Not Found');
        }
        res.status(200).send(parsedData[req.params.id])
    }
    catch (err) {
        res.send(err);
    }
})

api.delete('/students/:id', async (req, res) => {
    try {
        let data = await Read('students.json');
        let parsedData = JSON.parse(data);
        if (!parsedData[req.params.id]) {
            return res.status(404).send('Not Found');
        }
        let output = parsedData.filter((s, id) => id != req.params.id);
        let outputString = JSON.stringify(output);
        await Write('students.json', outputString);
        res.status(204).send();
    }
    catch (err) {
        res.send(err);
    }
})

api.put('/students/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let data = await Read('students.json');
        let parsedData = JSON.parse(data);
        let index = parsedData.findIndex((student, index) => index == id);
        //console.log(index);
        let updatedStudent = { ...req.body, id: Number(id) };
        // console.log(updatedStudent);
        parsedData[index] = updatedStudent;
        let outputString = JSON.stringify(parsedData);
        await Write('students.json', outputString);
        res.status(200).send(updatedStudent);
    }
    catch (err) {
        res.send(err);
    }
})

api.patch('/students/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let data = await Read('students.json');
        let parsedData = JSON.parse(data);
        let index = parsedData.findIndex((student, index) => index == id);
        //console.log(index);
        let updatedStudent = { ...parsedData[index], gpa: req.body.gpa };
        // console.log(updatedStudent);
        res.send(updatedStudent);
        parsedData[index] = updatedStudent;
        let outputString = JSON.stringify(parsedData);
        await Write('students.json', outputString);
    }
    catch (err) {
        res.send(err);
    }
})

api.listen(8000, err => {
    if (err) {
        console.log(err);
    }
    return console.log('server successfully started on port 8000');
})
