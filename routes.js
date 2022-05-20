"use strict";
import dotenv from "dotenv";
import { Router } from "express";
import {
  handleDelete,
  handleGetWords,
  handleGetQuiz,
  handleGetOne,
  handleGetState,
  handlePatch,
  handlePost,
  handleQuiz,
  handleSwitch,
  handleBatchUpload,
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

router.delete("/delete/wipe", handleDeleteAll);

router.delete("/delete/:name", handleDelete);

export default router;
