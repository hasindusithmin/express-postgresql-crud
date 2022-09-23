
const supertest = require('supertest');
const assert = require('assert');
const app = require('./app');
const pool = require('./db');


// describe('GET /status', () => {
//     it('should return OK', async () => {
//         const response = await supertest(app).get('/status');
//         assert.equal(response.status, 200);
//         assert.equal(response.text, 'OK');
//     });
// });

describe('GET /student', () => {
    it('should return all students', async () => {
        const response = await supertest(app).get('/student');
        const db = await pool.query("SELECT * FROM student;");
        assert.equal(response.status, 200);
        assert.equal(response.body.length, db.rows.length);
        for (let i = 0; i < response.body.length; i++) {
            assert.equal(response.body[i].id, db.rows[i].id);
            assert.equal(response.body[i].name, db.rows[i].name);
            assert.equal(response.body[i].email, db.rows[i].email);
            assert.equal(response.body[i].phone_number, db.rows[i].phone_number);
            assert.equal(response.body[i].text, db.rows[i].text);
        }
    })
});

