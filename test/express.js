const test = require('ava');
const express = require('express');
const supertest = require('supertest');

const requestReceived = require('..');

const startAtSymbol = Symbol.for('request-received.startAt');
const startTimeSymbol = Symbol.for('request-received.startTime');

test.beforeEach.cb(t => {
  const app = express();
  app.use(requestReceived);
  t.context.app = app;
  t.context.server = app.listen(() => {
    t.end();
  });
});

test.cb('sets req[startAt] and req[startTime]', t => {
  t.context.app.use((req, res) => {
    t.true(Array.isArray(req[startAtSymbol]));
    t.true(req[startTimeSymbol] instanceof Date);
    res.send('ok');
  });
  const request = supertest(t.context.server);
  request.get('/').end(() => t.end());
});
