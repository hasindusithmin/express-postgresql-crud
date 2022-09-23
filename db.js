const {Pool}  = require('pg');

const pool = new Pool({connectionString:process.env.NODE_PG_GE, ssl: {rejectUnauthorized: false}});

module.exports = pool;










