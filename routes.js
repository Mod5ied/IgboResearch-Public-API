"use strict";
import dotenv from "dotenv";
import { Router } from "express";
import {
  handleDelete,
  handleGet,
  handleGetOne,
  handleGetState,
  handlePatch,
  handlePost,
  handleSwitch,
} from "./middlewares/router.js";
const router = Router();
dotenv.config();

router.post("/post", handlePost);

router.get("/allpost", handleGet);

router.get("/:name", handleGetOne);

router.get("/get/state", handleGetState);

router.get("/get/:switch", handleSwitch);

router.patch("/update/:name", handlePatch);

router.delete("/delete/:name", handleDelete);

export default router;
