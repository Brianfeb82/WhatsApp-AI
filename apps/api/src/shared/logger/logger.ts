import winston from 'winston'

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

// Make logger compatible with libraries expecting pino (like Baileys)
(logger as any).trace = logger.debug.bind(logger);
(logger as any).fatal = logger.error.bind(logger);
