"use strict";
// import { Router } from "express";
import { app_state } from "../handlers/database.js";
import { AppWorkers } from "../handlers/database.js";
import { Words, DictQuiz, SearchQuiz } from "../models/models.js";
const { useOffline, useOnline } = AppWorkers;

//handler for batch-uploads from offlineStore.
const handleBatchUpload = async (req, res) => {
  let post;
  try {
    post = await Words.create(req.body);
    res.status(200).json({ state: true, data: post });
    // req.body.forEach(async (obj) => {
    //   //looks up and returns object that already exists.
    //   post = await Posts.findOne({ name: obj.name });
    // });
    // if (post !== null) {
    //   res
    //     .status(400)
    //     .json({ message: `At least one post already exists`, data: post });
    // } else {
    // }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//general quiz post handler.
const handleQuiz = async (req, res) => {
  const type = {
    search: "search",
    dict: "dict",
  };
  switch (req.params.quiz) {
    case type.search:
      try {
        const response = await SearchQuiz.create(req.body);
        res.status(200).json({ state: true, data: response });
      } catch (error) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    case type.dict:
      try {
        const response = await DictQui.create(req.body);
        res.status(200).json({ state: true, data: response });
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    default:
      break;
  }
};

//handler for router.post().
const handlePost = async (req, res) => {
  let response;
  const newWord = new Words({
    name: req.body.name,
    translation: req.body.translation,
    definitions: req.body.definitions,
    genre: req.body.genre,
  });

  try {
    const null_response = await Words.findOne({ name: newWord.name });
    if (
      null_response !== null
        ? myError(`Resource already exists`)
        : //todo: the {create} keyword also works like save.
          ((response = await newWord.save()),
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
const handleGetWords = async (req, res) => {
  try {
    const allWords = await Words.find({});
    res.status(200).json({ state: true, data: allWords });
  } catch (err) {
    res
      .status(404)
      .json({ state: false, message: `Not found - ${err.message}` });
  }
};

//handler for router.getQuiz
const handleGetQuiz = async (req, res) => {
  const types = {
    search: "search",
    dict: "dict",
  };
  switch (req.params.allQuiz) {
    case types.search:
      try {
        const response = await SearchQuiz.find({});
        res.status(200).json({ state: true, data: response });
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    case types.dict:
      try {
        const response = await DictQuiz.find({});
        res.status(200).json({ state: true, data: response });
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    default:
      break;
  }
};

//handler for router.getOne.
//todo: future: find words that match strings no matter if its not exact match.
const handleGetOne = async (req, res) => {
  let word;
  try {
    word = await Words.findOne({ name: req.params.name });
    if (
      word !== null
        ? res.status(200).json({ state: true, data: word })
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
//!! to be deprecated / removed pre-production.
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

//handler for router.deleteWord
const handleDeleteWord = async (req, res) => {
  let word;
  try {
    word = await Words.findOne({ name: req.params.name });
    const resp = await word.remove();
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

//handler for router.deleteQuiz
const handleDeleteQuiz = async (req, res) => {
  const types = {
    search: "search",
    dict: "dict",
  };
  //todo: delete quizzes by another factor other than id.
  switch (req.params.quiz) {
    case types.search:
      try {
        const resp = await SearchQuiz.findOne({ _id: req.body.id });
        const response = await resp.remove();
        res.status(200).json({ state: true, data: response });
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    case types.dict:
      try {
        const resp = await DictQuiz.findOne({ _id: req.body.id });
        const response = await resp.remove();
        res.status(200).json({ state: true, data: response });
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    default:
      break;
  }
};

//handler for router.deleteAll
const handleDeleteAll = async (req, res) => {
  try {
    const response = await Words.deleteMany({});
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

//handler for router.patch().
const handlePatch = async (req, res) => {
  let word;
  try {
    word = await Words.findOne({ name: req.params.name });
    if (req.body.genre != null) {
      post.genre = req.body.genre;
      try {
        const updatedProps = await word.save();
        res.json({ state: true, message: updatedProps });
      } catch (err) {
        return myError(`Failed to update - ${err.message}`);
      }
    }
  } catch (err) {
    res.status(404).json({
      state: false,
      message: `Could not update resource - ${err.message}`,
    });
  }
};

export {
  handleBatchUpload,
  handlePost,
  handleGetWords,
  handleGetQuiz,
  handleGetOne,
  handleGetState,
  handleSwitch,
  handleDeleteWord,
  handleDeleteQuiz,
  handleDeleteAll,
  handlePatch,
  handleQuiz,
};
