"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    puppeteer: {
        headless: process.env.PUPPETEER_HEADLESS === "true",
    },
    credentials: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
    },
};
