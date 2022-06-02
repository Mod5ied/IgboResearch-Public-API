"use strict";
import mongoose from "mongoose";
import { env } from "process";
import { config } from "dotenv";
config();

let appState;

class DatabaseWorkers {

  static connectDb = async (local) => {
    let resp;
    try {
      await mongoose.connect(local);
      mongoose.connection.on("error", (err) => {
        appState = false;
        console.error({ message: `${err.message}` });
      });
      mongoose.connection.on("connected", () => {
        console.log({ message: `Connected to MongoDB` });
        resp = true;
      });
    } catch (err) {
      console.log({ message: `Error connecting to MongoDB - ${err.message}` });
    }
    return resp;
  };
}

async function startApp(app, port, local) {
  try {
    await AppWorkers.useOffline(local);
    app.listen(port, async () => {
      appState = true;
      console.log(`App is running on port ${port}`);
    });
  } catch (err) {
    console.error({
      code: err.code || "InternalServerError",
      message: `Error starting app - ${err.message}`,
    });
  }
}
export { appState, DatabaseWorkers, AppWorkers, startApp };
