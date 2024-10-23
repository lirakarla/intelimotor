"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (error, res, message) => {
    console.error(error);
    return res.status(500).json({ error: message });
};
exports.handleError = handleError;
