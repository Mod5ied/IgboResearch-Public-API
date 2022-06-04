"use strict";
import dotenv from "dotenv";
import { Router } from "express";
import { handleGetState } from "./controllers/stateController.js";
import {
  getDictRecord,
  postDictRecord,
  patchDictRecord,
  deleteDictRecord,
  batchUploadDict
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
  postWord,
  patchWord,
  deleteWord,
  batchUploadWords,
} from "./controllers/wordsController.js";

const router = Router();
dotenv.config();

router.get("/allWords", getWords);

router.get("/allRecords", getDictRecord);

router.get("/quiz/:quiz", getQuiz);

// router.get("/:name", handleGetOne);

router.get("/get/state", handleGetState);

router.post("/post/batch/dict", batchUploadDict);

router.post("/post/batch/trans", batchUploadWords);

router.post("/post/batch/quiz", batchUploadQuiz);

router.post("/post/quiz/:quiz", createQuiz);

router.post("/post/word", postWord);

router.post("/post/dict", postDictRecord);

router.patch("/update/words", patchWord);

router.patch("/update/dict", patchDictRecord);

router.patch("/update/quiz/:quiz", patchQuiz);

router.delete("/delete/word/:name", deleteWord);

router.delete("/delete/dict/:name", deleteDictRecord);

router.delete("/delete/quiz/:quiz", deleteQuiz);

export default router;
