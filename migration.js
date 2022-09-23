
const fs = require('fs');
const pool = require('./db');

const sql = fs.readFileSync(`${__dirname}/db/init.sql`).toString();

const runSQL = async () => {
    await pool.query(sql);
    console.log('Database migrated');
    pool.end();
};

runSQL();