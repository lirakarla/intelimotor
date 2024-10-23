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
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeScreenshot = exports.uploadImage = exports.typeSelection = exports.waitFor = void 0;
const errorHandler_1 = require("./errorHandler");
// Custom wait function
const waitFor = (ms) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => setTimeout(resolve, ms));
});
exports.waitFor = waitFor;
// Type selection function with error handling
const typeSelection = (page, query, element) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.waitFor)(1500);
        yield page.focus(element);
        yield page.keyboard.press("Enter");
        yield page.type('[placeholder="Filtrar resultados"]', query);
        yield page.keyboard.press("ArrowDown");
        yield page.keyboard.press("Enter");
    }
    catch (error) {
        (0, errorHandler_1.handleError)(error, `typeSelection for query: ${query}`);
    }
});
exports.typeSelection = typeSelection;
// Upload an image to the provided input with error handling
const uploadImage = (page, id, imageURL) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield page.focus(id);
        const uploadHandle = yield page.$(id);
        if (uploadHandle) {
            yield uploadHandle.uploadFile(imageURL);
        }
        yield (0, exports.waitFor)(5000);
    }
    catch (error) {
        (0, errorHandler_1.handleError)(error, `uploadImage for imageURL: ${imageURL}`);
    }
});
exports.uploadImage = uploadImage;
// Take a screenshot with error handling
const takeScreenshot = (page, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield page.screenshot({ path: filePath });
        console.log(`Screenshot saved to ${filePath}`);
    }
    catch (error) {
        (0, errorHandler_1.handleError)(error, `takeScreenshot for filePath: ${filePath}`);
    }
});
exports.takeScreenshot = takeScreenshot;
