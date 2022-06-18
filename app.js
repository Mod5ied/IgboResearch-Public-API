import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import { startApp } from "./handlers/database.js";
import { errorHandler } from "./error/index.js";
import { env } from "process";
import cors from "cors";
import helmet from "helmet";
export const app = express();

//middleware to simplify things
app.use(cors());
app.use(json());
app.use(helmet());
app.use(urlencoded({ extended: true }));
config();

//define routes handlers
import Router from "./routes.js";
app.use("/api/v1/", Router);


// General error handlers
app.use(errorHandler)
// app.use(function fiveHundredHandler(err, req, res, next) {
//   if (err.status >= 500) {
//     logger.error(err);
//   }
//   // const newErr = errorHandler(errorMessage);
//   //parses the error message and returns a new error object(with custom message n' code).
//   // then the new error object is returned as response below.... OR NOT.
//   res.status(err.status || 500).json({
//     messages: [
//       {
//         code: err.code || "InternalServerError",
//         message: err.message,
//       },
//     ],
//   });
// });

//initialize database
await startApp(app, env.port, env.local);
