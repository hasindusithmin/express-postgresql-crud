
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

studentRoute.put('/', async(req, res) => {
    try {
        if (req.body.id === undefined) throw new Error('No id provided');
        const genSQL = (obj) => {
            let sql = 'UPDATE student SET ';
            for (let[key,value] of Object.entries(obj)){
                if (value !== undefined && key !== 'id') sql += `${key} = '${value}',`;
            }
            sql += `WHERE id = '${obj.id}';`;
            return sql.replace(',WHERE', ' WHERE');
        }
        const SQL = genSQL(req.body);
        const result = await pool.query(SQL);
        if (result.rowCount !== 1) throw new Error('Could not update student');
        res.status(202).json({message:'Student updated'});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});


module.exports = studentRoute;