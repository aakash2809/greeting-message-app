const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(), winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),

    /* new transports.File({ 
      level: 'info',
      filename: './logs/info.log',
      format: format.combine(
       format.timestamp({
         format: 'YYYY-MM-DD HH:mm:ss'
       }),
       format.printf(
         info => `${info.timestamp} ${info.level}: ${info.message}`
       )
     ) }),
    new transports.File({ 
      level: 'error',
      filename: './logs/error.log',
      format: format.combine(
       format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
       format.printf(
         error => `${error.timestamp} ${error.level}: ${error.message}`
       )
     ) }), */

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