import { Router } from "express";
const router = Router();
import * as controller from "./../controller/index.js"

router.get(('/'), controller.healthCheck)

router.post(('/notes'), controller.createNote)

export default router;