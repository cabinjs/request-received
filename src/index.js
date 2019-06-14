const startAtSymbol = Symbol.for('request-received.startAt');
const startTimeSymbol = Symbol.for('request-received.startTime');

module.exports = function(...args) {
  // start the timers
  const startAt = process.hrtime();
  const startTime = Date.now();

  // support both express and koa route middleware
  const isExpress =
    typeof args[2] !== 'undefined' && typeof args[2] === 'function';

  if (isExpress) {
    args[0][startAtSymbol] = startAt;
    args[0][startTimeSymbol] = startTime;
  } else {
    args[0][startAtSymbol] = startAt;
    args[0].req[startAtSymbol] = startAt;
    args[0].request[startAtSymbol] = startAt;

    args[0][startTimeSymbol] = startTime;
    args[0].req[startTimeSymbol] = startTime;
    args[0].request[startTimeSymbol] = startTime;
  }

  return isExpress ? args[2]() : args[1]();
};
