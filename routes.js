"use strict";
import dotenv from "dotenv";
import { Router } from "express";
import {
  handleBatchUpload,
  handleDeleteWord,
  handleDeleteQuiz,
  handleGetState,
  handleGetWords,
  handleGetQuiz,
  handleGetOne,
  handlePatch,
  handlePost,
  handleQuiz,
  handleSwitch,
  handleDeleteAll,
} from "./middlewares/router.js";
const router = Router();
dotenv.config();

router.post("/post/:quiz", handleQuiz);

// router.post("/post/batch", handleBatchUpload);

router.post("/post", handlePost);

router.get("/allWords", handleGetWords);

router.get("/:allQuiz", handleGetQuiz);

router.get("/:name", handleGetOne);

router.get("/get/state", handleGetState);

router.get("/get/:switch", handleSwitch);

router.patch("/update/:name", handlePatch);

//!! to be deprecated / removed pre-production.
router.delete("/delete/wipe", handleDeleteAll);

router.delete("/delete/:name", handleDeleteWord);

router.delete("/delete/quiz/:quiz", handleDeleteQuiz);

export default router;
