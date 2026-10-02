const request = require('supertest');
const app = require('./server.js');

describe('Canteen Inventory API Tests', () => {
    it('GET /health should return 200 OK', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('OK');
    });
    it('GET /api/inventory should return inventory list', async () => {
        const res = await request(app).get('/api/inventory');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
