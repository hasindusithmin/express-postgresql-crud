
const express = require('express');
const pool = require('./db');


const app = express();

app.get('/status', (req, res) => {
    res.sendStatus(200);
})

app.listen(3000, async() => {
    console.log('Server started on port 3000');
    await pool.connect();
    console.log('Database connected');
});

module.exports = app;