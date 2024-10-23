"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adController_1 = require("../controllers/adController");
const router = express_1.default.Router();
// POST route to handle ad posting
router.post("/publishAd", adController_1.publishAd);
exports.default = router;
