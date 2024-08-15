import pino from "pino";

export default pino(
  process.env.NODE_ENV == "production"
    ? { level: process.env.PINO_LOG_LEVEL || "info" }
    : {
        level: process.env.PINO_LOG_LEVEL || "info",
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      }
);
