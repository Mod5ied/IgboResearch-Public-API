"use strict";
import mongoose from "mongoose";
import { config } from "dotenv";
import { ApiError } from "../errors/errorParser.js";
import logger from "../utils/log/logger.js";
config();

let appState;

class DatabaseWorkers {
  static connectDb = async (local) => {
    let resp;
    try {
      await mongoose.connect(local);
      mongoose.connection.on("error", (err) => {
        appState = false;
        logger.error({ message: `${err.message}` });
      });
      mongoose.connection.once("connected", () => {
        logger.info(`Connected to MongoDB`);
        resp = true;
      });
    } catch (err) {
      logger.error(`Error connecting to MongoDB - ${err.message}`);
    }
    return resp;
  };
  static closeDb = async () => {
    mongoose.connection.close();
    mongoose.disconnect();
    return;
  };
}

async function startApp(app, port, local) {
  await DatabaseWorkers.connectDb(local);
  app.listen(port, async (err, next) => {
    if (err) {
      logger.fatal(`${err.message} - Error starting app`);
      return next(ApiError.internalError(err.message || `Error starting app`));
    }
    appState = true;
    logger.info(`App is running on port`);
  });
}
export { appState, DatabaseWorkers, startApp };
