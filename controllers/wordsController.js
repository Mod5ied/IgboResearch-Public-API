import { handleDelete } from "../handlers/deleteHandler.js";
import { handleGet } from "../handlers/getHandler.js";
import { handlePost } from "../handlers/postHandler.js";
import { handleQuiz } from "../handlers/updateHandler.js";
import { Words } from "../models/words.js";

const myError = (err) => {
  throw new Error(err);
};

//handler for translator post operation:
export const postWord = async (req, res) => {
  let postResponse;
  const constant = {
    name: req.body.name,
    genre: req.body.genre,
    translation: req.body.translation,
  };
  try {
    postResponse = await handlePost(Words, constant);
    if (postResponse) {
      return res.status(200).json({ state: true, data: postResponse });
    }
  } catch (err) {
    res
      .status(err.statusCode || 400)
      .json({ state: false, message: err.message });
  }
};
//handler for translator get operation:
export const getWords = async (req, res) => {
  try {
    const getResponse = await handleGet(Words);
    res.status(200).json({ state: true, data: getResponse });
  } catch (err) {
    res
      .status(err.statusCode || 404)
      .json({ state: false, message: `Not found - ${err.message}` });
  }
};
//handler for translator delete operation:
export const deleteWord = async (req, res) => {
  try {
    const constant = req.params.name;
    const deleteResponse = await handleDelete(Words, constant);
    res.status(200).json({
      state: true,
      message: [`Resource was deleted`, deleteResponse],
    });
  } catch (err) {
    res.status(404).json({
      state: false,
      message: `Could not find resource - ${err.message}`,
    });
  }
};
//handler for translator update operations:
export const patchWord = async (req, res) => {
  let updatedResponse;
  const constant = {
    id: req.body.id,
    name: req.body.name,
    genre: req.body.genre,
    translation: req.body.translation,
  };
  try {
    updatedResponse = await handleQuiz(Words, constant);
    if (updatedResponse) {
      return res.status(200).json({ success: true });
    }
  } catch (err) {
    res.status(err.statusCode || 500).json({
      state: false,
      message: `Could not update resource - ${err.message}`,
    });
  }
};
// export const handleTransPatch = async (req, res) => {
//   let word;
//   try {
//     word = await Words.findOne({ name: req.body.name });
//     if (req.body.translation != null) {
//       word.translation = req.body.translation;
//       try {
//         const updatedProps = await word.save();
//         res.json({ state: true, data: updatedProps });
//       } catch (err) {
//         return myError(`Failed to update - ${err.message}`);
//       }
//     }
//   } catch (err) {
//     res.status(404).json({
//       state: false,
//       message: `Could not update resource - ${err.message}`,
//     });
//   }
// };

//handler for batch-uploads from offlineStore.
//todo: should exist for {trans, dict & quiz}.
export const batchUploadWords = async (req, res) => {
  /* if more than one exists, then we can deal with it later... */
  /* handling this may brick the app down. */
  //todo: Try looping again next time, with B.S.O.N values.

  // //! To fetch from the online Posts docs to the new Words doc:
  // const staleWords = await Posts.find({});

  try {
    const uploads = await Words.create(req.body);
    res.status(200).json({ state: true, data: uploads });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
