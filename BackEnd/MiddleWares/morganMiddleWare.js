const morgan = require("morgan");
const logger = require("./../Utilities/logger");

const morganMiddleware = morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms - :user-agent",
    {
        stream : { write: (message) => logger.http(message) }
    }
);

module.exports = morganMiddleware;