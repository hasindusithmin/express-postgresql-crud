
const {Router} = require('express');
const pool = require('../db');

const studentRoute = Router()

studentRoute.get('/', async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM student;");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

studentRoute.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query("SELECT * FROM student WHERE id = $1;", [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

studentRoute.post('/', async(req, res) => {
    try {
        const {name,email,city,phone_number,text} = req.body;
        const result = await pool.query("INSERT INTO student (name,email,city,phone_number,text) VALUES ($1,$2,$3,$4,$5);", [name,email,city,phone_number,text]);
        if (result.rowCount !== 1) throw new Error('Could not create student');
        res.status(201).json({message:'Student created'});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

module.exports = studentRoute;