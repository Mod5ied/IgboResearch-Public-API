import { ApiError } from "../errors/errorParser.js";
import { handleGet } from "../handlers/getHandler.js";
import { handleQuizPost } from "../handlers/postHandler.js";
import { handleQuizUpdate } from "../handlers/updateHandler.js";
import { DictQuiz, SearchQuiz } from "../models/quiz.js";

//handler for quiz create operation:
export const createQuiz = async (req, res, next) => {
  const types = ["search", "dict"];
  if (!types.includes(req.params.quiz)) {
    return next(ApiError.notAvailableRequest("Path is invalid"));
  }
  let postResponse;
  switch (req.params.quiz) {
    case types[0]:
      postResponse = await handleQuizPost(SearchQuiz, req.body);
      if (!postResponse) {
        return next(ApiError.badRequest(`Resource already exists`));
      }
      res.status(200).json({ state: true, data: postResponse }).data = {
        msg: `Resource created`,
        data: postResponse,
      };
      return next()
    case types[1]:
      try {
        postResponse = await handleQuizPost(DictQuiz, req.body);
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
export const getQuiz = async (req, res, next) => {
  const types = ["search", "dict"];
  if (!types.includes(req.params.quiz)) {
    return next(ApiError.notAvailableRequest("Path is invalid"));
  }
  let getResponse;
  switch (req.params.quiz) {
    case types[0]:
      getResponse = await handleGet(SearchQuiz);
      if (getResponse === null) {
        return next(ApiError.notFoundRequest(`Resource does not exist`));
      }
      return res.status(200).json({ state: true, data: getResponse });
    case types[1]:
      getResponse = await handleGet(DictQuiz);
      if (getResponse === null) {
        return next(ApiError.notFoundRequest(`Resource does not exist`));
      }
      return res.status(200).json({ state: true, data: getResponse });
    default:
      return next(ApiError.methodNotImplemented("Request is unknown"));
  }
};
//handler for  quiz delete operation:
export const deleteQuiz = async (req, res, next) => {
  const types = ["search", "dict"];
  if (!types.includes(req.params.quiz)) {
    return next(ApiError.notAvailableRequest("Path is invalid"));
  }
  //todo: delete quizzes by another factor other than id.
  //! until then, this controller wont use the delete handler.
  let resp;
  switch (req.params.quiz) {
    case types[0]:
      resp = await SearchQuiz.findOne({ _id: req.body.id });
      if (resp !== null) {
        await SearchQuiz.deleteOne({ _id: req.body.id });
        res.status(200).json({
          state: true,
          message: `Resource was deleted`,
        }).data = `Resource was deleted`;
        return next();
      }
      return next(ApiError.notFoundRequest(`Resource does not exist`));
    case types[1]:
      resp = await DictQuiz.findOne({ _id: req.body.id });
      if (resp !== null) {
        await DictQuiz.deleteOne({ _id: req.body.id });
        res.status(200).json({
          state: true,
          message: `Resource was deleted`,
        }).data = `Resource was deleted`;
        return next();
      }
      return next(ApiError.notFoundRequest(`Resource does not exist`));
    default:
      return next(ApiError.methodNotImplemented("Request is unknown"));
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
  switch (req.params.quiz) {
    case "search":
      updateResponse = await handleQuizUpdate(SearchQuiz, constant);
      if (!updateResponse) {
        return res.status(400).json({ state: false });
      }
      return res.status(200).json({ state: true });
    case "dict":
      updateResponse = await handleQuizUpdate(DictQuiz, constant);
      if (!updateResponse) {
        return res.status(400).json({ state: false });
      }
      return res.status(200).json({ state: true });
    default:
      break;
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
