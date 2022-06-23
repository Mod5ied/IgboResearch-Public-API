import { handleDelete } from "../handlers/deleteHandler.js";
import { handleGet, handleGetOne } from "../handlers/getHandler.js";
import { handlePost } from "../handlers/postHandler.js";
import { handleUpdate } from "../handlers/updateHandler.js";
import { ApiError } from "../errors/errorParser.js";
import { Words } from "../models/words.js";

//handler for translator post operation:
export const postWord = async (req, res, next) => {
  let postResponse;
  const constant = {
    name: req.body.name,
    genre: req.body.genre,
    translation: req.body.translation,
  };
  postResponse = await handlePost(Words, constant);
  if (!postResponse) {
    return next(ApiError.badRequest(`Resource already exists`));
  }
  res.status(200).json({ state: true }).data = {
    msg: `Resource created`,
    data: postResponse,
  };
  next();
};
//handler for translator get operation:
export const getWords = async (req, res) => {
  // if(req.params !== ""){
  //   res.send("Parameter is wrong")
  // }
  const getResponse = await handleGet(Words);
  if (getResponse === null) {
    return next(ApiError.notFoundRequest(`Resource does not exist`));
  }
  res.status(200).json({ state: true, data: getResponse }).data = getResponse;
  next();
};
//handler for translator getOne operation:
export const getOneWord = async (req, res, next) => {
  const constant = req.params.name;
  const getResponse = await handleGetOne(Words, constant);
  if (getResponse === null) {
    return next(ApiError.notFoundRequest(`Resource does not exists`));
  }
  res.status(200).json({ state: true, data: getResponse }).data = getResponse;
  next();
};
//handler for translator delete operation:
export const deleteWord = async (req, res, next) => {
  const constant = req.params.name;
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
export const patchWord = async (req, res) => {
  let updatedResponse;
  const constant = {
    name: req.body.name,
    translation: req?.body?.translation,
    genre: req?.body?.genre,
  };
  updatedResponse = await handleUpdate(Words, constant);
  if (!updatedResponse) {
    return next(ApiError.notFoundRequest(`Resource does not exists`));
  }
  res.status(200).json({ state: true }).data = updatedResponse;
  next();
};

//handler for batch-uploads from offlineStore.
//todo: should exist for {trans, dict & quiz}.
export const batchUploadWords = async (req, res, next) => {
  /* if more than one exists, then we can deal with it later... */
  /* handling this may brick the app down. */
  //todo: Try looping again next time, with B.S.O.N values.

  // //! To fetch from the online Posts docs to the new Words doc:
  // const staleWords = await Posts.find({});

  const uploads = await Words.create(req.body);

  res.status(200).json({ state: true, data: uploads }).data = uploads;
};
