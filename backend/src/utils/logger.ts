import { createLogger, transports, format } from "winston";

// we have to change this later based on the environment
const logLevel = "info";

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ level, message, timestamp, stack }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
        })
      ),
    }),
  ],
  exceptionHandlers: [
    new transports.Console({
      level: "error",
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint()
      ),
    }),
  ],
  exitOnError: false,
});
