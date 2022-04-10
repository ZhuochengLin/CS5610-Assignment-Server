"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
function ErrorHandler(err, req, res, next) {
    res.status(403).send({ success: false, error: err.message });
}
exports.ErrorHandler = ErrorHandler;
