"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitFor = void 0;
const waitFor = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
exports.waitFor = waitFor;
