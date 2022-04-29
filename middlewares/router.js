"use strict";
import { app_state } from "../handlers/database.js";
import { AppWorkers } from "../handlers/database.js";
import Posts from "../models/models.js";
const { useOffline, useOnline } = AppWorkers;

//handler for router.post().
const handlePost = async (req, res) => {
  let response;
  const new_post = new Posts({
    name: req.body.name,
    translation: req.body.translation,
    definitions: req.body.definitions,
    genre: req.body.genre,
  });

  try {
    const null_response = await Posts.findOne({ name: new_post.name });
    if (
      null_response !== null
        ? myError(`Resource already exists`)
        : ((response = await new_post.save()),
          res.status(200).json({ state: true, data: response }))
    );
  } catch (err) {
    res.status(400).json({ state: false, message: err.message });
  }
};
const myError = (err) => {
  throw new Error(err);
};

//handler for router.get().
//todo: future: find words that match strings no matter if its not exact match.
const handleGet = async (req, res) => {
  try {
    const allPosts = await Posts.find({});
    res.status(200).json({ state: true, data: allPosts });
  } catch (err) {
    res
      .status(404)
      .json({ state: false, message: `Not found - ${err.message}` });
  }
};

//handler for router.getOne.
//todo: future: find words that match strings no matter if its not exact match.
const handleGetOne = async (req, res) => {
  let post;
  try {
    post = await Posts.findOne({ name: req.params.name });
    if (
      post !== null
        ? res.status(200).json({ state: true, data: post })
        : myError(`Returned Empty`)
    );
  } catch (err) {
    res.status(404).json({
      state: false,
      message: `Could not find resource ${err.message}`,
    });
  }
};

//handler for router.get-state.
const handleGetState = async (req, res) => {
  try {
    res.status(200).json(app_state);
  } catch (err) {
    res
      .status(400)
      .json({ state: false, message: `Could not get state - ${err.message}` });
  }
};

//handler for router.get-switch.
const handleSwitch = async (req, res) => {
  const switch_const = req.params.switch;
  switch (switch_const) {
    case "cloud":
      try {
        await useOnline(process.env.cloud);
        res.status(200).json({
          state: true,
          message: `Connected to cloud. Network status - ${app_state}`,
        });
      } catch (err) {
        res.status(400).json({
          state: false,
          message: `Could not perform switch operation - ${err.message}`,
        });
      }
      break;
    case "local":
      try {
        await useOffline(process.env.local);
        res
          .status(200)
          .json({ state: true, message: `Connected to local - ${app_state}` });
      } catch (err) {
        res.status(400).json({
          state: false,
          message: `Could not perform switch operation - ${err.message}`,
        });
      }
      break;
    default:
      try {
        await handleOffline();
        res
          .status(200)
          .json({ state: true, message: `Connected to local - ${app_state}` });
      } catch (err) {
        res.status(400).json({
          state: false,
          message: `Could not perform switch operation - ${err.message}`,
        });
      }
      break;
  }
};

//handler for router.delete-one.
const handleDelete = async (req, res) => {
  let post;
  try {
    post = await Posts.findOne({ name: req.params.name });
    const resp = await post.remove();
    res.status(200).json({
      state: true,
      message: [`Resource was deleted`, resp],
    });
  } catch (err) {
    res.status(404).json({
      state: false,
      message: `Could not find resource ${err.message}`,
    });
  }
};

//handler for router.patch().
const handlePatch = async (req, res) => {
  let post;
  try {
    post = await Posts.findOne({ name: req.params.name });
    if (req.body.genre != null) {
      post.genre = req.body.genre;
      try {
        const updatedProps = await post.save();
        res.json({ state: true, message: updatedProps });
      } catch (err) {
        res.json({
          state: false,
          message: `Failed to update - ${err.message}`,
        });
      }
    }
  } catch (err) {
    res.status(404).json({
      state: false,
      message: `Could not update resource ${err.message}`,
    });
  }
};

export {
  handlePost,
  handleGet,
  handleGetOne,
  handleGetState,
  handleSwitch,
  handleDelete,
  handlePatch,
};
