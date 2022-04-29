import express, { json, urlencoded } from "express";
const { json: _json } = pkg;
import { config } from "dotenv";
import { startApp } from "./handlers/database.js";
import { env } from "process";
import pkg from "body-parser";
import cors from "cors";
import helmet from "helmet";
const app = express();

//middleware to simplify things
app.use(_json());
app.use(cors());
app.use(json());
app.use(helmet());
app.use(urlencoded({ extended: true }));
config();

//define routes handlers
import Router from "./routes.js";
app.use("/api/v1/", Router);

//initialize database
await startApp(app, env.port, env.local);
