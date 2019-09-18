# request-received

[![build status](https://img.shields.io/travis/com/cabinjs/request-received.svg)](https://travis-ci.com/cabinjs/request-received)
[![code coverage](https://img.shields.io/codecov/c/github/cabinjs/request-received.svg)](https://codecov.io/gh/cabinjs/request-received)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/cabinjs/request-received.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/request-received.svg)](https://npm.im/request-received)

> Route middleware for Koa and Express that adds a request received high-resolution timer and Date to the request object using easily accessible Symbols to prevent request object pollution.  Made for [Cabin][].


## Table of Contents

* [Install](#install)
* [Usage](#usage)
  * [Express](#express)
  * [Koa](#koa)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install request-received
```

[yarn][]:

```sh
yarn add request-received
```


## Usage

### Express

> Symbols are automatically added to `req` object in route middleware:

```js
const express = require('express');
const Cabin = require('cabin');
const requestReceived = require('request-received');
const responseTime = require('response-time');
const requestId = require('express-request-id');

const startAt = Symbol.for('request-received.startAt');
const startTime = Symbol.for('request-received.startTime');

const app = express();
const Cabin = new Cabin();

app.use(requestReceived);

app.use((req, res, next) => {
  console.log('startAt', req[startAt]); // `process.hrtime()`
  // [ 472542, 431456521 ]
  console.log('startTime', req[startTime]); // Date.now()
  // 1560499520000
  next();
});

app.use(responseTime());
app.use(requestId());
app.use(cabin.middleware);

app.listen();
```

### Koa

> Symbols are automatically added to `ctx`, `ctx.req`, and `ctx.request` objects in route middleware:

```js
const Koa = require('koa');
const koaConnect = require('koa-connect');
const responseReceived = require('response-received');
const responseTime = require('response-time');
const requestId = require('express-request-id');

const startAt = Symbol.for('request-received.startAt');
const startTime = Symbol.for('request-received.startTime');

const app = new Koa();
const Cabin = new Cabin();

app.use(requestReceived);

app.use((ctx, next) => {
  console.log('startAt', ctx[startAt]); // `process.hrtime()`
  // [ 472542, 431456521 ]
  console.log('startTime', ctx[startTime]); // Date.now()
  // 1560499520000

  // note that the symbols are also accessible via:
  // ctx.req[startAt]
  // ctx.request[startAt]
  // ctx.req[startTime]
  // ctx.request[startTime]

  return next();
});

app.use(koaConnect(responseTime));
app.use(requestId());
app.use(cabin.middleware);

app.listen();
```


## Contributors

| Name           | Website                    |
| -------------- | -------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/> |


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[cabin]: https://cabinjs.com
