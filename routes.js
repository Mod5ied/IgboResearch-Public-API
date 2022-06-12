"use strict";
import dotenv from "dotenv";
import { Router } from "express";
import { handleGetState } from "./controllers/stateController.js";
import {
  getDictRecord,
  postDictRecord,
  patchDictRecord,
  deleteDictRecord,
  batchUploadDict,
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

router.get("/allWords", use(getWords));

router.get("/allRecords", use(getDictRecord));

router.get("/quiz/:quiz", use(getQuiz));

router.get("/get/state", use(handleGetState));

router.get("/get/:name", use(getOneWord));

router.post("/post/batch/dict", use(batchUploadDict));

router.post("/post/batch/words", use(batchUploadWords));

router.post("/post/batch/:quiz", use(batchUploadQuiz));

router.post("/post/quiz/:quiz", use(createQuiz));

router.post("/post/word", use(postWord));

router.post("/post/dict", use(postDictRecord)); /* In progress */

router.patch("/update/words", use(patchWord));

router.patch("/update/dict", use(patchDictRecord));

router.patch("/update/quiz/:quiz", use(patchQuiz));

router.delete("/delete/word/:name", use(deleteWord));

router.delete("/delete/dict/:name", use(deleteDictRecord));

router.delete("/delete/quiz/:quiz", use(deleteQuiz));

export default router;
