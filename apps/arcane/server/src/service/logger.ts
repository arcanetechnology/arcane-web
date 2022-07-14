/** @format */

import winston from 'winston';
import expressWinston from 'express-winston';

export const loggerConfig: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  colorize: true,
};
