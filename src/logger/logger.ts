import winston, { format, Logger, transports } from 'winston';

export const logger: Logger = winston.createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp(),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message} ${info.methodName ?? ''}`)),
      level: 'info',
    }),
    new transports.File({
      format: format.timestamp(),
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
  handleExceptions: true,
});
