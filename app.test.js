
const supertest = require('supertest');
const assert = require('assert');
const app = require('./app');
const pool = require('./db');
const {faker} = require('@faker-js/faker')

// describe('GET /status', () => {
//     it('should return OK', async () => {
//         const response = await supertest(app).get('/status');
//         assert.equal(response.status, 200);
//         assert.equal(response.text, 'OK');
//     });
// });

// describe('GET /student', () => {
//     it('should return all students', async () => {
//         const response = await supertest(app).get('/student');
//         const db = await pool.query("SELECT * FROM student;");
//         assert.equal(response.status, 200);
//         assert.equal(response.body.length, db.rows.length);
//         for (let i = 0; i < response.body.length; i++) {
//             assert.equal(response.body[i].id, db.rows[i].id);
//             assert.equal(response.body[i].name, db.rows[i].name);
//             assert.equal(response.body[i].email, db.rows[i].email);
//             assert.equal(response.body[i].city, db.rows[i].city);
//             assert.equal(response.body[i].phone_number, db.rows[i].phone_number);
//             assert.equal(response.body[i].text, db.rows[i].text);
//         }
//     })
// });

describe('GET /student/:id', () => {
    it('should return a student', async () => {
        const id = '8ebd84b8-90b2-4aa2-94ba-5645938e61b8'
        const db = await pool.query(`SELECT * FROM student WHERE id = '${id}';`);
        const response = await supertest(app).get(`/student/${id}`);
        assert.equal(response.status, 200);
        assert.equal(response.body.id, db.rows[0].id);
        assert.equal(response.body.name, db.rows[0].name);
        assert.equal(response.body.email, db.rows[0].email);
        assert.equal(response.body.city, db.rows[0].city);
        assert.equal(response.body.phone_number, db.rows[0].phone_number);
        assert.equal(response.body.text, db.rows[0].text);
    });
});


