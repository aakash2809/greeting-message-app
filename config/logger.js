const winston = require('winston');

const logger = winston.createLogger({
  transports: [
     new winston.transports.File({
      level: 'info',
      filename: './logs/info.log',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),

    new winston.transports.File({
      level: 'error',
      filename: './logs/error.log',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(
          error => `${error.timestamp} ${error.level}: ${error.message}`
        )
      )
    })


  ]
});

module.exports = logger;