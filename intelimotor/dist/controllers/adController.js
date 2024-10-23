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
exports.publishAd = void 0;
const helpers_1 = require("../utils/helpers");
const puppeteerService_1 = require("../services/puppeteerService");
const config_1 = require("../config/config");
let page;
const publishAd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const price = req.body.price;
    const description = req.body.description;
    try {
        yield login();
        yield adForm(price, description);
        return res.send({
            message: (0, helpers_1.base64_encode)("./src/images/addPublished/screenshot_plans.png"),
        });
    }
    catch (error) {
        return res.status(500).send({ error: "Failed publishing ad" });
    }
});
exports.publishAd = publishAd;
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        page = yield (0, puppeteerService_1.initPuppeteer)();
        yield page.goto("https://www.seminuevos.com/login?loginFrom=wizard");
        yield page.type("#email_login", config_1.config.credentials.username);
        yield page.type("#password_login", config_1.config.credentials.password);
        yield page.keyboard.press("Enter");
        yield page.waitForNavigation({ waitUntil: "networkidle0" });
    });
}
function adForm(price, description) {
    return __awaiter(this, void 0, void 0, function* () {
        firstPage(price);
        lastPage(description);
        //TODO: select free plan (right now is not added because doesn't exist)
    });
}
function firstPage(price) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, puppeteerService_1.handleDropdownSelection)("autos", '[data-activates="dropdown_types"]');
        yield (0, puppeteerService_1.handleDropdownSelection)("Acura", '[data-activates="dropdown_brands"]');
        yield (0, puppeteerService_1.handleDropdownSelection)("ILX", '[data-activates="dropdown_models"]');
        yield (0, puppeteerService_1.handleDropdownSelection)("Sed", '[data-activates="dropdown_subtypes"]');
        yield (0, puppeteerService_1.handleDropdownSelection)("2018", '[data-activates="dropdown_years"]');
        yield (0, puppeteerService_1.handleDropdownSelection)("Nuevo Le", '[data-activates="dropdown_provinces"]');
        yield (0, puppeteerService_1.handleDropdownSelection)("Monterrey", '[data-activates="dropdown_cities"]');
        yield page.type("#input_recorrido", "20000");
        yield page.type("#input_precio", price);
        yield (0, puppeteerService_1.handleDropdownSelection)("Negoc", '[data-activates="dropdown_negotiable"]');
        yield page.click('[class="next-button"]');
    });
}
function lastPage(description) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.waitForSelector("#input_text_area_review");
        yield page.type("#input_text_area_review", description);
        yield (0, puppeteerService_1.uploadImage)("#Uploader", "src/images/image1.jpg");
        yield page.click('[class="next-button"]');
        yield page.waitForNavigation({ waitUntil: "networkidle0" });
        yield handleScreenshot();
    });
}
function handleScreenshot() {
    return __awaiter(this, void 0, void 0, function* () {
        page.waitForFunction(() => window.location.href.endsWith("/plans"));
        yield (page === null || page === void 0 ? void 0 : page.screenshot({
            path: "./src/images/addPublished/screenshot_plans.png",
        }));
        yield (0, puppeteerService_1.closePuppeteer)();
    });
}
