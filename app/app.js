import express from "express";
import { errorHandler } from "../errors/index.js";
import { ApiError } from "../errors/errorParser.js";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import Router from "../routes/routes.js";
import logger from "../utils/log/logger.js";
dotenv.config();

export class Application {
  static _appState;
  _server = express();

  constructor() {
    this._server.set("port", process.env.APP_PORT);
    this._server.set("host", process.env.HOST);

    this._server.use(express.urlencoded({ extended: true }));
    this._server.use(express.json());
    this._server.use(helmet());
    this._server.use(cors());

    this._server.use("/api/v1/", Router);
    this._server.use(errorHandler);
  }

  async startServer() {
    const port = this._server.get("port");
    const host = this._server.get("host");

    this._server.listen(port, host, async (err, next) => {
      if (err) {
        logger.fatal(`${err.message} - Error starting database`);
        return next(ApiError.internalError(err.message || `Error starting database`));
      }
      this._appState = true;
      logger.info(`Connected and running at ${host}:${port}`);
    });
  }
}
