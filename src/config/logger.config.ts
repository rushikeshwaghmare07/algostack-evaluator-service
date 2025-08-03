import "winston-mongodb";

import winston from "winston";

import serverConfig from "./server.config";

const allowedTransports: winston.transport[] = [];

// The below transport configuration enables logging on the console
if (serverConfig.NODE_ENV !== "production") {
  allowedTransports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
          format: "YYYY-MM-DD hh:mm:ss A",
        }),
        winston.format.printf(
          (log) => `${log.timestamp} [${log.level}]: ${log.message}`,
        ),
      ),
    }),
  );

  // The below transport configuration enables logging in mongodb database
  allowedTransports.push(
    new winston.transports.MongoDB({
      level: "error",
      db: serverConfig.LOG_DB_URI,
      collection: "logs",
    }),
  );

  // The below transport configuration enables logging in file
  allowedTransports.push(
    new winston.transports.File({ filename: "error.log", level: "error" }),
  );
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: allowedTransports,
});

export default logger;
