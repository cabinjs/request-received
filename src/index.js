const startAtSymbol = Symbol.for('request-received.startAt');
const startTimeSymbol = Symbol.for('request-received.startTime');
const pinoHttpStartAtSymbol = Symbol.for('pino-http.startAt');
const pinoHttpStartTimeSymbol = Symbol.for('pino-http.startTime');

module.exports = function(...args) {
  // start the timers
  let startAt = process.hrtime();
  let startTime = Date.now();

  // support both express and koa route middleware
  const isExpress =
    typeof args[2] !== 'undefined' && typeof args[2] === 'function';

  //
  // detect pino-http Symbols
  //
  // express - req[Symbol]
  // koa - ctx[Symbol], ctx.req[Symbol], ctx.request[Symbol]
  if (args[0][pinoHttpStartAtSymbol]) {
    startAt = args[0][pinoHttpStartAtSymbol];
  } else if (!isExpress) {
    if (args[0].req[pinoHttpStartAtSymbol])
      startAt = args[0].req[pinoHttpStartAtSymbol];
    else if (args[0].request[pinoHttpStartAtSymbol])
      startAt = args[0].request[pinoHttpStartAtSymbol];
  }

  if (args[0][pinoHttpStartTimeSymbol]) {
    startTime = args[0][pinoHttpStartTimeSymbol];
  } else if (!isExpress) {
    if (args[0].req[pinoHttpStartTimeSymbol])
      startTime = args[0].req[pinoHttpStartTimeSymbol];
    else if (args[0].request[pinoHttpStartTimeSymbol])
      startTime = args[0].request[pinoHttpStartTimeSymbol];
  }

  if (isExpress) {
    args[0][startAtSymbol] = startAt;
    args[0][startTimeSymbol] = startTime;

    // pino-http support
    args[0][pinoHttpStartAtSymbol] = startAt;
    args[0][pinoHttpStartTimeSymbol] = startTime;
  } else {
    args[0][startAtSymbol] = startAt;
    args[0].req[startAtSymbol] = startAt;
    args[0].request[startAtSymbol] = startAt;
    args[0][startTimeSymbol] = startTime;
    args[0].req[startTimeSymbol] = startTime;
    args[0].request[startTimeSymbol] = startTime;

    // pino-http support
    args[0][pinoHttpStartAtSymbol] = startAt;
    args[0].req[pinoHttpStartAtSymbol] = startAt;
    args[0].request[pinoHttpStartAtSymbol] = startAt;
    args[0][pinoHttpStartTimeSymbol] = startTime;
    args[0].req[pinoHttpStartTimeSymbol] = startTime;
    args[0].request[pinoHttpStartTimeSymbol] = startTime;
  }

  return isExpress ? args[2]() : args[1]();
};
