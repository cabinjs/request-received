const test = require('ava');
const Koa = require('koa');
const supertest = require('supertest');

const requestReceived = require('..');

const startAtSymbol = Symbol.for('request-received.startAt');
const startTimeSymbol = Symbol.for('request-received.startTime');

test.beforeEach.cb(t => {
  const app = new Koa();
  app.use(requestReceived);
  t.context.app = app;
  t.context.server = app.listen(() => {
    t.end();
  });
});

test.cb(
  'sets ctx[startAt], ctx.req[startAt], ctx.req[startAt], ctx.request[startAt]',
  t => {
    t.context.app.use(ctx => {
      t.true(Array.isArray(ctx[startAtSymbol]));
      t.true(Array.isArray(ctx.req[startAtSymbol]));
      t.true(Array.isArray(ctx.request[startAtSymbol]));
    });
    const request = supertest(t.context.server);
    request.get('/').end(() => t.end());
  }
);

test.cb(
  'sets ctx[startTime], ctx.req[startTime], ctx.req[startTime], ctx.request[startTime]',
  t => {
    t.context.app.use(ctx => {
      t.true(typeof ctx[startTimeSymbol] === 'number');
      t.true(typeof ctx.req[startTimeSymbol] === 'number');
      t.true(typeof ctx.request[startTimeSymbol] === 'number');
      ctx.body = 'ok';
    });
    const request = supertest(t.context.server);
    request.get('/').end(() => t.end());
  }
);
