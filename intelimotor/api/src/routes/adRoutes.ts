import express from "express";
import { publishAd } from "../controllers/adController";

const router = express.Router();

router.post("/publishAd", publishAd);

export default router;
