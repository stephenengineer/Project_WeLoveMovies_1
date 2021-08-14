const { response } = require("../app");

function errorHandler(err, req, res, next) {
  const { status = 500, message = "Somethign went wrong!" } = err;
  res.status(status).json({ error: message });
}

module.exports = errorHandler;
