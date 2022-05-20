import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import { startApp } from "./handlers/database.js";
import { env } from "process";
import cors from "cors";
import helmet from "helmet";
const app = express();

//middleware to simplify things
app.use(cors());
app.use(json());
app.use(helmet());
app.use(urlencoded({ extended: true }));
config();

//define routes handlers
import Router from "./routes.js";
app.use("/api/v1/", Router);

// Common error handlers
app.use(function fourOhFourHandler(req, res, next) {
  next(httpErrors(404, `Route not found: ${req.url}`));
});
app.use(function fiveHundredHandler(err, req, res, next) {
  if (err.status >= 500) {
    logger.error(err);
  }
  res.status(err.status || 500).json({
    messages: [
      {
        code: err.code || "InternalServerError",
        message: err.message,
      },
    ],
  });
});

//initialize database
await startApp(app, env.port, env.local);
