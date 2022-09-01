import { handleDelete } from "../services/deleteHandler.js";
import { handleGet, handleGetOne } from "../services/getHandler.js";
import { handlePostWords } from "../services/postHandler.js";
import { handleUpdate } from "../services/updateHandler.js";
import { ApiError } from "../errors/errorParser.js";
import { Words } from "../models/words.js";
import logger from "../utils/log/logger.js";

//handler for translator post operation:
export const postWord = async (req, res, next) => {
  if (req.params === null) {
    return next(ApiError.notAvailableRequest("Path is invalid"));
  }
  let postResponse;
  const constant = {
    name: req.body.name,
    genre: req.body.genre,
    translation: req.body.translation,
  };
  postResponse = await handlePostWords(constant);
  if (!postResponse) {
    return next(ApiError.badRequest(`Resource already exist`));
  }
  res.status(200).json({ state: true }).data = {
    msg: `Resource created`,
    data: postResponse,
  };
  next();
};
//handler for translator get operation:
export const getWords = async (req, res, next) => {
  const getResponse = await handleGet(Words);
  if (getResponse === null) {
    return next(ApiError.notFoundRequest(`Resource does not exist`));
  }
  return res.status(200).json({ state: true, data: getResponse });
};
//handler for translator getOne operation:
export const getOneWord = async (req, res, next) => {
  if (req.params.name.length <= 1) {
    return next(ApiError.badRequest("Path is invalid"));
  }
  const constant = req.params.name;
  const getResponse = await handleGetOne(Words, constant);
  if (getResponse === null) {
    return next(ApiError.notFoundRequest(`Resource does not exist`));
  }
  res.status(200).json({ state: true, data: getResponse }).data = getResponse;
  next();
};
//handler for translator delete operation:
export const deleteWord = async (req, res, next) => {
  if (req.params.name === null) {
    return next(ApiError.notAvailableRequest("Path is invalid"));
  }
  const constant = req.body.name;
  const deleteResponse = await handleDelete(Words, constant);
  if (!deleteResponse) {
    return next(ApiError.notFoundRequest(`Resource does not exist`));
  }
  res.status(200).json({
    state: true,
    message: `Resource was deleted`,
  }).data = `Resource was deleted`;
  next();
};
//handler for translator update operations:
export const patchWord = async (req, res, next) => {
  let updatedResponse;
  const constant = {
    name: req?.body?.name,
    translation: req?.body?.translation,
    genre: req?.body?.genre,
  };
  updatedResponse = await handleUpdate(Words, constant);
  if (!updatedResponse) {
    return next(ApiError.notFoundRequest(`Resource does not exist`));
  }
  res.status(200).json({ state: true }).data = updatedResponse;
  next();
};

//handler for batch-uploads from offlineStore.
//todo: should exist for {trans, dict & quiz}.
export const batchUploadWords = async (req, res, next) => {
  //* Special, and needs to explicit the error, hence not using the universal-err handler.
  //* Logs a E11000 duplicate key error collection if redundancy is attempted.
  //! To fetch from the online Posts docs to the new Words doc:
  //! const staleWords = await Posts.find({});
  try {
    console.log(req.body)
    const uploads = await Words.create(req.body);
    res.status(200).json({ state: true }).data = uploads;
    next();
  } catch (err) {
    const {
      keyValue: { name },
    } = err;
    logger.error(err.message);
    return res.status(400).json({ message: `'${name}' already exists in database` });
  }
};
