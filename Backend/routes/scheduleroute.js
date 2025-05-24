import express, { Router } from "express";
import { tampil, tambah } from "../controllers/schedulecontroller.js";
const router = express.Router();

import autmiddleware from "../middlewares/authmiddleware.js";

router.get("/schedules", autmiddleware, tampil);
router.post("/schedules", autmiddleware, tambah);

export default router;