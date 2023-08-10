const request = require('supertest');
const app = require('../server/server');

describe('Server', () => {
  test('GET /api/status returns 200 OK', async () => {
    const response = await request(app).get('/api/status');
    expect(response.status).toBe(200);
  });

  test('Non-existing route returns 404', async () => {
    const response = await request(app).get('/non-existing-route');
    expect(response.status).toBe(404);
  });

  test('Global error handler works', async () => {
    const response = await request(app).get('/api/error-route');
    expect(response.status).toBe(500);
    expect(response.body.err).toBe('An error occurred');
  });
});