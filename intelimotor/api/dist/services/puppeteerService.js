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
exports.initPuppeteer = initPuppeteer;
exports.closePuppeteer = closePuppeteer;
exports.uploadImage = uploadImage;
exports.handleDropdownSelection = handleDropdownSelection;
const puppeteer_1 = __importDefault(require("puppeteer"));
const helpers_1 = require("../utils/helpers");
const config_1 = require("../config/config");
let browser;
let page;
function initPuppeteer() {
    return __awaiter(this, void 0, void 0, function* () {
        browser = yield puppeteer_1.default.launch({ headless: config_1.config.puppeteer.headless });
        page = yield browser.newPage();
        return page;
    });
}
function closePuppeteer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield browser.close();
    });
}
function uploadImage(id, imageURL) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.focus(id);
        const uploadHandle = yield page.$(id);
        if (uploadHandle) {
            yield uploadHandle.uploadFile(imageURL);
        }
        yield (0, helpers_1.waitFor)(5000);
    });
}
function handleDropdownSelection(query, element) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helpers_1.waitFor)(2000);
        yield page.focus(element);
        yield page.keyboard.press("Enter");
        yield page.type('[type="text"]', query);
        yield page.keyboard.press("ArrowDown");
        yield page.keyboard.press("Enter");
    });
}
