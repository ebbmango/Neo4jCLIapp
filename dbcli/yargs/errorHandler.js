function errorHandler(msg, err, yargs) {
  throw new Error(msg);
}

module.exports = errorHandler;
