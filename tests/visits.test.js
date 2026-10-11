import test from 'node:test';
import assert from 'node:assert/strict';
import { createVisitsHandler } from '../server/visits.js';

function response() {
  return { headers: {}, setHeader(key, value) { this.headers[key] = value; },
    status(value) { this.code = value; return this; }, json(value) { this.body = value; return this; } };
}
function request(method = 'POST', headers = {}) {
  return { method, headers: { host: 'portfolio.example', origin: 'https://portfolio.example', ...headers } };
}
function database() {
  let total = 0;
  return { async findOne() { return { total }; }, async findOneAndUpdate(query, update) {
    assert.equal(query._id, 'visits');
    total += update.$inc.total; return { total };
  } };
}
test('new visits increment; cookie repeat and GET only read the total', async () => {
  const collection = database(); const handler = createVisitsHandler(async () => collection);
  const first = response(); await handler(request(), first);
  assert.equal(first.body.total, 1); assert.match(first.headers['Set-Cookie'], /HttpOnly; SameSite=Lax/);
  const repeat = response(); await handler(request('POST', { cookie: 'other=x; portfolio_visit=1' }), repeat);
  assert.equal(repeat.body.total, 1); assert.equal(repeat.headers['Set-Cookie'], undefined);
  const read = response(); await handler(request('GET'), read);
  assert.equal(read.body.total, 1); assert.equal(read.headers['Cache-Control'], 'private, no-store');
});
test('concurrent requests use atomic increments', async () => {
  const collection = database(); const handler = createVisitsHandler(async () => collection);
  const results = await Promise.all(Array.from({ length: 30 }, async () => {
    const res = response(); await handler(request(), res); return res.body.total;
  }));
  assert.equal(new Set(results).size, 30);
  const read = response(); await handler(request('GET'), read); assert.equal(read.body.total, 30);
});
test('unsupported methods and cross-site writes do not connect to the database', async () => {
  const handler = createVisitsHandler(() => { throw new Error('Should not connect'); });
  for (const [req, code] of [[request('DELETE'), 405], [request('POST', { origin: 'https://other.example' }), 403], [request('POST', { origin: 'broken' }), 403]]) {
    const res = response(); await handler(req, res); assert.equal(res.code, code);
  }
});
test('database failure returns a safe error and does not set a counted cookie', async () => {
  const handler = createVisitsHandler(() => { throw new Error('secret URI'); });
  const res = response(); await handler(request(), res);
  assert.equal(res.code, 503); assert.equal(res.headers['Set-Cookie'], undefined);
  assert.ok(!JSON.stringify(res.body).includes('secret'));
});
test('first-document race retries without upsert', async () => {
  let calls = 0;
  const handler = createVisitsHandler(async () => ({ async findOneAndUpdate(query, update, options) {
    calls++;
    if (calls === 1) throw Object.assign(new Error('duplicate'), { code: 11000 });
    assert.equal(options.upsert, undefined); return { total: 2 };
  } }));
  const res = response(); await handler(request(), res); assert.equal(res.body.total, 2); assert.equal(calls, 2);
});
