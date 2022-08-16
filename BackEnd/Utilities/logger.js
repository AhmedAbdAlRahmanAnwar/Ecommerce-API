const winston = require('winston');

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    return env === 'development' ? 'debug' : 'warn';
}

// Define different colors for each level.
// Only applies on Console
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors);

// Customizing the log format.
const format = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
);

// Define which transports the logger must use to print out messages.
const transports = [
    // Allow the use the console to print the messages
    new winston.transports.Console({
        // to color logs in console
        format: winston.format.colorize({ all: true }),
    }),
    // Allow to print all the error level messages inside the error.log file
    new winston.transports.File({
        level: 'error',
        filename: 'logs/error.log'
    }),
    // Allow to print all the error message inside the all.log file
    new winston.transports.File({ filename: 'logs/all.log' }),
];


const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

module.exports = logger;