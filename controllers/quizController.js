import { handleGet } from "../handlers/getHandler.js";
import { handleQuizPost } from "../handlers/postHandler.js";
import { handleQuizUpdate } from "../handlers/updateHandler.js";
import { Dictionary } from "../models/dictionary.js";
import { DictQuiz, SearchQuiz } from "../models/quiz.js";
import { Words } from "../models/words.js";

const myError = (err) => {
  throw new Error(err);
};

//handler for quiz create operation:
export const createQuiz = async (req, res) => {
  let postResponse;
  const type = {
    search: "search",
    dict: "dict",
  };
  const constant = req.body;
  switch (req.params.quiz) {
    case type.search:
      try {
        postResponse = await handleQuizPost(SearchQuiz, constant);
        if (postResponse) {
          return res.status(200).json({ state: true, data: postResponse });
        }
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    case type.dict:
      try {
        postResponse = await handleQuizPost(DictQuiz, constant);
        if (postResponse) {
          return res.status(200).json({ state: true, data: postResponse });
        }
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    default:
      break;
  }
};
//handler for quiz get operation:
export const getQuiz = async (req, res) => {
  const types = {
    search: "search",
    dict: "dict",
  };
  switch (req.params.quiz) {
    case types.search:
      try {
        const getResponse = await handleGet(SearchQuiz);
        res.status(200).json({ state: true, data: getResponse });
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    case types.dict:
      try {
        const getResponse = await handleGet(DictQuiz);
        res.status(200).json({ state: true, data: getResponse });
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    default:
      break;
  }
};
//handler for  quiz delete operation:
export const deleteQuiz = async (req, res) => {
  const types = {
    search: "search",
    dict: "dict",
  };
  //todo: delete quizzes by another factor other than id.
  //! until then, this contrler wont use the delete handler.
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
//handler for quiz patch operation:
//todo.
export const patchQuiz = async (req, res) => {
  let updateResponse;
  const constant = {
    id: req.body.id,
    answerRight: req.body.answerRight,
    answerWrong: req.body.answerWrong,
    answerWrong1: req.body.answerWrong1,
    answerWrong2: req.body.answerWrong2,
  };
  try {
    switch (req.params.quiz) {
      case "search":
        updateResponse = await handleQuizUpdate(SearchQuiz, constant);
        if (updateResponse) {
          return res.status(200).json({ success: true });
        }
        break;
      case "dict":
        updateResponse = await handleQuizUpdate(DictQuiz, constant);
        if (updateResponse) {
          return res.status(200).json({ success: true });
        }
        break;
      default:
        break;
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
export const batchUploadQuiz = async (req, res) => {
  /* if more than one exists, then we can deal with it later... */
  /* handling this may brick the app down. */
  //todo: Try looping again next time, with B.S.O.N values.

  // //! To fetch from the online Posts docs to the new Words doc:
  // const staleWords = await Posts.find({});

  switch (req.params.quiz) {
    case "search":
      try {
        const uploads = await SearchQuiz.create(req.body);
        res.status(200).json({ state: true, data: uploads });
      } catch (err) {
        res.status(err.statusCode || 500).send(err.message);
      }
      break;
    case "dict":
      try {
        const uploads = await DictQuiz.create(req.body);
        res.status(200).json({ state: true, data: uploads });
      } catch (err) {
        res.status(err.statusCode || 500).send(err.message);
      }
      break;

    default:
      break;
  }
};
