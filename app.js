import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import { startApp } from "./handlers/database.js";
import { errorHandler } from "./errors/index.js";
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

//initialize database
await startApp(app, env.port, env.local);
