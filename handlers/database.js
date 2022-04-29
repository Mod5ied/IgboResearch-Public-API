"use strict";
// import checkInternetConnected from "check-internet-connected";
import mongoose from "mongoose";
import Posts from "../models/models.js";
import { env } from "process";
import { config } from "dotenv";
config();

let app_state;

class DatabaseWorkers {
  //meth used in Dev to fetch data from local db.
  //todo: To be Deprecated / Removed in production.
  static fetchLocal = async () => {
    let postsArray;
    try {
      postsArray = await Posts.find({});
      console.log({ message: "Got all post, now deleting..." });
    } catch (err) {
      console.error({ message: `Error fetching local - ${err.message}` });
    }
    return postsArray;
  };

  static postData = async (data) => {
    let resp;
    try {
      const res = Posts.insertMany(data);
      resp = res ? true : false;
    } catch (err) {
      console.error(err.message);
    }
    return resp;
  };

  static connectDb = async (local) => {
    let resp;
    try {
      await mongoose.connect(local);
      mongoose.connection.on("error", (err) => {
        app_state = false;
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

  static stopDb = async () => {
    let resp;
    try {
      const result = await mongoose.connection.close();
      if (
        result
          ? (resp = true)(
              console.log({ message: `Disconnected from MongoDB` })
            )(this.connectDb(env.cloud))
          : false
      );
    } catch (err) {
      console.error({ message: `Failed to stop database - ${err}` });
    }
    return resp;
  };
  //meth used in dev to delete all data from db(preferably in local)
  //todo: To be Deprecated / Removed in production.
  static wipeLocal = async () => {
    let resp;
    try {
      const res = await Posts.deleteMany({});
      if (res) {
        resp = true;
        console.log({ message: `Delete was successful` });
      }
    } catch (err) {
      console.log({ message: `Failed to wipe local - ${err.message}` });
    }
    return resp;
  };
}

class AppWorkers {
  static error_on_connect = "getaddrinfo ENOTFOUND apple.com";
  static undef = undefined;

  //fetches data from local db, then stops local db
  //-while switching to the cloud if the array isn't void
  //-passing the fetched data to connectAndPost meth to push to cloud.
  //todo: To be Deprecated / Removed in production.
  static useOnline = async () => {
    let resp;
    try {
      const allPosts = await DatabaseWorkers.fetchLocal();
      await DatabaseWorkers.wipeLocal();
      const ret = await DatabaseWorkers.stopDb();
      if (allPosts.length >= 1) {
        console.log({ message: "There is at least one post" });
        await connectAndPost(allPosts);
      }
    } catch (err) {
      if (err) {
        this.useOffline(env.local);
      }
    }
    return resp;
  };
  static useOffline = async (local) => {
    try {
      const resp = DatabaseWorkers.stopDb();
      if (resp) {
        await DatabaseWorkers.connectDb(local);
        console.log({ message: `Database is reconnected` });
      }
    } catch (err) {
      console.error(err);
    }
  };
}
async function startApp(app, port, local) {
  try {
    await AppWorkers.useOffline(local);
    app.listen(port, async () => {
      app_state = true;
      console.log(`App is running on port ${port}`);
    });
  } catch (err) {
    console.error({ message: `Error starting app - ${err.message}` });
  }
}
//fn is called by the useOnline meth to restart the db to cloud,
//-create a new object with the data fetched from local,
//-finally push the data to the cloud as new entry.
//todo: To be Deprecated / Removed in production.
async function connectAndPost(post) {
  try {
    const resp = await DatabaseWorkers.connectDb(env.cloud);
    if (resp == undefined) {
      post.forEach(async (pst) => {
        const newObject = createObject(pst.name, pst.translation, pst.genre);
        console.log({ dataAdded: newObject });
        await newObject.save();
      });
    }
  } catch (err) {
    console.log({ message: `Failed to merge` }, err.message);
  }
}
function createObject(name, translation, genre) {
  const obj = new Posts({
    name,
    translation,
    genre,
  });
  return obj;
}
export { app_state, DatabaseWorkers, AppWorkers, startApp };
