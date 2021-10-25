const express = require('express');

const api = express();

api.use(express.json());

let students = [];

api.get('/students', (req, res) => {
    res.status(200).send(students);
})

api.get('/students/:id', (req, res) => {
    let output = students.filter(student => student.id === Number(req.params.id));
    if (!output[0]) {
        return res.status(404).send('Not found');
    }
    return res.status(200).send(output[0]);
})

api.post('/students', (req, res) => {
    let id = 1;
    if (students.length !== 0) {
        id = students[students.length - 1].id + 1;
    }
    let student = {
        id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gpa: req.body.gpa
    };
    students = [...students, student];
    res.status(200).send(student);
})

api.delete('/students/:id', (req, res) => {
    let prevLength = students.length;
    students = students.filter(student => student.id !== Number(req.params.id));
    if (students.length === prevLength) {
        return res.status(404).send('Not Found');
    }
    res.status(204).send();
});

api.put("/students/:id", (req, res) => {
    students = students.map(s => {
        if (s.id === Number(req.params.id)) {
            s.first_name = req.body.first_name;
            s.last_name = req.body.last_name;
            s.gpa = req.body.gpa;
        }
        return s;
    })
    res.status(204).send();
});

api.patch('/students/:id', (req, res) => {
    students = students.map(s => {
        if (s.id === Number(req.params.id)) {
            s.first_name = req.body.first_name ? req.body.first_name : s.first_name;
            s.last_name = req.body.last_name ? req.body.last_name : s.last_name;
            s.gpa = req.body.gpa ? req.body.gpa : s.gpa;
        }
        return s;
    });
    res.status(204).send();
})

api.listen(10000, (err) => {
    if (err) {
        console.log(err);
    }
    return console.log(`Server is listening on port 10000`);
})