import { handleDelete } from "../handlers/deleteHandler.js";
import { handleGet } from "../handlers/getHandler.js";
import { handlePost } from "../handlers/postHandler.js";
import { handleUpdate } from "../handlers/updateHandler.js";
import { Dictionary } from "../models/dictionary.js";

const myError = (err) => {
  throw new Error(err);
};

//handler dictionary post operation:
export const postDictRecord = async (req, res) => {
  let postResponse;
  const constant = {
    name: req.body.name,
    genre: req.body.genre,
    translation: req.body.translation,
    definitions: req?.body?.definitions,
    adjectives: req?.body?.adjectives,
    synonyms: req?.body?.synonyms,
  };
  try {
    postResponse = await handlePost(Dictionary, constant);
    if (postResponse) {
      return res.status(200).json({ state: true, data: postResponse });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};
//handler for dictionary get operation:
export const getDictRecord = async (req, res) => {
  try {
    const getResponse = await handleGet(Dictionary);
    res.status(200).json({ state: true, data: getResponse });
  } catch (err) {
    res
      .status(500)
      .json({ state: false, message: `Not found - ${err.message}` });
  }
};
//handler for dictionary delete operation:
export const deleteDictRecord = async (req, res) => {
  try {
    const constant = req.params.name;
    const deleteResponse = await handleDelete("Dictionary", constant);
    res.status(200).json({
      state: true,
      message: [`Resource was deleted`, deleteResponse],
    });
  } catch (err) {
    res.status(404).json({
      state: false,
      message: `Could not find resource ${err.message}`,
    });
  }
};
//handlers for dictionary update operations:
//todo: to update code soon...
export const patchDictRecord = async (req, res) => {
  let updatedResponse;
  const constant = {
    id: req.body.id,
    name: req.body.name,
    genre: req.body.genre,
    translation: req.body.translation,
    definitions: req.body.definitions,
    adjectives: req.body.adjectives,
    synonyms: req.body.synonyms,
  };
  try {
    updatedResponse = await handleUpdate(Dictionary, constant);
    if (updatedResponse) {
      return res.status(200).json({ success: true });
    }
  } catch (err) {
    res.status(500).json({
      state: false,
      message: `Could not update resource - ${err.message}`,
    });
  }
};

//handler for batch-uploads from offlineStore.
//todo: should exist for {trans, dict & quiz}.
export const batchUploadDict = async (req, res) => {
  /* if more than one exists, then we can deal with it later... */
  /* handling this may brick the app down. */
  //todo: Try looping again next time, with B.S.O.N values.

  try {
    const uploads = await Dictionary.create(req.body);
    res.status(200).json({ state: true, data: uploads });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
