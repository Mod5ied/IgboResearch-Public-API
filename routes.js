"use strict";
import dotenv from "dotenv";
import { Router } from "express";
import { saveLogs } from "./utils/log/savelog.js";
import { handleGetState } from "./controllers/stateController.js";
import {
  getDictRecord,
  postDictRecord,
  patchDictRecord,
  deleteDictRecord,
  batchUploadDict,
  getOneRecord,
} from "./controllers/dictController.js";
import {
  getQuiz,
  createQuiz,
  patchQuiz,
  deleteQuiz,
  batchUploadQuiz,
} from "./controllers/quizController.js";
import {
  getWords,
  getOneWord,
  postWord,
  patchWord,
  deleteWord,
  batchUploadWords,
} from "./controllers/wordsController.js";

const router = Router();
dotenv.config();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get("/allWords", [use(getWords), use(saveLogs)]);

router.get("/allRecords", [use(getDictRecord), use(saveLogs)]);

router.get("/quiz/:quiz", [use(getQuiz), use(saveLogs)]);

router.get("/get/app_state", [use(handleGetState), use(saveLogs)]);

router.get("/get/word/:name", [use(getOneWord), use(saveLogs)]);

router.get("/get/dict/:record", [use(getOneRecord), use(saveLogs)]);

router.post("/post/batch/dict", [batchUploadDict, saveLogs]);

router.post("/post/batch/words", [batchUploadWords, saveLogs]);

router.post("/post/batch/:quiz", [use(batchUploadQuiz), use(saveLogs)]);

router.post("/post/quiz/:quiz", [use(createQuiz), use(saveLogs)]);

router.post("/post/dict", [use(postDictRecord), use(saveLogs)]); /* In progress */

router.post("/post/word", [use(postWord), use(saveLogs)]);

router.patch("/update/words", [use(patchWord), use(saveLogs)]);

router.patch("/update/dict", [use(patchDictRecord), use(saveLogs)]);

router.patch("/update/quiz/:quiz", [use(patchQuiz), use(saveLogs)]);

router.delete("/delete/word/:name", [use(deleteWord), use(saveLogs)]);

router.delete("/delete/dict/:name", [use(deleteDictRecord), use(saveLogs)]);

router.delete("/delete/quiz/:quiz", [use(deleteQuiz), use(saveLogs)]);

export default router;
