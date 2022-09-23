
const supertest = require('supertest');
const assert = require('assert');
const app = require('./app');


describe('GET /status', () => {
    it('should return OK', async () => {
        const response = await supertest(app).get('/status');
        assert.equal(response.status, 200);
        assert.equal(response.text, 'OK');
    });
});