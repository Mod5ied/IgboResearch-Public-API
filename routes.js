"use strict";
import dotenv from "dotenv";
import { Router } from "express";
const router = Router();
dotenv.config();

router.post("/post/batch", handleBatchUpload);

router.post("/post/word", handlePostWord);

router.post("/post/dict", handlePostDict);

router.post("/post/:quiz", handleQuiz);

router.get("/allWords", handleGetWords);

router.get("/allRecords", getDictRecord);

router.get("/:allQuiz", handleGetQuiz);

router.get("/:name", handleGetOne);

router.get("/get/state", handleGetState);

router.get("/get/:switch", handleSwitch);

router.patch("/update/genre", handleGenrePatch);

router.patch("/update/translation", handleTransPatch);

router.delete("/delete/word/:name", handleDeleteWord);

router.delete("/delete/dict/:name", handleDeleteDict);

router.delete("/delete/quiz/:quiz", handleDeleteQuiz);

export default router;
