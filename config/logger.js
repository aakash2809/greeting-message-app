const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(), format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),

    new transports.File({ 
      level: 'info',
      filename: 'info.log',
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
      filename: 'error.log',
      format: format.combine(
       format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
       format.printf(
         error => `${error.timestamp} ${error.level}: ${error.message}`
       )
     ) }),
 
  ]
});

module.exports = logger;