import { Router } from "express";
import { postTranslate } from "../controllers/translateController.js";

const router = Router();

router.route("/translate").post(postTranslate);

export default router;