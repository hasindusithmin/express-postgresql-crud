
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


module.exports = studentRoute;