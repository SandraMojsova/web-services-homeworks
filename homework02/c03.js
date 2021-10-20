const express = require('express');

const api = express();

api.use(express.json());

let students = [
    { id: 0, first_name: "Sandra", gpa: 10 }
];

api.get('/students', (req, res) => {
    res.status(200).send(students);
})

api.get('/students/:id', (req, res) => {
    if (!students[req.params.id]) {
        return res.status(404).send(students)
    }
    return res.status(200).send([students[req.params.id]])
})

api.post('/students', (req, res) => {
    students = [...students, {
        ...req.body, id: students.length,
    }]
    res.status(200).send({ ...req.body, id: students.length });
})

api.delete('/students/:id', (req, res) => {
    if (!students[req.params.id]) {
        return res.status(404).send('Not Found');
    }
    students = students.filter((student, index) => index != req.params.id);
    res.status(204).send();
});

api.put("/students/:id", (req, res) => {
    let index = students.findIndex((student, id) => id == req.params.id);
    let updatedStudent = { ...req.body, id: req.params.id }
    //console.log(updatedStudent);
    students[index] = updatedStudent;
    res.status(200).send(updatedStudent);
});

api.patch('/students/:id', (req, res) => {
    let index = students.findIndex((student, id) => id == req.params.id);
    let updatedStudent = { ...students[index], gpa: req.body.gpa };
    students[index] = updatedStudent;
    res.status(200).send(updatedStudent)
})

api.listen(10000, (err) => {
    if (err) {
        console.log(err);
    }
    return console.log(`Server is listening on port 10000`);
})