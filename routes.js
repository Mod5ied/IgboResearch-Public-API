"use strict";
import dotenv from "dotenv";
import { Router } from "express";
import { handleGetState } from "./controllers/stateController.js";
import {
  getDictRecord,
  handlePostDict,
  handleDeleteDict,
} from "./controllers/dictController.js";
import {
  handleGetQuiz,
  handleQuizBatch,
  handleCreateQuiz,
  handleDeleteQuiz,
  handleQuizPatch,
} from "./controllers/quizController.js";
import {
  handleGetWords,
  handlePostWord,
  handleTransPatch,
  handleGenrePatch,
  handleDeleteWord,
  handleTransBatch,
} from "./controllers/wordsController.js";

const router = Router();
dotenv.config();

router.get("/allWords", handleGetWords);

router.get("/allRecords", getDictRecord);

router.get("/quiz/:quiz", handleGetQuiz);

// router.get("/:name", handleGetOne);

router.get("/get/state", handleGetState);

// router.get("/get/:switch", handleSwitch);

router.post("/post/batch/dict", handleQuizBatch);

router.post("/post/batch/trans", handleTransBatch);

router.post("/post/batch/quiz", handleQuizBatch);

router.post("/post/quiz/:quiz", handleCreateQuiz);

router.post("/post/word", handlePostWord);

router.post("/post/dict", handlePostDict);

router.patch("/update/genre", handleGenrePatch);

router.patch("/update/quiz/:quiz", handleQuizPatch);

router.patch("/update/translation", handleTransPatch);

router.delete("/delete/word/:name", handleDeleteWord);

router.delete("/delete/dict/:name", handleDeleteDict);

router.delete("/delete/quiz/:quiz", handleDeleteQuiz);

export default router;
