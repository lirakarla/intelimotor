"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlSite = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const config_1 = require("../config/config");
const wait_1 = require("../utils/wait");
let browser;
let page;
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            browser = yield puppeteer_1.default.launch(config_1.config.puppeteerOptions);
            page = yield browser.newPage();
            yield page.goto(`${config_1.config.baseURL}/login`);
            yield page.type("#email_login", config_1.config.credentials.username);
            yield page.type("#password_login", config_1.config.credentials.password);
            yield page.keyboard.press("Enter");
            yield page.waitForNavigation({ waitUntil: "networkidle0" });
        }
        catch (error) {
            throw new Error("Login failed");
        }
    });
}
function inputData(price, description) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield page.goto(`${config_1.config.baseURL}/wizard?f_dealer_id=-1`);
            yield (0, wait_1.waitFor)(1000);
            // The rest of the selection logic...
            // Example:
            yield page.type("#input_precio", price);
            yield page.type("#input_text_area_review", description);
        }
        catch (error) {
            throw new Error("Failed to input data");
        }
    });
}
function sendImages() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Handle image uploads...
        }
        catch (error) {
            throw new Error("Failed to upload images");
        }
    });
}
function confirmAndScreenshot() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield page.screenshot({ path: "src/images/result.png" });
        }
        catch (error) {
            throw new Error("Failed to take screenshot");
        }
    });
}
const controlSite = (price, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield login();
        yield inputData(price, description);
        yield sendImages();
        yield confirmAndScreenshot();
        yield browser.close();
    }
    catch (error) {
        if (browser)
            yield browser.close();
        throw error;
    }
});
exports.controlSite = controlSite;
